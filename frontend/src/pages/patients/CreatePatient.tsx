import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { UserPlus, ArrowLeft, Save } from 'lucide-react';

export default function CreatePatient() {
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!newName) return;
    try {
      await api.post('/patients', { name: newName });
      alert("Paciente cadastrado com sucesso!");
      navigate('/patients');
    } catch {
      alert("Erro ao cadastrar paciente.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/patients')} className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6 transition-colors"><ArrowLeft size={20} /> Voltar</button>
      <div className="flex items-center gap-3 mb-8">
        <UserPlus className="text-emerald-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Novo Paciente</h1>
      </div>
      <form onSubmit={handleCreate} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">Nome Completo</label>
          <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus />
        </div>
        <button type="submit" disabled={!newName} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow-sm"><Save size={20} /> Cadastrar</button>
      </form>
    </div>
  );
}