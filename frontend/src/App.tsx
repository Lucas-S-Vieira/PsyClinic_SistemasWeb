import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Psychologists from "./pages/Psychologists";

const Patients = () => <div className="p-8 text-center text-gray-500">Página de Pacientes (Em breve)</div>;
const Appointments = () => <div className="p-8 text-center text-gray-500">Página de Consultas (Em breve)</div>;

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Menu />
        
        {}
        <main className="max-w-5xl mx-auto pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/psychologists" element={<Psychologists />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointments />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}