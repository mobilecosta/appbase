const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db/db.json"); // aponta para seu db.json
const middlewares = jsonServer.defaults({
  noCors: false, // garante que o JSON Server adiciona headers CORS
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// 🔑 Rota fake de login
server.post("/login", (req, res) => {
  const { login, password } = req.body;
  const db = router.db;
  const user = db.get("users").find({ login, password }).value();

  if (user) {
    return res.json({
      success: true,
      token: "fake-jwt-token-123456",
      user: {
        id: user.id,
        login: user.login,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  }

  res
    .status(401)
    .json({ success: false, message: "Usuário ou senha inválidos" });
});

// Protege rotas com token fake (exemplo: /contracts)
server.use((req, res, next) => {
  if (req.path.startsWith("/contracts")) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== "Bearer fake-jwt-token-123456") {
      return res.status(401).json({ message: "Não autorizado" });
    }
  }
  next();
});

// Rotas padrões do JSON Server
server.use(router);

server.listen(3000, () => {
  console.log("🚀 Fake API rodando em http://localhost:3000");
});
