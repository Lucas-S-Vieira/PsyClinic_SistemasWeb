import { Router } from "express";
import PsychologistController from "../controllers/PsychologistController.js";

const psychologistsRouter = Router();
const psychologistController = new PsychologistController();

// Rotas de Leitura (GET)
psychologistsRouter.get('/', (request, response) => psychologistController.getAll(request, response));
psychologistsRouter.get('/:id', (request, response) => psychologistController.getById(request, response));
psychologistsRouter.get('/name/:name', (request, response) => psychologistController.getByName(request, response));

// Rotas de Escrita (POST, PUT, DELETE)
psychologistsRouter.post('/', (request, response) => psychologistController.create(request, response));
psychologistsRouter.put('/', (request, response) => psychologistController.update(request, response));
psychologistsRouter.delete('/', (request, response) => psychologistController.delete(request, response));

export { psychologistsRouter };