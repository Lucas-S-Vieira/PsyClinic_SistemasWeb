import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import type { PsychologistInterface } from '../../types/psychologist';
import { Edit, ArrowLeft, Save } from 'lucide-react';

export default function UpdatePsychologist() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [psychologists, setPsychologists] = useState<PsychologistInterface[]>([]);
  const [selectedId, setSelectedId] = useState<string>(id || '');
  const [newName, setNewName] = useState('');

  // 1. O único useEffect agora faz a busca E já preenche o nome se vier do "Lápis"
  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const response = await api.get('/psychologists');
        if (!ignore) {
          setPsychologists(response.data);
          
          // Se tiver um ID na URL, acha o psicólogo na lista que acabou de chegar e preenche
          if (id) {
            const selected = response.data.find((p: PsychologistInterface) => p.id === Number(id));
            if (selected) setNewName(selected.name);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
    return () => { ignore = true; };
  }, [id]);

  // 2. Nova função que roda na mesma hora que o usuário clica na caixinha do select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const novoId = e.target.value;
    setSelectedId(novoId);
    
    // Atualiza o nome no mesmo instante, sem precisar de useEffect
    const selected = psychologists.find(p => p.id === Number(novoId));
    if (selected) {
      setNewName(selected.name);
    } else {
      setNewName('');
    }
  };

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!selectedId || !newName) return;

    try {
      await api.put(`/psychologists/${selectedId}`, { name: newName });
      alert("Psicólogo alterado com sucesso!");
      navigate('/psychologists');
    } catch (error) {
      console.error(error);
      alert("Erro ao alterar psicólogo. Verifique se a rota PUT existe no backend.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/psychologists')} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={20} /> Voltar para Psicólogos
      </button>

      <div className="flex items-center gap-3 mb-8">
        <Edit className="text-amber-500" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Alterar Psicólogo</h1>
      </div>

      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Selecione o Psicólogo</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
            value={selectedId}
            onChange={handleSelectChange} // <--- Passamos a nova função pra cá
          >
            <option value="" disabled>Escolha quem deseja alterar...</option>
            {psychologists.map(psy => (
              <option key={psy.id} value={psy.id}>ID: {psy.id} - {psy.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">Novo Nome</label>
          <input
            type="text"
            placeholder="Digite o novo nome"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            disabled={!selectedId}
          />
        </div>

        <button type="submit" disabled={!selectedId || !newName} className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow-sm">
          <Save size={20} /> Salvar Alterações
        </button>
      </form>
    </div>
  );
}