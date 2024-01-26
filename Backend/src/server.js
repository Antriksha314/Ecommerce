import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import cors from "cors";
import express from "express";
import fs from "fs";
import { ConnectToDatabase } from "./Database/index.js";
import path from "path";
const PORT = process.env.PORT || 5060

const app = express()

app.use(cors())

app.use(express.json())

ConnectToDatabase()

// Dynamic route.js folder called from each modules folder
const files = fs.readdirSync("./src/Modules")

for (const file of files) {
    const lowerCase = file.toLowerCase()
    if (fs.existsSync(`./src/Modules/${file}/route.js`)) {
        const router = (await import(`./Modules/${file}/route.js`)).default
        app.use(`/api/`, router)
    }
}


createServer(app).listen(PORT, console.log(`Server is listening on ${PORT}`))