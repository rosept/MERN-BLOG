import express from 'express';
import mongoose from 'mongoose';
import blogRouter from "./routes/blog-routes.js";
import router from './routes/user-routes.js';
import cors from 'cors';
import logger from 'morgan';
import path from "path";

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.get("*", (req,res,next) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
})

mongoose

    .connect("mongodb+srv://admin:admin@cluster0.ega27j3.mongodb.net/BlogApp?retryWrites=true&w=majority")
    .then(() => app.listen(5000))
    .then(() => console.log("Connected to Database and Listening on localhost:5000"))
    .catch((err) => console.log(err));



