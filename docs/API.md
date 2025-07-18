# Documentação da API - InsideSolar

Esta documentação descreve todos os endpoints disponíveis na API REST do InsideSolar.

## 🔗 URL Base

- **Desenvolvimento**: `http://localhost:3001/api`
- **Produção**: `https://api.insidesolar.com.br/api`

## 🔐 Autenticação

A API utiliza autenticação JWT (JSON Web Tokens). Para acessar endpoints protegidos, inclua o token no header:

```http
Authorization: Bearer <seu-jwt-token>
```

### Obtenção do Token

Faça login através do endpoint `/auth/login` para obter o token de acesso.

## 📚 Endpoints

### 🔑 Autenticação

#### POST /auth/register
Registra um novo usuário no sistema.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "role": "CONSUMER" // CONSUMER, COMPANY, ADMIN
}
```

**Response (201):**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "CONSUMER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Possíveis Erros:**
- `400`: Dados inválidos
- `409`: Email já cadastrado

---

#### POST /auth/login
Autentica um usuário e retorna o token JWT.

**Request Body:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "CONSUMER"
  }
}
```

**Possíveis Erros:**
- `401`: Credenciais inválidas
- `400`: Dados inválidos

---

#### GET /auth/profile
Retorna o perfil do usuário autenticado.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "CONSUMER",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Possíveis Erros:**
- `401`: Token inválido ou expirado

### 🏢 Empresas

#### GET /companies
Lista todas as empresas com filtros opcionais.

**Query Parameters:**
- `page` (number): Página (padrão: 1)
- `limit` (number): Itens por página (padrão: 10, máx: 50)
- `search` (string): Busca por nome ou descrição
- `location` (string): Filtro por localização
- `verified` (boolean): Apenas empresas verificadas
- `services` (string[]): Filtro por serviços oferecidos

