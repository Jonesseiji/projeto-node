import express from "express";
import livros from "../data/livros.json";

const router = express.Router();

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
    console.log("tratando post");
    res.end();
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