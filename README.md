# FinTrack

Aplicação web para controle financeiro pessoal. O FinTrack permite registrar e
acompanhar ganhos, gastos e investimentos em um dashboard com filtros, resumo
financeiro e visualização gráfica.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

## Demonstração

Acesse a aplicação publicada: [fintrack-jade-rho.vercel.app](https://fintrack-jade-rho.vercel.app/)

## Funcionalidades

- Cadastro, login e persistência da sessão do usuário;
- Renovação automática do token de acesso;
- Logout com limpeza dos dados armazenados em cache;
- Filtro de informações por período;
- Resumo de saldo, ganhos, gastos e investimentos;
- Gráfico com a distribuição das movimentações financeiras;
- Cadastro, edição e exclusão de transações;
- Confirmação antes da exclusão de uma transação;
- Tabela com ordenação e paginação;
- Estados de carregamento, erro e ausência de resultados;
- Layout responsivo para dispositivos móveis e desktop;
- Página personalizada para rotas não encontradas.

## Tecnologias

- [React](https://react.dev/) e [Vite](https://vite.dev/);
- [React Router](https://reactrouter.com/);
- [TanStack Query](https://tanstack.com/query/latest) para estado assíncrono e
  cache;
- [TanStack Table](https://tanstack.com/table/latest) para a tabela de
  transações;
- [React Hook Form](https://react-hook-form.com/) e
  [Zod](https://zod.dev/) para formulários e validações;
- [Axios](https://axios-http.com/) para comunicação com a API;
- [Recharts](https://recharts.org/) para o gráfico financeiro;
- [Tailwind CSS](https://tailwindcss.com/) e componentes baseados em
  [shadcn/ui](https://ui.shadcn.com/);
- [Radix UI](https://www.radix-ui.com/) para componentes acessíveis;
- [date-fns](https://date-fns.org/) para tratamento de datas;
- [Sonner](https://sonner.emilkowal.ski/) para notificações.

## Organização do projeto

```text
src/
├── api/
│   ├── hooks/       # Queries e mutations do TanStack Query
│   └── services/    # Comunicação com a API
├── assets/          # Fontes e imagens
├── components/
│   └── ui/          # Componentes reutilizáveis de interface
├── constants/       # Chaves e valores constantes
├── contexts/        # Estado global de autenticação
├── forms/
│   ├── hooks/       # Integração dos formulários
│   └── schemas/     # Validações com Zod
├── helpers/         # Funções auxiliares
├── lib/             # Configurações de bibliotecas
└── pages/           # Páginas da aplicação
```

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior;
- npm;
- conexão com a internet para acessar a API.

### Instalação

```bash
git clone https://github.com/jessesiqueira-dev/fintrack.git
cd fintrack
npm install
npm run dev
```

Depois, acesse o endereço exibido pelo Vite no terminal, normalmente
`http://localhost:5173`.

## Scripts

```bash
npm run dev      # Inicia o ambiente de desenvolvimento
npm run build    # Gera a versão de produção
npm run lint     # Analisa o código com ESLint
npm run preview  # Visualiza localmente o build de produção
```

## API

O frontend consome uma API externa para autenticação, usuários, saldo e
transações. Como o serviço está hospedado no Render, a primeira requisição pode
demorar alguns segundos quando a API estiver inativa.

As principais operações utilizadas são:

- Criação e autenticação de usuários;
- Consulta do usuário autenticado;
- Renovação dos tokens de acesso;
- Consulta do saldo por período;
- Criação, listagem, edição e exclusão de transações.

## Próximas melhorias

- Adicionar testes automatizados;
- Adicionar capturas de tela da interface.

## Autor

Desenvolvido por [Jessé Siqueira](https://github.com/jessesiqueira-dev).