**Exemplo:**
```http
GET /companies?page=1&limit=10&search=solar&verified=true
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "SolarTech Brasil",
      "description": "Especializada em sistemas fotovoltaicos...",
      "location": "São Paulo, SP",
      "phone": "(11) 99999-9999",
      "email": "contato@solartech.com.br",
      "website": "www.solartech.com.br",
      "verified": true,
      "rating": 4.8,
      "reviewCount": 234,
      "projectCount": 450,
      "services": ["Residencial", "Comercial", "Industrial"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

#### GET /companies/:id
Retorna detalhes de uma empresa específica.

**Response (200):**
```json
{
  "id": "uuid",
  "name": "SolarTech Brasil",
  "description": "Especializada em sistemas fotovoltaicos residenciais e comerciais...",
  "location": "São Paulo, SP",
  "coordinates": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "phone": "(11) 99999-9999",
  "email": "contato@solartech.com.br",
  "website": "www.solartech.com.br",
  "verified": true,
  "rating": 4.8,
  "reviewCount": 234,
  "projectCount": 450,
  "services": ["Residencial", "Comercial", "Industrial"],
  "certifications": ["INMETRO", "ISO 9001:2015"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Possíveis Erros:**
- `404`: Empresa não encontrada

---

#### POST /companies
Cria uma nova empresa (requer autenticação).

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Nova Empresa Solar",
  "description": "Descrição da empresa...",
  "location": "Rio de Janeiro, RJ",
  "coordinates": {
    "latitude": -22.9068,
    "longitude": -43.1729
  },
  "phone": "(21) 88888-8888",
  "email": "contato@novaempresa.com.br",
  "website": "www.novaempresa.com.br",
  "services": ["Residencial", "Comercial"]
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "Nova Empresa Solar",
  "description": "Descrição da empresa...",
  "location": "Rio de Janeiro, RJ",
  "verified": false,
  "rating": 0,
  "reviewCount": 0,
  "projectCount": 0,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Possíveis Erros:**
- `401`: Não autenticado
- `403`: Sem permissão
- `400`: Dados inválidos

---

#### PUT /companies/:id
Atualiza uma empresa existente (apenas o proprietário ou admin).

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (campos opcionais)
```json
{
  "name": "Nome Atualizado",
  "description": "Nova descrição...",
  "phone": "(21) 99999-9999"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Nome Atualizado",
  "description": "Nova descrição...",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### ⭐ Avaliações

#### GET /reviews
Lista avaliações com filtros opcionais.

**Query Parameters:**
- `page` (number): Página (padrão: 1)
- `limit` (number): Itens por página (padrão: 10)
- `companyId` (string): Filtro por empresa
- `rating` (number): Filtro por nota (1-5)

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "rating": 5,
      "title": "Excelente serviço!",
      "content": "A instalação foi perfeita e o atendimento excepcional.",
      "companyId": "uuid",
      "company": {
        "id": "uuid",
        "name": "SolarTech Brasil"
      },
      "user": {
        "id": "uuid",
        "name": "João Silva"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

---

#### GET /companies/:id/reviews
Lista avaliações de uma empresa específica.

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "rating": 5,
      "title": "Excelente serviço!",
      "content": "A instalação foi perfeita...",
      "user": {
        "id": "uuid",
        "name": "João Silva"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "stats": {
    "averageRating": 4.8,
    "totalReviews": 234,
    "ratingDistribution": {
      "5": 180,
      "4": 40,
      "3": 10,
      "2": 3,
      "1": 1
    }
  }
}
```

---

#### POST /reviews
Cria uma nova avaliação (requer autenticação).

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "companyId": "uuid",
  "rating": 5,
  "title": "Excelente serviço!",
  "content": "A instalação foi perfeita e o atendimento excepcional. Recomendo!"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "rating": 5,
  "title": "Excelente serviço!",
  "content": "A instalação foi perfeita...",
  "companyId": "uuid",
  "userId": "uuid",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Possíveis Erros:**
- `401`: Não autenticado
- `400`: Dados inválidos
- `409`: Usuário já avaliou esta empresa

### 👤 Usuários

#### GET /users/profile
Retorna o perfil completo do usuário autenticado.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "CONSUMER",
  "profile": {
    "phone": "(11) 99999-9999",
    "location": "São Paulo, SP",
    "preferences": {
      "notifications": true,
      "newsletter": false
    }
  },
  "stats": {
    "reviewsCount": 5,
    "quotesRequested": 12
  },
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

#### PUT /users/profile
Atualiza o perfil do usuário autenticado.

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "João Silva Santos",
  "phone": "(11) 88888-8888",
  "location": "São Paulo, SP",
  "preferences": {
    "notifications": false,
    "newsletter": true
  }
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "João Silva Santos",
  "email": "joao@email.com",
  "profile": {
    "phone": "(11) 88888-8888",
    "location": "São Paulo, SP",
    "preferences": {
      "notifications": false,
      "newsletter": true
    }
  },
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 💬 Orçamentos

#### POST /quotes
Solicita um orçamento para uma empresa.

**Request Body:**
```json
{
  "companyId": "uuid",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "message": "Gostaria de um orçamento para instalação residencial de 5kWp.",
  "projectType": "Residencial",
  "estimatedPower": "5kWp",
  "location": "São Paulo, SP"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "message": "Gostaria de um orçamento...",
  "companyId": "uuid",
  "status": "PENDING",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

#### GET /quotes
Lista orçamentos do usuário autenticado.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "company": {
        "id": "uuid",
        "name": "SolarTech Brasil"
      },
      "projectType": "Residencial",
      "estimatedPower": "5kWp",
      "status": "PENDING",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## 🔍 Busca e Filtros

### Busca Geográfica

Para buscar empresas próximas a uma localização:

```http
GET /companies/nearby?lat=-23.5505&lng=-46.6333&radius=50
```

**Query Parameters:**
- `lat` (number): Latitude
- `lng` (number): Longitude  
- `radius` (number): Raio em quilômetros (padrão: 25)

### Busca Textual

Para busca textual avançada:

```http
GET /companies/search?q=energia solar residencial&location=São Paulo
```

## 📊 Códigos de Status HTTP

- `200` - OK: Requisição bem-sucedida
- `201` - Created: Recurso criado com sucesso
- `400` - Bad Request: Dados inválidos
- `401` - Unauthorized: Não autenticado
- `403` - Forbidden: Sem permissão
- `404` - Not Found: Recurso não encontrado
- `409` - Conflict: Conflito (ex: email já existe)
- `422` - Unprocessable Entity: Dados válidos mas não processáveis
- `500` - Internal Server Error: Erro interno do servidor

## 🔄 Rate Limiting

A API implementa rate limiting para prevenir abuso:

- **Usuários não autenticados**: 100 requisições por hora
- **Usuários autenticados**: 1000 requisições por hora
- **Endpoints de busca**: 500 requisições por hora

Headers de resposta incluem informações sobre o limite:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## 📝 Exemplos de Uso

### JavaScript/TypeScript

```javascript
// Configuração base
const API_BASE = 'http://localhost:3001/api';
let authToken = null;

// Função para fazer login
async function login(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  authToken = data.access_token;
  return data;
}

// Função para buscar empresas
async function getCompanies(filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE}/companies?${params}`);
  return response.json();
}

// Função para criar avaliação
async function createReview(reviewData) {
  const response = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(reviewData),
  });
  
  return response.json();
}
```

### cURL

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","password":"senha123"}'

# Buscar empresas
curl -X GET "http://localhost:3001/api/companies?search=solar&verified=true"

# Criar avaliação (com token)
curl -X POST http://localhost:3001/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"companyId":"uuid","rating":5,"title":"Ótimo!","content":"Excelente serviço"}'
```

## 🐛 Tratamento de Erros

Todas as respostas de erro seguem o formato padrão:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "Email deve ser um endereço válido"
    }
  ]
}
```

Para erros de validação, o campo `details` contém informações específicas sobre cada campo inválido.

Esta documentação cobre todos os endpoints principais da API InsideSolar. Para funcionalidades mais avançadas ou endpoints específicos, consulte a documentação interativa disponível em `/api/docs` quando a aplicação estiver rodando.

