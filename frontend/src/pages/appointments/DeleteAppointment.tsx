import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { AppointmentInterface } from '../../types/appointment';
import { Trash, ArrowLeft, Trash2 } from 'lucide-react';

export default function DeleteAppointment() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data);
      } catch (error) { console.error(error); }
    }
    loadData();
  }, []);

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    if (window.confirm("Deseja realmente cancelar este agendamento?")) {
      try {
        await api.delete(`/appointments/${selectedId}`);
        alert("Agendamento cancelado!");
        navigate('/appointments');
      } catch { alert("Erro ao excluir."); }
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/appointments')} className="flex items-center gap-2 text-gray-500 hover:text-red-600 mb-6 transition-colors"><ArrowLeft size={20} /> Voltar</button>
      <div className="flex items-center gap-3 mb-8"><Trash className="text-red-500" size={32} /><h1 className="text-3xl font-bold text-gray-800">Cancelar Consulta</h1></div>
      <form onSubmit={handleDelete} className="bg-white p-8 rounded-xl shadow-sm border border-red-100">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">Selecione a Consulta</label>
          <select className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 bg-white" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="" disabled>Escolha a consulta para cancelar...</option>
            {appointments.map(a => (
              <option key={a.id} value={a.id}>ID: {a.id} - {a.patient?.name} ({new Date(a.date).toLocaleDateString()})</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={!selectedId} className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow-sm"><Trash2 size={20} /> Confirmar Cancelamento</button>
      </form>
    </div>
  );
}