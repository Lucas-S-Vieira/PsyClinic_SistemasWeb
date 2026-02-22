import { useEffect, useState } from 'react';
import api from '../services/api';
import type { PsychologistInterface } from '../types/psychologist';
import { UserPlus, Users } from 'lucide-react';

export default function Psychologists() {
  const [psychologists, setPsychologists] = useState<PsychologistInterface[]>([]);
  const [newName, setNewName] = useState('');

  // 1. O React prefere que a busca inicial fique encapsulada no próprio useEffect
  useEffect(() => {
    let ignore = false; // Previne que a tela tente atualizar se o componente for desmontado

    async function loadData() {
      try {
        const response = await api.get('/api/psychologists');
        if (!ignore) {
          setPsychologists(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar psicólogos", error);
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  // 2. Na hora de criar, fazemos a requisição e atualizamos a lista diretamente
  const handleCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!newName) return;

    try {
      await api.post('/api/psychologists', { name: newName });
      setNewName('');
      
      // Busca a lista atualizada novamente e substitui no estado
      const response = await api.get('/api/psychologists');
      setPsychologists(response.data);
    } catch (error) {
        console.error(error)
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Users className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Psicólogos</h1>
      </div>

      <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-md mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Nome do novo psicólogo"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <UserPlus size={20} /> Cadastrar
        </button>
      </form>

      <div className="grid gap-4">
        {psychologists.map((psy) => (
          <div key={psy.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
            <span className="font-medium text-gray-700">{psy.name}</span>
            <span className="text-xs text-gray-400">ID: {psy.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}