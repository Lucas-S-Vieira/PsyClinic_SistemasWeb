// CRUD - patientss
// C: create
// R: read - get all / get by id /  get by name
// U: update
// D: delete

import { prisma } from "../repository/client.js";

export default class PatientController {
  async getAll(request, response) {
    const patients = await prisma.patient.findMany({
      include: {
        appointments: {
            include: {
                psychologist: true,
            }
          }
      },
    });
    return response.json(patients);
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const patient = await prisma.patient.findFirstOrThrow({
        where: {
          id: parseInt(id),
        },
        include: {
          appointments: {
            include: {
                psychologist: true
            }
          }
        },
      });

      return response.json(patient);
    } catch (error) {
      return response.status(400).json({
        message: "Invalid Id.",
        error,
      });
    }
  }

  async getByName(request, response) {
    try {
      // Assumindo que o nome venha pelos params na rota (ex: /patients/name/:name)
      const { name } = request.params;
      const patients = await prisma.patient.findMany({
        where: {
          name: {
            contains: name, // Busca nomes que contenham o termo
          },
        },
        include: {
          appointments: true,
        },
      });

      return response.json(patients);
    } catch (error) {
      return response.status(400).json({
        message: "Error searching by name.",
        error,
      });
    }
  }

  async create(request, response) {
    const { name } = request.body;

    try {
      const patient = await prisma.patient.create({
        data: {
          name,
        },
      });

      return response.json(patient);
    } catch (error) {
      return response.status(400).json({
        code: 400,
        message: "Invalid request.",
        error,
      });
    }
  }

  async update(request, response) {
    const { id, name } = request.body;

    try {
      const patient = await prisma.patient.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
        },
      });

      return response.json(patient);
    } catch (error) {
      console.error(error);
      response.status(400).json({
        code: 400,
        message: "Invalid request.",
        error,
      });
    }
  }

  async delete(request, response) {
    const { id } = request.body;

    try {
      const patient = await prisma.patient.delete({
        where: {
          id: parseInt(id), // Adicionei o parseInt por segurança, já que o ID é Int
        },
      });

      return response.json({
        code: 200,
        message: "Patient deleted.",
        patient,
      });
    } catch (error) {
      response.status(400).json({
        code: 400,
        message: "Invalid request.",
        id,
        error,
      });
    }
  }
}