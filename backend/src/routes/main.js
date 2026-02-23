// EsModules:
// import ... from ... -> default: export default
// import { ..., ... } from ... -> export { }

// import express from "express" // default
import { Router } from "express"
import { prisma } from "../repository/client.js";

const mainRouter = Router()

mainRouter.get('/', (request, response) => {
    response.send("<h1>Project Control Server</h1>")
})

mainRouter.get('/status', (request, response) => {
    response.json({
        code: 200,
        message: "PsyClinic API Server is running."
    })
})

mainRouter.get('/admin', (request, response) => {
    response.status(401).send("<h1>Unauthorized.</h1>")
})

mainRouter.get('/api/stats', async (request, response) => {
    try {
        const [totalPsychologists, totalPatients, totalAppointments] = await Promise.all([
            prisma.psychologist.count(),
            prisma.patient.count(),
            prisma.appointment.count()
        ]);

        response.json({
            psychologists: totalPsychologists,
            patients: totalPatients,
            appointments: totalAppointments
        });
    } catch (error) {
        response.status(500).json({ message: "Erro ao buscar estatísticas." });
    }
});

export { mainRouter }