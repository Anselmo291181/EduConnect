import "dotenv/config";
//import http from "http";
import app from "./src/app.js";

const PORT = 3000;

app.listen(3000, () => {
    console.log("Servidor escutando!");
});