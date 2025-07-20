# InsideSolar - Marketplace de Energia Solar

![InsideSolar Logo](https://img.shields.io/badge/InsideSolar-Energia%20Solar-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-Backend-red?style=flat-square&logo=nestjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=flat-square&logo=docker)

## 🌟 Sobre o Projeto

O **InsideSolar** é uma plataforma completa inspirada no G2.com, especificamente desenvolvida para o mercado brasileiro de energia solar. A aplicação conecta consumidores com empresas especializadas em energia solar, oferecendo um marketplace robusto com funcionalidades avançadas de comparação, avaliação e contratação de serviços.
> **Aviso**: este repositório contém um protótipo inicial e muitas funcionalidades descritas ainda estão em desenvolvimento.


### 🎯 Objetivos

- **Conectar** consumidores com empresas de energia solar confiáveis
- **Facilitar** a comparação de preços, serviços e avaliações
- **Promover** a adoção de energia solar no Brasil
- **Garantir** transparência através de avaliações verificadas
- **Otimizar** o processo de contratação de serviços solares

## 🚀 Funcionalidades Principais

### Funcionalidades atuais
- Estrutura inicial de frontend em Next.js
- Operacoes basicas de empresas e avaliacoes
- Pagina de mapa com dados de exemplo
- Configuracao de autenticacao JWT (incompleta)

### Funcionalidades planejadas
- Busca avancada e filtros
- Sistema integrado de orcamentos
- Dashboard para empresas
- Cadastro completo de usuarios


## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI acessíveis
- **Mapbox GL JS** - Mapas interativos
- **Lucide React** - Ícones modernos

### Backend
- **NestJS** - Framework Node.js escalável
- **Prisma ORM** - ORM type-safe
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação e autorização
- **bcryptjs** - Hash de senhas
- **Class Validator** - Validação de dados

### DevOps & Deploy
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **GitHub Actions** - CI/CD
- **Nginx** - Reverse proxy
- **Redis** - Cache e sessões

## 📋 Pré-requisitos

- **Node.js** 20.x ou superior
- **npm** ou **yarn**
- **Docker** e **Docker Compose**
- **PostgreSQL** 15+ (se executar sem Docker)
- **Git**

## 🚀 Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/insidesolar.git
cd insidesolar
```

### 2. Configuração com Docker (Recomendado)

```bash
# Copie o arquivo de ambiente
cp .env.example .env

# Edite as variáveis de ambiente
nano .env

# Execute o build
./scripts/build.sh

# Inicie a aplicação
./scripts/start.sh
```

### 3. Configuração Manual

#### Backend
```bash
cd backend

# Instale as dependências
npm install

# Configure o banco de dados
cp .env.example .env
# Edite o .env com suas configurações

# Execute as migrações
npx prisma migrate dev
npx prisma generate

# Inicie o servidor
npm run start:dev
```

#### Frontend
```bash
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite o .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente - Backend (.env)

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/insidesolar"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# Redis
REDIS_URL="redis://localhost:6379"

# Server
PORT=3001
NODE_ENV=development
```

### Variáveis de Ambiente - Frontend (.env.local)

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token

# Environment
NODE_ENV=development
```

## 📚 Documentação da API

### Endpoints Principais

#### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil do usuário

#### Empresas
- `GET /api/companies` - Listar empresas
- `GET /api/companies/:id` - Detalhes da empresa
- `POST /api/companies` - Criar empresa (autenticado)
- `PUT /api/companies/:id` - Atualizar empresa (autenticado)

#### Avaliações
- `GET /api/reviews` - Listar avaliações
- `POST /api/reviews` - Criar avaliação (autenticado)
- `GET /api/companies/:id/reviews` - Avaliações da empresa

#### Usuários
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil

### Exemplo de Uso da API

```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'usuario@email.com',
    password: 'senha123'
  })
});

const { access_token, user } = await response.json();

// Buscar empresas
const companies = await fetch('/api/companies', {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
});
```

## 🧪 Testes

### Executar Todos os Testes
```bash
./scripts/test.sh
```

### Testes Específicos
```bash
# Backend
cd backend
npm run test
npm run test:e2e

# Frontend
cd frontend
npm run test
npm run lint
```

## 🚀 Deploy

### Deploy com Docker
```bash
# Produção
./scripts/build.sh production
./scripts/start.sh production -d
```

### Deploy Manual
```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm start
```

## 📱 URLs da Aplicação

### Desenvolvimento
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Nginx**: http://localhost:80

### Produção
- **Site Público**: https://urowphgt.manussite.space
- **API**: (Backend requer configuração adicional para produção)

## 🏗️ Arquitetura do Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (NestJS)      │◄──►│  (PostgreSQL)   │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Nginx       │    │     Redis       │    │     Docker      │
│  (Reverse Proxy)│    │    (Cache)      │    │  (Container)    │
│   Port: 80      │    │   Port: 6379    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Use **TypeScript** em todo o código
- Siga as convenções do **ESLint** e **Prettier**
- Escreva testes para novas funcionalidades
- Documente APIs e componentes complexos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvedor Principal**: Manus AI
- **Arquitetura**: Full-stack TypeScript
- **Design**: Inspirado no G2.com
- **Foco**: Mercado brasileiro de energia solar

## 📞 Suporte

Para suporte e dúvidas:
- 📧 Email: suporte@insidesolar.com.br
- 📱 WhatsApp: (11) 99999-9999
- 🌐 Site: https://urowphgt.manussite.space

## 🔄 Roadmap

O desenvolvimento ainda está em estágio inicial. As prioridades para as próximas versões são:
- Consolidar o módulo de autenticação
- Adicionar busca e filtros de empresas
- Integrar o sistema de solicitações de orçamento

