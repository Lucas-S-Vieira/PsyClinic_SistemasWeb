# **CSI606-2025-02 - Remoto - Trabalho Final - Resultados**

## *Discente: Lucas Salgado Vieira*

### Resumo

O **PsyClinic** é um sistema web desenvolvido para simplificar o gerenciamento administrativo de uma clínica de psicologia. O foco central da aplicação é a organização de cadastros de profissionais e pacientes, permitindo o agendamento de consultas de forma intuitiva e integrada, eliminando a necessidade de controles manuais e garantindo a integridade dos dados através de um banco de dados relacional.

### 1. Funcionalidades implementadas

* **Gerenciamento de Psicólogos**: CRUD completo (Criação, Listagem, Atualização e Exclusão) de profissionais.
* **Gerenciamento de Pacientes**: CRUD completo para manutenção dos dados dos pacientes atendidos pela clínica.
* **Agendamento de Consultas**: Sistema de marcação que vincula um paciente a um psicólogo em data e hora específicas, utilizando interfaces tipadas para garantir a consistência.

### 2. Funcionalidades previstas e não implementadas

* **Campos Detalhados**: Dados como CRP, especialidade e data de nascimento foram simplificados para focar na estrutura funcional do CRUD e na estabilidade das rotas de API.

### 3. Outras funcionalidades implementadas

* **Exclusão em Cascata (Cascade Delete)**: Configuração no banco de dados via Prisma para que, ao excluir um psicólogo ou paciente, suas respectivas consultas sejam removidas automaticamente, mantendo a integridade referencial.
* **Identidade Visual e Favicon**: Implementação de um ícone personalizado para a aplicação e integração de logo clicável no menu para retorno à página inicial.
* **Botão de agendar dentro do card**: Implementação de agenda de consultas diretamente do psicólogo ou do paciente.
* **Dashboard da tela inicial**: Foi implementado um dashboard na tela inicial, que mostra quantos pacientes existem, quantos psicólogos existem e quantas consultas existem no sistema.
* **Limitação de data**: Evitar que sejam marcadas sessões para datas no passado.

### 4. Principais desafios e dificuldades

* **Definição do schema prisma**: Creio que a parte que mais tive dificuldades foi a definição do schema, por falta de experiência mesmo e creio que foi feito durante algumas aulas que faltei.
* **Definição de qual seria a aparência do sistema**: Foi uma decisão bem difícil, até mesmo pelo grande número de possibilidades, decidir qual seria a "cara" do sistema.
* **Utilização do TypeScript**: eu já estou acostumado com o js, mas ter que utilizar o ts foi um leve desafio, visto que possui pequenas diferenças.

### 5. Instruções para instalação e execução

1. **Backend**:
* Navegar até a pasta do servidor.
* Executar `npm install` para instalar as dependências (Express, Prisma, CORS).
* Configurar o banco de dados no arquivo `.env` seguindo o "Example.env".
* Executar `npm run migrate` para criar as tabelas e regras de cascata.
* Iniciar com `npm run dev` para executar com nodemon.
* Iniciar com `npm start` para executar normalmente sem nodemon.
* O backend ficará disponível da seguinte forma `http://localhost:5000/api`.


2. **Frontend**:
* Navegar até a pasta do frontend.
* Executar `npm install`.
* Iniciar a aplicação com `npm run dev`.
* O frontend ficará disponível da seguinte forma `http://localhost:5173/`



### 6. Referências

* Documentação do React Router: [https://reactrouter.com/](https://reactrouter.com/)
* Documentação do Prisma ORM: [https://www.prisma.io/docs/](https://www.prisma.io/docs/)
* Repositório de Ícones Lucide: [https://lucide.dev/](https://lucide.dev/)
