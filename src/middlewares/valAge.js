function ageValidation(req, res, next) {
  const { age } = req.body;
  const verifyAge = (age) => Number(age) <18 || !Number.isInteger(age);
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (verifyAge(age)) {
    return res.status(400).json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
}

module.exports = { ageValidation };