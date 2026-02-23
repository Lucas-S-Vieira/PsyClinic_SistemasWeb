import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { UserPlus, ArrowLeft, Save } from 'lucide-react';

export default function CreatePsychologist() {
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!newName) return;

    try {
      await api.post('/psychologists', { name: newName });
      alert("Psicólogo cadastrado com sucesso!");
      navigate('/psychologists'); // Volta para a listagem automaticamente
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar psicólogo. Verifique o console.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Botão de Voltar */}
      <button 
        onClick={() => navigate('/psychologists')}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Voltar para Psicólogos
      </button>

      <div className="flex items-center gap-3 mb-8">
        <UserPlus className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Novo Psicólogo</h1>
      </div>

      <form onSubmit={handleCreate} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">Nome Completo</label>
          <input
            type="text"
            placeholder="Ex: Dr. Sigmund Freud"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={!newName}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow-sm"
        >
          <Save size={20} /> Cadastrar
        </button>
      </form>
    </div>
  );
}