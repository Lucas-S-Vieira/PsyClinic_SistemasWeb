export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Bem-vindo ao PsyClinic</h1>
      <p className="text-gray-600 text-lg max-w-2xl">
        Sistema de gerenciamento de sessões de terapia. Utilize o menu superior para navegar entre os cadastros de psicólogos, pacientes e para agendar novas consultas.
      </p>
    </div>
  );
}