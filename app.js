import express from "express";
import livrosRoute from "./routes/livrosRoute.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";

const PORTA = 3000;
const server = express();

const criarUrl = (version, path) => `/api/${version}/${path}`;
const LIVROS_URL = criarUrl("v1", "livros");

server.use(morgan("tiny"));
server.use("/static", express.static("public"));
server.use(bodyParser.json());
server.use(LIVROS_URL, livrosRoute);

server.get("/download/images/:imageName", (req, res) => {
    res.download(path.join("public", "images", req.params.imageName)) //faz o download da imagem no caminho localhost:3000/download/static/images/nome da imagem.extensão(jpg,png)
})

server.get("/manipulando-rota", (req, res, next) =>{
    res.send("Aprendendo route handler");
    next();
}, (req, res, next) =>{
    console.log("segundo handler");
    next();
}, (req, res) => {
    console.log("terceiro handler");
});

server.listen (3000, () => {
    console.log(`servidor rodando na porta ${PORTA}`);
});
