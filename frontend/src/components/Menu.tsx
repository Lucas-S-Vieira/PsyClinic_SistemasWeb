import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Menu() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center mb-8">
      <div className="flex items-center gap-2 font-bold text-xl text-blue-600 tracking-tight">
        <Activity size={24} />
        PsyClinic
      </div>
      <ul className="flex gap-6 text-gray-600 font-medium">
        <li>
          <Link to="/" className="hover:text-blue-500 transition-colors">Início</Link>
        </li>
        <li>
          <Link to="/psychologists" className="hover:text-blue-500 transition-colors">Psicólogos</Link>
        </li>
        <li>
          <Link to="/patients" className="hover:text-blue-500 transition-colors">Pacientes</Link>
        </li>
        <li>
          <Link to="/appointments" className="hover:text-blue-500 transition-colors">Consultas</Link>
        </li>
      </ul>
    </nav>
  );
}