const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');

//Rota do cadastro
router.post('/register', async (req, res) => {
    const { email, senha } = req.body;
    // Verifica se o email e senha foram fornecidos
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);
    const query = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    db.run(query, [email, hash], function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(409).json({ error: 'Email já cadastrado.' });
          }
        // Retorna o ID do usuário cadastrado
       
    return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        }
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: this.lastID });
    });
} catch (error) {
res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
}
});

//Rota do login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    db.get(query, [email, senha], async (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao realizar login.' });
        }
        if (!row) {
            return res.status(401).json({ error: 'Email ou senha inválidos.' });
        }

        const match = await bcrypt.compare(senha, row.senha);
        if (!match) {
            return res.status(401).json({ error: 'Email ou senha inválidos.' });
        }
        res.json({ message: 'Usuário logado com sucesso!', userId: row.id });
    });
});
module.exports= router;
