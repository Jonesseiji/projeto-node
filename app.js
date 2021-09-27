import express from "express";
import livros from "./data/livros.json";

const PORTA = 3000;
const server = express();

const criarUrl = (version, path) => `/api/${version}/${path}`;

server.get(criarUrl("v1", "livros"), (req, res) => {
    res.json(livros);
});

server.listen (3000, () => {
    console.log(`servidor rodando na porta ${PORTA}`);
});