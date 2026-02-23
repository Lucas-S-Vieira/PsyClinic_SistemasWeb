import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { AppointmentInterface } from '../../types/appointment';
import { Calendar, Clock, User, UserCircle, Plus, Edit, Trash, Trash2, Pencil } from 'lucide-react';

export default function ListAppointments() {
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const response = await api.get('/appointments');
        if (!ignore) setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
    return () => { ignore = true; };
  }, []);

    const handleDeleteDirect = async (id: number) => {
    if (window.confirm("Deseja desmarcar esta consulta?")) {
        try {
        await api.delete(`/appointments/${id}`);
        setAppointments(prev => prev.filter(a => a.id !== id));
        } catch (error) {
        console.error("Detalhes do erro:", error);
        alert("Erro ao remover consulta.");
        }
    }
    };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="text-indigo-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Consultas Agendadas</h1>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex gap-4">
        <button onClick={() => navigate('/appointments/create')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm">
          <Plus size={16} /> Nova Consulta
        </button>
        <button onClick={() => navigate('/appointments/update')} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm">
          <Edit size={16} /> Alterar
        </button>
        <button onClick={() => navigate('/appointments/delete')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm">
          <Trash size={16} /> Excluir
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative group">
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => navigate(`/appointments/update/${app.id}`)} className="text-gray-400 hover:text-amber-500 p-1"><Pencil size={18} /></button>
              <button onClick={() => handleDeleteDirect(app.id)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={18} /></button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600"><Clock size={24} /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Data e Hora</p>
                <p className="text-lg font-bold text-gray-800">
                  {new Date(app.date).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User size={18} className="text-blue-500" />
                <span className="text-sm font-semibold">Psicólogo:</span>
                <span className="text-sm">{app.psychologist?.name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <UserCircle size={18} className="text-emerald-500" />
                <span className="text-sm font-semibold">Paciente:</span>
                <span className="text-sm">{app.patient?.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}