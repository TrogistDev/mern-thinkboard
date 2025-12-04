import Note from "../model/note.js";

export async function getNoteById(req,res){
    try {
        const notes = await Note.findById(req.params.id)
        if(!notes) return res.status(303).json({message:"Note not found"})
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in get note by Id", error);
        res.status(500).json({message: "Internal server error"})
    }
}
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json({ savedNote });
  } catch (error) {
    console.log("error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: "Note not found" })
    res.status(200).json({ updatedNote });
  } catch (error) {
    console.error("Error in updateNote Controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function deleteNote(req, res) {
  try {
    const {title, content} = req.body
    const deletedNote = await Note.findOneAndDelete(req.params.id, {title,content},{new: true})
    if(!deletedNote) return res.status(404).json({message:"Note not found"})
    res.status(200).json({deletedNote})
  } catch (error) {
    console.error("Error in deleteNote Controller", error);
    res.status(500).json({message: "Internal server error"})
  }
}
