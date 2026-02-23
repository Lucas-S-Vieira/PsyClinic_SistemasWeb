import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Menu() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center mb-8">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Activity className="text-blue-600" size={28} />
        <span className="text-2xl font-bold text-blue-600">PsyClinic</span>
      </Link>
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