import express from "express"
import mongoose from "mongoose"
import cors from 'cors';   
import dotenv from "dotenv"
import bodyParser from "body-parser";
dotenv.config({path: "./config.env"})
import blogRouter from "./routes/blogRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;

mongoose.connect(process.env.ATLAS_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    });
}).catch((error) => {
    console.error(error);
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use("/blogs", blogRouter);
app.use("/users", userRouter);