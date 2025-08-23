# Shell Frontend

Aplicação web desenvolvida com [Next.js](https://nextjs.org/) que reúne Tailwind CSS, Prisma e autenticação com NextAuth. O projeto foi iniciado com `create-next-app` e serve como base para aplicações que utilizam uma arquitetura moderna em React.

## Pré-requisitos

- Node.js 18 ou superior
- npm, yarn, pnpm ou bun

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

## Executando em desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
```

O comando executa a compilação do Next.js e prepara o projeto para deploy.

## Estrutura do repositório

```
├── prisma/              # Definição do schema Prisma e migrações
├── public/              # Arquivos estáticos como imagens e ícones
├── src/
│   ├── assets/          # Recursos estáticos internos
│   ├── components/      # Componentes React reutilizáveis
│   ├── hooks/           # Hooks customizados
│   ├── i18n/            # Configuração de internacionalização
│   ├── lib/             # Código utilitário e integrações
│   ├── pages/           # Rotas tradicionais do Next.js
│   ├── providers/       # Contextos e provedores globais
│   ├── styles/          # Estilos Tailwind e CSS
│   ├── types/           # Definições TypeScript compartilhadas
│   └── utils/           # Funções auxiliares
├── next.config.js       # Configurações do Next.js
├── tailwind.config.ts   # Configuração do Tailwind CSS
└── package.json         # Dependências e scripts do projeto
```

## Scripts

- `npm run dev` – inicializa o servidor de desenvolvimento
- `npm run build` – gera a versão de produção
- `npm run start` – executa a versão de produção
- `npm run seed` – popula o banco de dados utilizando Prisma

## Exemplos de código e uso

### Componente React com Tailwind

```tsx
import { UiButton } from "@/components";

export function Exemplo() {
  return (
    <UiButton onClick={() => alert("Olá!")}>Clique aqui</UiButton>
  );
}
```

### Consulta simples com Prisma

```ts
import { prisma } from "@/lib/prisma";

async function listarUsuarios() {
  const users = await prisma.user.findMany();
  console.log(users);
}
```

Esses trechos demonstram como utilizar componentes do projeto e realizar uma consulta ao banco de dados.

## Contribuindo

Sinta-se à vontade para abrir issues e pull requests com melhorias ou correções.

## Licença

Este repositório não possui licença definida.

