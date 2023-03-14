const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const json = 'src/talker.json';
const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = JSON.parse(fs.readFileSync(json, 'utf8'));
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log('Online');
});
