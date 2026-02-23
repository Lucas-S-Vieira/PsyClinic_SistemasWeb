import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import type { PatientInterface } from '../../types/patient';
import { Edit, ArrowLeft, Save } from 'lucide-react';

export default function UpdatePatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<PatientInterface[]>([]);
  const [selectedId, setSelectedId] = useState<string>(id || '');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const response = await api.get('/patients');
        if (!ignore) {
          setPatients(response.data);
          if (id) {
            const selected = response.data.find((p: PatientInterface) => p.id === Number(id));
            if (selected) setNewName(selected.name);
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
    const selected = patients.find(p => p.id === Number(novoId));
    setNewName(selected ? selected.name : '');
  };

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!selectedId || !newName) return;
    try {
      await api.put(`/patients/${selectedId}`, { name: newName });
      alert("Paciente alterado com sucesso!");
      navigate('/patients');
    } catch { alert("Erro ao alterar paciente."); }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/patients')} className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6 transition-colors"><ArrowLeft size={20} /> Voltar</button>
      <div className="flex items-center gap-3 mb-8"><Edit className="text-amber-500" size={32} /><h1 className="text-3xl font-bold text-gray-800">Alterar Paciente</h1></div>
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Selecione o Paciente</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white" value={selectedId} onChange={handleSelectChange}>
            <option value="" disabled>Escolha o paciente...</option>
            {patients.map(p => <option key={p.id} value={p.id}>ID: {p.id} - {p.name}</option>)}
          </select>
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">Novo Nome</label>
          <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" value={newName} onChange={(e) => setNewName(e.target.value)} disabled={!selectedId} />
        </div>
        <button type="submit" disabled={!selectedId || !newName} className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow-sm"><Save size={20} /> Salvar</button>
      </form>
    </div>
  );
}