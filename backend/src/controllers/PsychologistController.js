// CRUD - psychologists
// C: create
// R: read - get all / get by id /  get by name
// U: update
// D: delete

import { prisma } from "../repository/client.js";

export default class PsychologistController {
async getAll(request, response) {
    const psychologists = await prisma.psychologist.findMany({
      include: {
        appointments: {
            include: {
                patient: true
            }
        },
        _count: { 
            select: { 
                appointments: true 
            } 
        }
      },
    });
    return response.json(psychologists);
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const psychologist = await prisma.psychologist.findFirstOrThrow({
        where: {
          id: parseInt(id),
        },
        include: {
          appointments: {
            include: {
                patient: true
            }
        }
        },
      });

      return response.json(psychologist);
    } catch (error) {
      return response.status(400).json({
        message: "Invalid Id.",
        error,
      });
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const psychologists = await prisma.psychologist.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        include: {
          appointments: true,
        },
      });

      return response.json(psychologists);
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
      const psychologist = await prisma.psychologist.create({
        data: {
          name,
        },
      });

      return response.json(psychologist);
    } catch (error) {
      return response.status(400).json({
        code: 400,
        message: "Invalid request.",
        error,
      });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    try {
      const psychologist = await prisma.psychologist.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
        },
      });

      return response.json(psychologist);
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
    const { id } = request.params;

    try {
      const psychologist = await prisma.psychologist.delete({
        where: {
          id: parseInt(id),
        },
      });

      return response.json({
        code: 200,
        message: "Psychologist deleted.",
        psychologist,
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