# Guia de Instalação - InsideSolar

Este guia fornece instruções detalhadas para configurar e executar o InsideSolar em diferentes ambientes.

## 📋 Pré-requisitos

### Requisitos de Sistema
- **Sistema Operacional**: Linux (Ubuntu 20.04+), macOS (10.15+), Windows 10+ com WSL2
- **RAM**: Mínimo 4GB, recomendado 8GB+
- **Armazenamento**: Mínimo 10GB de espaço livre
- **Rede**: Conexão com internet para download de dependências

### Software Necessário

#### Opção 1: Instalação com Docker (Recomendado)
- **Docker**: 20.10.0 ou superior
- **Docker Compose**: 2.0.0 ou superior
- **Git**: Para clonar o repositório

#### Opção 2: Instalação Manual
- **Node.js**: 20.x LTS
- **npm**: 9.x ou superior (ou yarn 3.x)
- **PostgreSQL**: 15.x ou superior
- **Redis**: 7.x ou superior (opcional, para cache)
- **Git**: Para clonar o repositório

## 🐳 Instalação com Docker (Recomendado)

### 1. Preparação do Ambiente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/insidesolar.git
cd insidesolar

# Verifique se o Docker está funcionando
docker --version
docker-compose --version
```

### 2. Configuração de Variáveis de Ambiente

```bash
# Copie os arquivos de exemplo
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# Edite as configurações (use seu editor preferido)
nano .env
```

#### Arquivo .env (raiz do projeto)
```env
# Database
POSTGRES_DB=insidesolar
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
DATABASE_URL="postgresql://postgres:postgres123@db:5432/insidesolar"

# Redis
REDIS_URL=redis://redis:6379

# Environment
NODE_ENV=development
```

#### Arquivo backend/.env
```env
# Database
DATABASE_URL="postgresql://postgres:postgres123@db:5432/insidesolar"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Redis
REDIS_URL="redis://redis:6379"

# Server
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"
```

#### Arquivo frontend/.env.local
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Mapbox (obtenha em https://mapbox.com)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your-mapbox-token-here

# Environment
NODE_ENV=development
```

### 3. Build e Execução

```bash
# Torne os scripts executáveis
chmod +x scripts/*.sh

# Execute o build
./scripts/build.sh

# Inicie os serviços
./scripts/start.sh

# Ou use docker-compose diretamente
docker-compose up -d
```

### 4. Verificação da Instalação

```bash
# Verifique se todos os containers estão rodando
docker-compose ps

# Verifique os logs
docker-compose logs -f

# Teste as URLs
curl http://localhost:3000  # Frontend
curl http://localhost:3001/api/health  # Backend API
```

### 5. Configuração Inicial do Banco

```bash
# Execute as migrações do banco
docker-compose exec backend npx prisma migrate dev

# (Opcional) Popule com dados de exemplo
docker-compose exec backend npm run seed
```

## 🔧 Instalação Manual

### 1. Preparação do Ambiente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/insidesolar.git
cd insidesolar

# Verifique as versões
node --version  # deve ser 20.x
npm --version   # deve ser 9.x+
```

### 2. Configuração do Banco de Dados

#### PostgreSQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (com Homebrew)
brew install postgresql
brew services start postgresql

# Crie o banco de dados
sudo -u postgres createdb insidesolar
sudo -u postgres psql -c "CREATE USER insidesolar WITH PASSWORD 'password123';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE insidesolar TO insidesolar;"
```

#### Redis (Opcional)
```bash
# Ubuntu/Debian
sudo apt install redis-server

# macOS (com Homebrew)
brew install redis
brew services start redis

# Teste a conexão
redis-cli ping
```

### 3. Configuração do Backend

```bash
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
nano .env  # Edite conforme necessário

# Execute as migrações
npx prisma migrate dev
npx prisma generate

# (Opcional) Popule com dados de exemplo
npm run seed

# Inicie o servidor de desenvolvimento
npm run start:dev
```

### 4. Configuração do Frontend

```bash
# Em um novo terminal
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local
nano .env.local  # Edite conforme necessário

# Inicie o servidor de desenvolvimento
npm run dev
```

