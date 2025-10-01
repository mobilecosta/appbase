export default interface User {
  id: number;
  login: string;
  password: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string | 'user' | null;
}