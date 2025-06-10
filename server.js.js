const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const SECRET_KEY = 'supersecretkey';

let users = [
  { id: 1, username: 'admin', password: 'adminpass', role: 'Admin' },
  { id: 2, username: 'user', password: 'userpass', role: 'User' }
];

let books = [
  { id: 1, title: 'Tarkvara Arhitektuur', author: 'Autor A', genre: 'Tehniline', comments: [] },
  { id: 2, title: 'Eesti Ajalugu', author: 'Autor B', genre: 'Ajalugu', comments: [] }
];

function logAction(user, action) {
  const log = `${new Date().toISOString()} - ${user.username} (${user.role}): ${action}\n`;
  fs.appendFileSync('log.txt', log);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.sendStatus(403);
    next();
  };
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY);
  res.json({ token });
});

app.get('/books', authenticateToken, (req, res) => {
  logAction(req.user, 'vaatas raamatuid');
  res.json(books);
});

app.put('/books/:id', authenticateToken, authorizeRole('Admin'), (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.sendStatus(404);
  Object.assign(book, req.body);
  logAction(req.user, `muutis raamatut ID-ga ${book.id}`);
  res.json(book);
});

app.delete('/books/:id', authenticateToken, authorizeRole('Admin'), (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  logAction(req.user, `kustutas raamatu ID-ga ${req.params.id}`);
  res.json({ message: 'Raamat eemaldatud' });
});

app.post('/books/:id/comments', authenticateToken, authorizeRole('User'), (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.sendStatus(404);
  book.comments.push({ user: req.user.username, text: req.body.text });
  logAction(req.user, `kommenteeris raamatut ID-ga ${book.id}`);
  res.json(book);
});

const swaggerDocument = yaml.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`Server töötab: http://localhost:${PORT}`));
