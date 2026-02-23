import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { PsychologistInterface } from '../../types/psychologist';
import { Trash, ArrowLeft, Trash2 } from 'lucide-react';

export default function DeletePsychologist() {
  const navigate = useNavigate();
  const [psychologists, setPsychologists] = useState<PsychologistInterface[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const response = await api.get('/psychologists');
        if (!ignore) setPsychologists(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
    return () => { ignore = true; };
  }, []);

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!selectedId) return;

    // Dupla confirmação para evitar cliques acidentais
    if (window.confirm("Atenção: Tem certeza absoluta que deseja excluir este registo?")) {
      try {
        await api.delete(`/psychologists/${selectedId}`);
        alert("Psicólogo excluído com sucesso!");
        navigate('/psychologists'); // Volta para a lista
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir. Verifique se o backend está a rodar ou se existem consultas atreladas a este psicólogo.");
      }
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/psychologists')} className="flex items-center gap-2 text-gray-500 hover:text-red-600 mb-6 transition-colors">
        <ArrowLeft size={20} /> Voltar para Psicólogos
      </button>

      <div className="flex items-center gap-3 mb-8">
        <Trash className="text-red-500" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Excluir Psicólogo</h1>
      </div>

      <form onSubmit={handleDelete} className="bg-white p-8 rounded-xl shadow-sm border border-red-100">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">Selecione o Psicólogo</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="" disabled>Escolha quem deseja excluir...</option>
            {psychologists.map(psy => (
              <option key={psy.id} value={psy.id}>ID: {psy.id} - {psy.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={!selectedId} className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow-sm">
          <Trash2 size={20} /> Confirmar Exclusão
        </button>
      </form>
    </div>
  );
}