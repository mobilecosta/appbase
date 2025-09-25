const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Rota fake de login (não conflita com /users)
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ login: username, password }).value();

  if (user) {
    return res.json({
      success: true,
      token: 'fake-jwt-token-123456',
      user: { id: user.id, name: user.name, login: user.login }
    });
  }

  res.status(401).json({ success: false, message: 'Usuário ou senha inválidos' });
});

// Middleware para proteger rotas de contratos
server.use((req, res, next) => {
  if (req.path.startsWith('/contracts')) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer fake-jwt-token-123456') {
      return res.status(401).json({ message: 'Não autorizado' });
    }
  }
  next();
});

// Depois de todas as rotas customizadas, use o router padrão
server.use(router);

server.listen(3000, () => {
  console.log('🚀 JSON Server rodando em http://localhost:3000');
});
