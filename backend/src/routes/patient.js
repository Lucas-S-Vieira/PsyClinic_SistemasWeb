import { Router } from "express";
import PatientController from "../controllers/PatientController.js"; // Ajuste o caminho se necessário

const patientsRouter = Router();
const patientController = new PatientController();

// Rotas de Leitura (GET)
patientsRouter.get('/', (request, response) => patientController.getAll(request, response));
patientsRouter.get('/:id', (request, response) => patientController.getById(request, response));
patientsRouter.get('/name/:name', (request, response) => patientController.getByName(request, response));

// Rotas de Escrita (POST, PUT, DELETE)
patientsRouter.post('/', (request, response) => patientController.create(request, response));
patientsRouter.put('/:id', (request, response) => patientController.update(request, response));
patientsRouter.delete('/:id', (request, response) => patientController.delete(request, response));

export { patientsRouter };