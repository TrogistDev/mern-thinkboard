import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path"
dotenv.config();
const app = express();
const __dirname = path.resolve()
if(process.env.NODE_ENV !== "production"){
  app.use(cors({ origin: "http://localhost:5173", "https://mern-thinkboard-api.onrender.com/api" }));

}
app.use(express.json());
app.use(rateLimiter);
/* app.use((req,res,next)=> {
    console.log(`req method is ${req.method} & req URL is ${req.url}`);
    next()
    }) */
app.use("/api/notes", notesRoutes);
// middleware
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist", "index.html"))
})
}
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server started on PORT: 5001");
  });
});
