import express from "express";
import cors from "cors";
import testRouter from "./src/v1/routes/test.js";
import authRouter from "./src/v1/routes/auth.js";

const port = 5000;
const app = express();

//to avoid cross-origin error 
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/api/v1', testRouter);
app.use('/api/v1', authRouter);


app.listen(port, () => {
    console.log("listening on " + port)
});