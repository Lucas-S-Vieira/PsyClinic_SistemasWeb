import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { PsychologistInterface } from '../../types/psychologist';
import { Users, CalendarPlus, Activity, Pencil, Trash2, Edit, Trash, UserPlus } from 'lucide-react';
 
export default function ListPsychologists() {
  const [psychologists, setPsychologists] = useState<PsychologistInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const response = await api.get('/psychologists');
        if (!ignore) setPsychologists(response.data);
      } catch (error) {
        console.error("Erro ao carregar a lista:", error);
      }
    }
    loadData();
    return () => { ignore = true; };
  }, []);

  const handleDeleteDirect = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este psicólogo?")) {
      try {
        await api.delete(`/psychologists/${id}`);
        const response = await api.get('/psychologists');
        setPsychologists(response.data);
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir.");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Psicólogos</h1>
      </div>

      {/* Botões de Ação Principais */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex gap-4">
        <button 
          onClick={() => navigate('/psychologists/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm"
        >
          <UserPlus size={16} /> Novo Psicólogo
        </button>
        
        <button 
          onClick={() => navigate('/psychologists/update')}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm"
        >
          <Edit size={16} /> Alterar
        </button>
        
        <button 
          onClick={() => navigate('/psychologists/delete')}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm"
        >
          <Trash size={16} /> Excluir
        </button>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {psychologists.map((psy) => (
          <div key={psy.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col justify-between h-full relative group">
            
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => navigate(`/psychologists/update/${psy.id}`)} className="text-gray-400 hover:text-amber-500 transition-colors p-1" title="Editar">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDeleteDirect(psy.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Excluir">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="flex justify-between items-start mb-6 pr-16">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg leading-tight mb-1">{psy.name}</h3>
                <span className="text-xs text-gray-400 font-mono">ID: {psy.id}</span>
              </div>
            </div>
            
            <div className="mb-4">
               <div className="w-fit bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                  <Activity size={14} />
                  {psy._count?.appointments || 0} Consultas
                </div>
            </div>
            
            <button 
              type="button"
              className="w-full flex justify-center items-center gap-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200 py-2.5 rounded-lg transition-colors text-sm font-medium mt-auto"
            >
              <CalendarPlus size={18} /> Agendar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
