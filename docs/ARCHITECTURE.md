# Arquitetura do Sistema InsideSolar

## Visão Geral

O InsideSolar foi projetado seguindo uma arquitetura moderna de microserviços com separação clara entre frontend e backend, garantindo escalabilidade, manutenibilidade e performance.

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 14 (App Router)  │  TypeScript  │  Tailwind CSS      │
│  shadcn/ui Components     │  Mapbox GL   │  Responsive Design  │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP/HTTPS
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REVERSE PROXY LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│                        Nginx                                    │
│  • Load Balancing    • SSL Termination    • Static Files      │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                       BACKEND LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  NestJS Framework     │  TypeScript      │  Prisma ORM        │
│  JWT Authentication   │  Class Validator │  Passport.js       │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    │ SQL
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL 15+       │  TimescaleDB     │  Redis Cache       │
│  Prisma Migrations    │  Connection Pool │  Session Store     │
└─────────────────────────────────────────────────────────────────┘
```

## Componentes Principais

### 1. Frontend (Next.js 14)

#### Estrutura de Diretórios
```
frontend/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── page.tsx           # Página inicial
│   │   ├── empresas/          # Páginas de empresas
│   │   ├── login/             # Autenticação
│   │   └── mapa/              # Mapa interativo
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ui/                # Componentes base (shadcn/ui)
│   │   ├── layout/            # Layout components
│   │   ├── map/               # Componentes de mapa
│   │   └── reviews/           # Sistema de avaliações
│   └── lib/                   # Utilitários e configurações
├── public/                    # Assets estáticos
└── styles/                    # Estilos globais
```

#### Tecnologias Frontend
- **Next.js 14**: Framework React com App Router para SSR/SSG
- **TypeScript**: Tipagem estática para maior robustez
- **Tailwind CSS**: Framework CSS utilitário para design consistente
- **shadcn/ui**: Biblioteca de componentes acessíveis
- **Mapbox GL JS**: Mapas interativos e geolocalização
- **Lucide React**: Ícones SVG otimizados

#### Funcionalidades Frontend
- **Server-Side Rendering (SSR)**: Para melhor SEO
- **Static Site Generation (SSG)**: Para páginas estáticas
- **Client-Side Navigation**: Navegação fluida entre páginas
- **Responsive Design**: Adaptação automática para mobile/desktop
- **Progressive Web App (PWA)**: Funcionalidades de app nativo

### 2. Backend (NestJS)

#### Estrutura de Diretórios
```
backend/
├── src/
│   ├── auth/                  # Módulo de autenticação
│   │   ├── strategies/        # Estratégias Passport
│   │   ├── guards/            # Guards de proteção
│   │   └── dto/               # Data Transfer Objects
│   ├── companies/             # Módulo de empresas
│   ├── reviews/               # Módulo de avaliações
│   ├── users/                 # Módulo de usuários
│   ├── prisma/                # Configuração Prisma
│   └── common/                # Utilitários compartilhados
├── prisma/                    # Schema e migrações
└── test/                      # Testes automatizados
```

#### Tecnologias Backend
- **NestJS**: Framework Node.js modular e escalável
- **Prisma ORM**: ORM type-safe com geração automática de tipos
- **PostgreSQL**: Banco de dados relacional robusto
- **JWT**: Autenticação stateless
- **Passport.js**: Estratégias de autenticação
- **Class Validator**: Validação de dados de entrada

#### Padrões Arquiteturais
- **Dependency Injection**: Inversão de controle para testabilidade
- **Module System**: Organização modular do código
- **Guards & Interceptors**: Middleware para autenticação e logging
- **DTOs**: Validação e transformação de dados
- **Repository Pattern**: Abstração da camada de dados

### 3. Banco de Dados (PostgreSQL)

#### Schema Principal
```sql
-- Usuários do sistema
Users
├── id (UUID)
├── email (unique)
├── password_hash
├── name
├── role (CONSUMER, COMPANY, ADMIN)
├── created_at
└── updated_at

-- Empresas de energia solar
Companies
├── id (UUID)
├── name
├── description
├── location (Point - PostGIS)
├── phone
├── email
├── website
├── verified (boolean)
├── user_id (FK)
├── created_at
└── updated_at

-- Avaliações de empresas
Reviews
├── id (UUID)
├── rating (1-5)
├── title
├── content
├── company_id (FK)
├── user_id (FK)
├── created_at
└── updated_at

