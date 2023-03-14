const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const login = require('./middlewares/login');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const json = 'src/talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = JSON.parse(fs.readFileSync(json, 'utf8'));
  res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const data = JSON.parse(fs.readFileSync(json, 'utf8'));
  const talker = data.find((param) => param.id === Number(req.params.id));

  if (talker) return res.status(200).json(talker);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

const tokensCreation = () => crypto.randomBytes(8).toString('hex');
app.post('/login', login.loginValidation, (_req, res) => {
  res.status(200).json({ token: tokensCreation() });
});


app.listen(PORT, () => {
  console.log('Online');
});
