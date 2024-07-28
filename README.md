# Contratos da Rádio

Este é um aplicativo web construído com React que permite gerenciar contratos, visualizar dados em gráficos e realizar operações de login. O aplicativo é composto por várias páginas que fornecem funcionalidades específicas, incluindo uma página de login, uma página de dashboard para visualização de gráficos, uma lista de contratos e uma página para criar novos contratos.

## Funcionalidades

- **Login:** Página de login para autenticação de usuários.
- **Dashboard:** Página que exibe um gráfico com a distribuição dos contratos por status.
- **Lista de Contratos:** Página para visualizar, editar e excluir contratos.
- **Criar Contrato:** Página para adicionar novos contratos.

## Tecnologias Utilizadas

- React
- React Router
- Axios
- Bootstrap
- Chart.js

## Estrutura do Projeto

**src/components**:

 - **Login.jsx:** Componente de login.
 - **Dashboard.jsx:** Componente do dashboard com gráficos.
 - **Contracts.jsx:** Componente para listar, editar e excluir contratos.
 - **CreateContract.jsx:** Componente para criar um novo contrato.
 - **ContractTable.jsx:** Componente para exibir a tabela de contratos.
 - **ContractForm.jsx:** Formulário para criação e edição de contratos.
 - **ContractFormList.jsx:** Formuário renderizado em lista.
 - **Pagination.jsx:** Componente de paginação para a lista de contratos.

**src/App.jsx:** Configuração das rotas do aplicativo.

**src/style:**
Css específico para cada página, deixando responsivo.

## Uso

**Página de Login:** Acesse a página inicial para fazer login com suas credenciais. Se a autenticação for bem-sucedida, você será redirecionado para a página do dashboard.

**Página do Dashboard:** A página do dashboard exibe um gráfico de pizza mostrando a distribuição dos contratos por status. Você pode clicar no botão "Ver Contratos" para acessar a lista de contratos.

**Lista de Contratos:** Na lista de contratos, você pode:
 - Criar um Novo Contrato: Clique no botão "Criar Novo Contrato" para ser redirecionado a página de criação de contratos.
 - Visualizar gráfico: Clique no botão "Ver Gráfico" para ser redirecionado até a página dashboard.
 - Editar um Contrato: Clique no botão "Editar" ao lado de um contrato para modificá-lo.
 - Excluir um Contrato: Clique no botão "Excluir" ao lado de um contrato para removê-lo.
 - Paginação de 10 contratos por vez.

**Página de Criar Novos Contratos:** Aqui vocẽ pode criar um novo contrato, adicionando nome do cliente, data de início e fim, valor do contrato e status do contrato. Ela também tem um botão que redireciona a lista de contratos.

