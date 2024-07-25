import express from "express";
import cors from "cors";
import router from "./src/v1/routes/test.js";
import pg from "pg";

let ans = [];

const port = 5000;
const app = express();

//to avoid cross-origin error 
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/api/v1', router);

app.listen(port, () => {
    console.log("listening on " + port)
});