### 5. Verificação da Instalação

Abra seu navegador e acesse:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api

## 🚀 Configuração para Produção

### 1. Variáveis de Ambiente de Produção

```bash
# Arquivo .env para produção
NODE_ENV=production
DATABASE_URL="postgresql://user:password@host:5432/insidesolar"
JWT_SECRET="your-very-secure-jwt-secret-for-production"
REDIS_URL="redis://redis-host:6379"
CORS_ORIGIN="https://yourdomain.com"
```

### 2. Build de Produção

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

### 3. Deploy com Docker

```bash
# Use o docker-compose de produção
docker-compose -f docker-compose.prod.yml up -d

# Ou use os scripts
./scripts/build.sh production
./scripts/start.sh production
```

## 🔍 Solução de Problemas

### Problemas Comuns

#### 1. Erro de Conexão com Banco de Dados
```bash
# Verifique se o PostgreSQL está rodando
sudo systemctl status postgresql

# Teste a conexão
psql -h localhost -U insidesolar -d insidesolar

# Verifique as configurações no .env
echo $DATABASE_URL
```

#### 2. Porta já em Uso
```bash
# Verifique quais portas estão em uso
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001

# Mate processos se necessário
sudo kill -9 $(lsof -ti:3000)
sudo kill -9 $(lsof -ti:3001)
```

#### 3. Problemas com Dependências
```bash
# Limpe o cache do npm
npm cache clean --force

# Remova node_modules e reinstale
rm -rf node_modules package-lock.json
npm install

# Para Docker, rebuild sem cache
docker-compose build --no-cache
```

#### 4. Problemas de Permissão (Linux)
```bash
# Ajuste permissões dos scripts
chmod +x scripts/*.sh

# Para Docker, adicione seu usuário ao grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

### Logs e Debugging

#### Docker
```bash
# Logs de todos os serviços
docker-compose logs -f

# Logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Acesse o container para debug
docker-compose exec backend bash
docker-compose exec frontend bash
```

#### Manual
```bash
# Backend logs
cd backend
npm run start:dev  # Logs aparecem no terminal

# Frontend logs
cd frontend
npm run dev  # Logs aparecem no terminal
```

## 🧪 Executando Testes

### Testes Automatizados
```bash
# Todos os testes
./scripts/test.sh

# Backend apenas
cd backend
npm run test
npm run test:e2e

# Frontend apenas
cd frontend
npm run test
npm run lint
```

### Testes Manuais
1. **Registro de Usuário**: Acesse `/register` e crie uma conta
2. **Login**: Faça login com as credenciais criadas
3. **Busca de Empresas**: Use a busca na página principal
4. **Mapa**: Verifique se o mapa carrega corretamente
5. **Avaliações**: Teste o sistema de avaliações

## 📊 Monitoramento

### Health Checks
```bash
# Backend health
curl http://localhost:3001/api/health

# Database connection
curl http://localhost:3001/api/health/db

# Redis connection (se configurado)
curl http://localhost:3001/api/health/redis
```

### Métricas
```bash
# Docker stats
docker stats

# Logs de performance
docker-compose logs backend | grep "performance"
```

## 🔄 Atualizações

### Atualizando o Código
```bash
# Pare os serviços
docker-compose down

# Atualize o código
git pull origin main

# Rebuild e reinicie
./scripts/build.sh
./scripts/start.sh
```

### Migrações de Banco
```bash
# Execute novas migrações
docker-compose exec backend npx prisma migrate deploy

# Ou manualmente
cd backend
npx prisma migrate deploy
```

## 📞 Suporte

Se você encontrar problemas durante a instalação:

1. **Verifique os logs** para mensagens de erro específicas
2. **Consulte a documentação** da arquitetura para entender melhor o sistema
3. **Verifique as issues** no repositório GitHub
4. **Entre em contato** com a equipe de desenvolvimento

### Informações Úteis para Suporte
- Versão do sistema operacional
- Versões do Node.js, Docker, PostgreSQL
- Logs de erro completos
- Passos que levaram ao problema

Com este guia, você deve conseguir instalar e executar o InsideSolar com sucesso em qualquer ambiente!

