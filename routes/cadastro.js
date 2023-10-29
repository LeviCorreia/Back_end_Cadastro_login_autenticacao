const express = require("express");
const router = express.Router()
const User = require('../models/usuarios');
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

router.post('/', async (req, res) => {
    const {email} = req.body
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return res.status(400).send({ erro: "Email já cadastrado" });
        }
            const resposta = await User.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
            })
            resposta.senha = undefined;
            const token = jwt.sign({id : resposta.id}, authConfig.secret, {
                expiresIn: 86400,
            })  
        res.status(200).send({ usuario: resposta, token: token })
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao cadastrar o usuário.' });
    }
})

module.exports = router