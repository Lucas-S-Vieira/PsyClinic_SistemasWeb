import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
// Importando as interfaces para remover o 'any'
import type { PsychologistInterface } from '../../types/psychologist';
import type { PatientInterface } from '../../types/patient';
import { CalendarPlus, ArrowLeft, Save } from 'lucide-react';

export default function CreateAppointment() {
  const navigate = useNavigate();
  
  // Tipando os estados com as suas interfaces
  const [psychologists, setPsychologists] = useState<PsychologistInterface[]>([]);
  const [patients, setPatients] = useState<PatientInterface[]>([]);
  
  const [formData, setFormData] = useState({
    psychologist_id: '',
    patient_id: '',
    date: '',
    time: ''
  });

  // Lista de horários que você sugeriu
  const availableTimes = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  useEffect(() => {
    let ignore = false;
    async function loadResources() {
      try {
        const [resPsy, resPat] = await Promise.all([
          api.get('/psychologists'),
          api.get('/patients')
        ]);
        if (!ignore) {
          setPsychologists(resPsy.data);
          setPatients(resPat.data);
        }
      } catch (error) {
        console.error("Erro ao carregar recursos:", error);
      }
    }
    loadResources();
    return () => { ignore = true; };
  }, []);

  const handleCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.psychologist_id || !formData.patient_id) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      // Combinando data e hora para o formato ISO que o Prisma espera
      const combinedDateTime = new Date(`${formData.date}T${formData.time}:00`);

      await api.post('/appointments', {
        date: combinedDateTime.toISOString(),
        psychologist_id: Number(formData.psychologist_id),
        patient_id: Number(formData.patient_id)
      });
      
      alert("Consulta agendada com sucesso!");
      navigate('/appointments');
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        const mensagemDeErro = error.response?.data?.message || "Erro inesperado.";
        alert(mensagemDeErro);
        console.error(error);
        }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button 
        onClick={() => navigate('/appointments')} 
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="flex items-center gap-3 mb-8">
        <CalendarPlus className="text-indigo-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Novo Agendamento</h1>
      </div>
      
      <form onSubmit={handleCreate} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Psicólogo</label>
          <select 
            required 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white" 
            value={formData.psychologist_id} 
            onChange={e => setFormData({...formData, psychologist_id: e.target.value})}
          >
            <option value="">Selecione um psicólogo...</option>
            {psychologists.map((ps) => (
              <option key={ps.id} value={ps.id}>{ps.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Paciente</label>
          <select 
            required 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white" 
            value={formData.patient_id} 
            onChange={e => setFormData({...formData, patient_id: e.target.value})}
          >
            <option value="">Selecione um paciente...</option>
            {patients.map((pa) => (
              <option key={pa.id} value={pa.id}>{pa.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Data</label>
            <input 
              type="date" 
              required 
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
              value={formData.date} 
              onChange={e => setFormData({...formData, date: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Hora</label>
            <select 
              required 
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white" 
              value={formData.time} 
              onChange={e => setFormData({...formData, time: e.target.value})}
            >
              <option value="">--:--</option>
              {availableTimes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium shadow-sm transition-colors"
        >
          <Save size={20} /> Agendar Consulta
        </button>
      </form>
    </div>
  );
}