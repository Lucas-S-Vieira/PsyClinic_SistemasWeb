import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import type { AppointmentInterface } from '../../types/appointment';
import type { PsychologistInterface } from '../../types/psychologist';
import type { PatientInterface } from '../../types/patient';
import { Edit, ArrowLeft, Save } from 'lucide-react';

export default function UpdateAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
  const [psychologists, setPsychologists] = useState<PsychologistInterface[]>([]);
  const [patients, setPatients] = useState<PatientInterface[]>([]);

  const [selectedId, setSelectedId] = useState<string>(id || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [psychologistId, setPsychologistId] = useState('');
  const [patientId, setPatientId] = useState('');

  const availableTimes = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  // Definindo fillForm ANTES do useEffect para evitar erro de hoisting
  const fillForm = (apt: AppointmentInterface) => {
    const dt = new Date(apt.date);
    setDate(dt.toISOString().split('T')[0]);
    setTime(dt.toISOString().split('T')[1].substring(0, 5));
    setPsychologistId(String(apt.psychologist_id));
    setPatientId(String(apt.patient_id));
  };

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const [aptRes, psyRes, patRes] = await Promise.all([
          api.get('/appointments'),
          api.get('/psychologists'),
          api.get('/patients')
        ]);
        if (!ignore) {
          setAppointments(aptRes.data);
          setPsychologists(psyRes.data);
          setPatients(patRes.data);

          if (id) {
            const selected = aptRes.data.find((a: AppointmentInterface) => a.id === Number(id));
            if (selected) fillForm(selected);
          }
        }
      } catch (error) { console.error(error); }
    }
    loadData();
    return () => { ignore = true; };
  }, [id]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const novoId = e.target.value;
    setSelectedId(novoId);
    const selected = appointments.find(a => a.id === Number(novoId));
    if (selected) fillForm(selected);
  };

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const combinedDateTime = new Date(`${date}T${time}:00`);
      await api.put(`/appointments/${selectedId}`, {
        date: combinedDateTime.toISOString(),
        psychologist_id: Number(psychologistId),
        patient_id: Number(patientId)
      });
      alert("Consulta atualizada!");
      navigate('/appointments');
    } catch { alert("Erro ao atualizar."); }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button onClick={() => navigate('/appointments')} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors"><ArrowLeft size={20} /> Voltar</button>
      <div className="flex items-center gap-3 mb-8"><Edit className="text-amber-500" size={32} /><h1 className="text-3xl font-bold text-gray-800">Alterar Consulta</h1></div>

      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Selecione o Agendamento</label>
          <select className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500 bg-white" value={selectedId} onChange={handleSelectChange}>
            <option value="" disabled>Escolha uma consulta...</option>
            {appointments.map(a => (
              <option key={a.id} value={a.id}>ID: {a.id} - {a.patient?.name} com {a.psychologist?.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Nova Data</label>
            <input type="date" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500" value={date} onChange={e => setDate(e.target.value)} disabled={!selectedId} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Nova Hora</label>
            <select className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500 bg-white" value={time} onChange={e => setTime(e.target.value)} disabled={!selectedId}>
              <option value="">--:--</option>
              {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Alterar Psicólogo</label>
            <select className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500 bg-white" value={psychologistId} onChange={e => setPsychologistId(e.target.value)} disabled={!selectedId}>
              {psychologists.map(psy => <option key={psy.id} value={psy.id}>{psy.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Alterar Paciente</label>
            <select className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500 bg-white" value={patientId} onChange={e => setPatientId(e.target.value)} disabled={!selectedId}>
              {patients.map(pat => <option key={pat.id} value={pat.id}>{pat.name}</option>)}
            </select>
          </div>
        </div>

        <button type="submit" disabled={!selectedId} className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow-sm"><Save size={20} /> Salvar Alterações</button>
      </form>
    </div>
  );
}