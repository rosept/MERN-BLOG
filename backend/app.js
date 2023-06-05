import express from 'express';
import mongoose from 'mongoose';
import blogRouter from "./routes/blog-routes";
import router from './routes/user-routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose

    .connect("mongodb+srv://admin:admin@cluster0.ega27j3.mongodb.net/BlogApp?retryWrites=true&w=majority")
    .then(() => app.listen(5000))
    .then(() => console.log("Connected to Database and Listening on localhost:5000"))
    .catch((err) => console.log(err));



