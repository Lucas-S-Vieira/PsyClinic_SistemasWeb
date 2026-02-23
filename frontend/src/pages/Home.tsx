import { useEffect, useState } from 'react';
import api from '../services/api'; // Ajuste o caminho se necessário
import { Users, UserCircle, Calendar, Activity, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Stats {
  psychologists: number;
  patients: number;
  appointments: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await api.get('/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      }
    }
    loadStats();
  }, []);

  const cards = [
    {
      title: "Psicólogos",
      value: stats?.psychologists ?? 0,
      icon: <Users size={24} />,
      color: "bg-blue-500",
      path: "/psychologists"
    },
    {
      title: "Pacientes",
      value: stats?.patients ?? 0,
      icon: <UserCircle size={24} />,
      color: "bg-emerald-500",
      path: "/patients"
    },
    {
      title: "Consultas",
      value: stats?.appointments ?? 0,
      icon: <Calendar size={24} />,
      color: "bg-indigo-500",
      path: "/appointments"
    }
  ];

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-10">
        <Activity className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Painel de Controle</h1>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {cards.map((card, index) => (
          <div 
            key={index} 
            onClick={() => navigate(card.path)}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${card.color} p-3 rounded-xl text-white`}>
                {card.icon}
              </div>
              <ArrowRight className="text-gray-300 group-hover:text-gray-500 transition-colors" size={20} />
            </div>
            <h3 className="text-gray-500 font-medium mb-1">{card.title}</h3>
            <p className="text-4xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

        {/* Seção de Atalhos Rápidos */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-2">Bem-vindo ao PsyClinic, Lucas!</h2>
            <p className="opacity-90">O que você deseja realizar hoje no sistema?</p>
        </div>
        
        {/* Container de Botões Padronizados */}
        <div className="flex flex-wrap justify-center gap-4">
            <button 
            onClick={() => navigate('/psychologists/create')}
            className="bg-white text-blue-600 px-4 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
            + Novo Psicólogo
            </button>
            
            <button 
            onClick={() => navigate('/patients/create')}
            className="bg-white text-blue-600 px-4 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
            + Novo Paciente
            </button>

            <button 
            onClick={() => navigate('/appointments/create')}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
            Agendar Consulta
            </button>
        </div>
        </div>
    </div>
  );
}