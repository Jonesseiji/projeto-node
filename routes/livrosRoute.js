//#region Import
import express from "express";
import livros from "../data/livros.json";
import mongoose from "mongoose";
//#endregion

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

router.get("/", (req, res) => { //traz os registros do MDB
    livrosModel.find((err, livro) => {
        if(err) res.status(500).send(err);
        res.json(livro);
    });
});

router.get("/:id", (req, res) => {

    livrosModel.findById(req.params.id, (err, livro) => { //buscando o livro pelo ID
        if (livro) {
            res.json(livro);
        } else {
            res.status(404).send(`Livro com ID ${req.params.id} não encontrado`); 
        }
    });
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

router.put("/:id", (req, res) => { //atualiza os dados do livro
    livrosModel.findById(req.params.id, (err, livro)=>{
        if(err) res.status(500).send(err);
        
        if(livro){
            livro.titulo = req.body.titulo;
            livro.tipo = req.body.tipo;

            livro.save().then((err, livro) =>{ //salva o put no banco de dados
                if(err) res.status(500).send(err);
                res.json(livro);
            });
        } else {
            res.status(404).send(`Livro com o ID ${req.params.id} não encontrado`);
        };
    });
});

router.delete("/:id", (req, res) => {
    livrosModel.findByIdAndDelete(req.params.id, (err, livro) => {
        if(err) res.status(500).send(err);
        res.status(200).send(`Livro com o ID ${req.params.id} deletado com sucesso !`);
    });
});

export default router;