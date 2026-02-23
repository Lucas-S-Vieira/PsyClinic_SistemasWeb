// CRUD - appointments
// C: create
// R: read - get all / get by id /  get by name
// U: update
// D: delete

import { prisma } from "../repository/client.js";

export default class AppointmentController {
  async getAll(request, response) {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        psychologist: true
      },
    });
    return response.json(appointments);
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const appointment = await prisma.appointment.findFirstOrThrow({
        where: {
          id: parseInt(id),
        },
        include: {
          patient: true,
          psychologist: true
        },
      });

      return response.json(appointment);
    } catch (error) {
      return response.status(400).json({
        message: "Invalid Id.",
        error,
      });
    }
  }

async getByPatient(request, response) {
    try {
      const { id } = request.params; 

      const appointments = await prisma.appointment.findMany({
        where: {
          patient_id: parseInt(id),
        },
        include: {
          psychologist: true,
        },
      });

      return response.json(appointments);
    } catch (error) {
      return response.status(400).json({
        message: "Error fetching appointments for this patient.",
        error,
      });
    }
  }

  async getByPsychologist(request, response) {
    try {
      const { id } = request.params; 

      const appointments = await prisma.appointment.findMany({
        where: {
          psychologist_id: parseInt(id),
        },
        include: {
          patient: true,
        },
      });

      return response.json(appointments);
    } catch (error) {
      return response.status(400).json({
        message: "Error fetching appointments for this psychologist.",
        error,
      });
    }
  }

  async create(request, response) {
    const { date, psychologist_id, patient_id } = request.body;

    try {
    
    const now = new Date();
      const appointmentDate = new Date(date);

      if (appointmentDate < now) {
        return response.status(400).json({
          message: "Não é possível agendar consultas em datas ou horários que já passaram."
        });
      }
      
    const psychologist = await prisma.psychologist.findUnique({
        where: { id: parseInt(psychologist_id) }
      });

      if (!psychologist) {
        return response.status(404).json({ message: "Psicólogo não encontrado." });
      }

      const patient = await prisma.patient.findUnique({
        where: { id: parseInt(patient_id) }
      });

      if (!patient) {
        return response.status(404).json({ message: "Paciente não encontrado." });
      }

    const checkConflict = await prisma.appointment.findFirst({
        where: {
          psychologist_id: parseInt(psychologist_id),
          date: new Date(date)
        }
      });

      if (checkConflict) {
        return response.status(400).json({
          message: "Conflito de agenda: Este psicólogo já possui uma consulta marcada para este horário."
        });
      }

      const appointment = await prisma.appointment.create({
        data: {
          date: new Date(date),
          psychologist: {
            connect: {
              id: parseInt(psychologist_id),
            },
          },
          patient: {
            connect: {
              id: parseInt(patient_id),
            },
          },
        },
      });

      return response.json(appointment);
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
    const { date, psychologist_id, patient_id } = request.body;

    try {

    const now = new Date();
      const appointmentDate = new Date(date);

      if (appointmentDate < now) {
        return response.status(400).json({
          message: "Não é possível agendar consultas em datas ou horários que já passaram."
        });
      }

    const psychologist = await prisma.psychologist.findUnique({
        where: { id: parseInt(psychologist_id) }
      });

      if (!psychologist) {
        return response.status(404).json({ message: "Psicólogo não encontrado." });
      }

      const patient = await prisma.patient.findUnique({
        where: { id: parseInt(patient_id) }
      });

      if (!patient) {
        return response.status(404).json({ message: "Paciente não encontrado." });
      }

    const checkConflict = await prisma.appointment.findFirst({
        where: {
          psychologist_id: parseInt(psychologist_id),
          date: new Date(date),
          NOT: {
            id: parseInt(id)
          }
        }
      });

      if (checkConflict) {
        return response.status(400).json({
          message: "Não foi possível alterar: O novo horário entra em conflito com outra consulta do psicólogo."
        });
      }

      const appointment = await prisma.appointment.update({
        where: {
          id: parseInt(id),
        },

        data: {
          date: new Date(date),
          psychologist: {
            connect: {
              id: parseInt(psychologist_id),
            },
          },
          patient: {
            connect: {
              id: parseInt(patient_id),
            },
          },
        },
      });

      return response.json(appointment);
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
      const appointment = await prisma.appointment.delete({
        where: {
          id: parseInt(id),
        },
      });

      return response.json({
        code: 200,
        message: "Appointment deleted.",
        appointment,
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