-- Solicitações de orçamento
Quotes
├── id (UUID)
├── name
├── email
├── phone
├── message
├── company_id (FK)
├── status
├── created_at
└── updated_at
```

#### Extensões PostgreSQL
- **PostGIS**: Para dados geoespaciais e consultas de proximidade
- **TimescaleDB**: Para dados de séries temporais (analytics)
- **pg_trgm**: Para busca textual avançada

### 4. Cache e Sessões (Redis)

#### Uso do Redis
- **Cache de Consultas**: Resultados de busca frequentes
- **Sessões de Usuário**: Armazenamento de sessões JWT
- **Rate Limiting**: Controle de taxa de requisições
- **Cache de Geolocalização**: Coordenadas de empresas

## Fluxo de Dados

### 1. Autenticação
```
User → Frontend → Backend → Database
     ← JWT Token ← Validation ← User Data
```

### 2. Busca de Empresas
```
Search Query → Frontend → Backend → Cache Check
                                 ↓ (if miss)
                               Database → PostGIS Query
                                       ↓
                               Cache Store ← Results
                                       ↓
Frontend ← JSON Response ← Backend ← Formatted Data
```

### 3. Avaliações
```
Review Form → Frontend → Backend → Validation
                                ↓
                              Database → Insert
                                      ↓
                              Cache Invalidation
                                      ↓
Frontend ← Success Response ← Backend ← Confirmation
```

## Segurança

### Autenticação e Autorização
- **JWT Tokens**: Autenticação stateless
- **Role-Based Access Control (RBAC)**: Diferentes níveis de acesso
- **Password Hashing**: bcrypt para senhas seguras
- **CORS**: Configuração adequada para cross-origin requests

### Validação de Dados
- **Input Validation**: Class-validator no backend
- **SQL Injection Prevention**: Prisma ORM com prepared statements
- **XSS Protection**: Sanitização de dados de entrada
- **CSRF Protection**: Tokens CSRF para formulários

### Infraestrutura
- **HTTPS**: SSL/TLS para comunicação segura
- **Rate Limiting**: Prevenção de ataques DDoS
- **Environment Variables**: Configurações sensíveis isoladas
- **Docker Security**: Containers com usuários não-root

## Performance

### Frontend
- **Code Splitting**: Carregamento sob demanda
- **Image Optimization**: Next.js Image component
- **Static Generation**: Páginas pré-renderizadas
- **CDN**: Distribuição de assets estáticos

### Backend
- **Connection Pooling**: Pool de conexões PostgreSQL
- **Query Optimization**: Índices e consultas eficientes
- **Caching Strategy**: Redis para dados frequentes
- **Compression**: Gzip para responses HTTP

### Database
- **Indexing**: Índices otimizados para consultas frequentes
- **Query Planning**: Análise de planos de execução
- **Partitioning**: Particionamento de tabelas grandes
- **Monitoring**: Logs e métricas de performance

## Escalabilidade

### Horizontal Scaling
- **Load Balancing**: Nginx para distribuição de carga
- **Stateless Design**: Backend sem estado para múltiplas instâncias
- **Database Replication**: Read replicas para consultas
- **Microservices Ready**: Arquitetura preparada para divisão

### Vertical Scaling
- **Resource Optimization**: Uso eficiente de CPU e memória
- **Connection Limits**: Configuração adequada de pools
- **Cache Sizing**: Dimensionamento apropriado do Redis
- **Database Tuning**: Otimização de parâmetros PostgreSQL

## Monitoramento

### Logs
- **Structured Logging**: Logs em formato JSON
- **Log Levels**: Debug, Info, Warn, Error
- **Request Tracing**: Rastreamento de requisições
- **Error Tracking**: Captura e análise de erros

### Métricas
- **Application Metrics**: Performance da aplicação
- **Database Metrics**: Queries, connections, performance
- **Infrastructure Metrics**: CPU, memória, disco, rede
- **Business Metrics**: Usuários ativos, conversões, etc.

## Deployment

### Containerização
- **Docker**: Containers para cada serviço
- **Docker Compose**: Orquestração local
- **Multi-stage Builds**: Otimização de imagens
- **Health Checks**: Verificação de saúde dos containers

### CI/CD Pipeline
- **GitHub Actions**: Automação de build e deploy
- **Testing**: Testes automatizados em cada commit
- **Security Scanning**: Análise de vulnerabilidades
- **Deployment**: Deploy automático para produção

### Ambientes
- **Development**: Ambiente local com hot-reload
- **Staging**: Ambiente de homologação
- **Production**: Ambiente de produção otimizado
- **Testing**: Ambiente isolado para testes

## Considerações Futuras

### Microserviços
- **Service Decomposition**: Divisão em serviços menores
- **API Gateway**: Ponto único de entrada
- **Service Discovery**: Descoberta automática de serviços
- **Event-Driven Architecture**: Comunicação assíncrona

### Cloud Native
- **Kubernetes**: Orquestração de containers
- **Service Mesh**: Comunicação segura entre serviços
- **Observability**: Tracing distribuído
- **Auto-scaling**: Escalonamento automático

Esta arquitetura garante que o InsideSolar seja robusto, escalável e mantenha alta performance mesmo com o crescimento da base de usuários e empresas.

