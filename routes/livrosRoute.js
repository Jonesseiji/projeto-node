import express from "express";
import livros from "../data/livros.json";
import mongoose from "mongoose";

const DB_URL = "mongodb+srv://admin:admin@cluster0.sbrpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.once("open", () => {
    console.log("Estamos conectados no MDB");
});

const livrosSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo: String,
    tipo: String
});

const livrosModel = mongoose.model("Livro", livrosSchema);

const router = express.Router();

let livrosArray = livros;

router.get("/", (req, res) => {
    res.json(livros);
});

router.get("/:id", (req, res) => {
    const livro = livros.find(value => value.id == req.params.id);

    if (livro) {
        res.json(livro);
    } else {
        res.send("Livro não encontrado"); 
    }

    res.end();
})

router.post("/", (req, res) => {

    const id =  new mongoose.Types.ObjectId(); //atribuindo um valor único ao id dos próximos POST
    const livroParaSalvar = Object.assign({
        _id: id,
    }, req.body);

    const livro = new livrosModel(livroParaSalvar);

    livro.save().then((err, livro) => {
        if(err) res.status(500).send(err);
        res.json(livro);
    });
});

router.put("/", (req, res) => {
    console.log("tratando put");
    res.end();
});

router.delete("/", (req, res) => {
    console.log("tratando delete");
    res.end();
});

router.param("id", (req, res, next, id) => {
    if (isNaN(id)) {
        next("[ERRO] id deve ser um número !!");
    }
    next();
});

export default router;