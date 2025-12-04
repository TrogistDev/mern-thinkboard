import express from "express"
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js"

const router = express.Router()

router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router
/*
app.post("/api/notes", (req,res) => {
    res.status(201).json({message:"post created"})
})

app.put("/api/notes/:id", (req,res) =>{
    res.status(201).json({message: "post updated"})
})

app.delete("/api/notes/:id", (req,res) => {
    res.status(201).json({message:"note deleted successfully"})
}) */