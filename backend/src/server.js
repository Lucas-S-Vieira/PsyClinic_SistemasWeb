import express from "express"
import cors from "cors"

// Routes - import
import { mainRouter } from "./routes/main.js";
import { patientsRouter } from "./routes/patient.js";
import { psychologistsRouter } from "./routes/psychologist.js";
import { appointmentsRouter } from "./routes/appointment.js";

// Configurações (.env)
const PORT = 5000

// Server
const server = express();

// Configuration
server.use(express.json())
server.use(cors())

// Add Routes to server
server.use(mainRouter)
server.use("/api/patients", patientsRouter);
server.use("/api/psychologists", psychologistsRouter);
server.use("/api/appointments", appointmentsRouter);

// Start - listen
server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}.`)
})