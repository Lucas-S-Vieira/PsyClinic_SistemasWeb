import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { PatientInterface } from '../../types/patient';
import { Trash, ArrowLeft, Trash2 } from 'lucide-react';

export default function DeletePatient() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<PatientInterface[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const response = await api.get('/patients');
        if (!ignore) setPatients(response.data);
      } catch (error) { console.error(error); }
    }
    loadData();
    return () => { ignore = true; };
  }, []);

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    if (window.confirm("Atenção: Tem certeza absoluta que deseja excluir este paciente?")) {
      try {
        await api.delete(`/patients/${selectedId}`);
        alert("Paciente excluído com sucesso!");
        navigate('/patients');
      } catch { alert("Erro ao excluir. Verifique consultas atreladas."); }
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/patients')} className="flex items-center gap-2 text-gray-500 hover:text-red-600 mb-6 transition-colors"><ArrowLeft size={20} /> Voltar</button>
      <div className="flex items-center gap-3 mb-8"><Trash className="text-red-500" size={32} /><h1 className="text-3xl font-bold text-gray-800">Excluir Paciente</h1></div>
      <form onSubmit={handleDelete} className="bg-white p-8 rounded-xl shadow-sm border border-red-100">
        <div className="mb-8"><label className="block text-sm font-medium text-gray-600 mb-2">Selecione o Paciente</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="" disabled>Escolha o paciente...</option>
            {patients.map(p => <option key={p.id} value={p.id}>ID: {p.id} - {p.name}</option>)}
          </select>
        </div>
        <button type="submit" disabled={!selectedId} className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow-sm"><Trash2 size={20} /> Confirmar Exclusão</button>
      </form>
    </div>
  );
}