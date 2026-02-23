import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";

// Importações do módulos
import CreatePsychologist from "./pages/psychologists/CreatePsychologist";
import ListPsychologists from "./pages/psychologists/ListPsychologists";
import UpdatePsychologist from "./pages/psychologists/UpdatePsychologist";
import DeletePsychologist from "./pages/psychologists/DeletePsychologist";
import CreateAppointment from "./pages/appointments/CreateAppointment";
import ListAppointments from "./pages/appointments/ListAppointments";
import UpdateAppointment from "./pages/appointments/UpdateAppointment";
import DeleteAppointment from "./pages/appointments/DeleteAppointment";
import CreatePatient from "./pages/patients/CreatePatient";
import ListPatients from "./pages/patients/ListPatients";
import UpdatePatient from "./pages/patients/UpdatePatient";
import DeletePatient from "./pages/patients/DeletePatient";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Menu />
        
        <main className="max-w-5xl mx-auto pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Rotas de Psicólogos */}
            <Route path="/psychologists" element={<ListPsychologists />} />
            <Route path="/psychologists/create" element={<CreatePsychologist />} />
            <Route path="/psychologists/update" element={<UpdatePsychologist />} />
            <Route path="/psychologists/update/:id" element={<UpdatePsychologist />} />
            <Route path="/psychologists/delete" element={<DeletePsychologist />} />
            
            {/* Rotas de Pacientes*/}
            <Route path="/patients" element={<ListPatients />} />
            <Route path="/patients/create" element={<CreatePatient />} />
            <Route path="/patients/update" element={<UpdatePatient />} />
            <Route path="/patients/update/:id" element={<UpdatePatient />} />
            <Route path="/patients/delete" element={<DeletePatient />} />

            {/* Rotas de Consultas*/}
            <Route path="/appointments" element={<ListAppointments />} />
            <Route path="/appointments/create" element={<CreateAppointment />} />
            <Route path="/appointments/update" element={<UpdateAppointment />} />
            <Route path="/appointments/update/:id" element={<UpdateAppointment />} />
            <Route path="/appointments/delete" element={<DeleteAppointment />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}