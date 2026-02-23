import { Router } from "express";
import AppointmentController from "../controllers/AppointmentController.js";

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

// Rotas de Leitura (GET)
appointmentsRouter.get('/', (request, response) => appointmentController.getAll(request, response));
appointmentsRouter.get('/:id', (request, response) => appointmentController.getById(request, response));
appointmentsRouter.get('/patient/:id', (request, response) => appointmentController.getByPatient(request, response));
appointmentsRouter.get('/psychologist/:id', (request, response) => appointmentController.getByPsychologist(request, response));

// Rotas de Escrita (POST, PUT, DELETE)
appointmentsRouter.post('/', (request, response) => appointmentController.create(request, response));
appointmentsRouter.put('/:id', (request, response) => appointmentController.update(request, response));
appointmentsRouter.delete('/:id', (request, response) => appointmentController.delete(request, response));

export { appointmentsRouter };