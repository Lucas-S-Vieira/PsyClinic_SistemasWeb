import express from "express"
import cors from "cors"

// Routes - import
import { mainRouter } from "./routes/main.js";

// Configurações (.env)
const PORT = 5000

// Server
const server = express();

// Configuration
server.use(express.json())
server.use(cors())

// Add Routes to server
server.use(mainRouter)

// Start - listen
server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}.`)
})