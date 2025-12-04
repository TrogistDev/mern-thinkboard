import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(rateLimiter);
/* app.use((req,res,next)=> {
    console.log(`req method is ${req.method} & req URL is ${req.url}`);
    next()
    }) */
app.use("/api/notes", notesRoutes);
// middleware

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server started on PORT: 5001");
  });
});
