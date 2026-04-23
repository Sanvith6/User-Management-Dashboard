# 👥 User Management Dashboard

A production-ready full-stack application for managing users, built with modern technologies and designed for AWS deployment.

## 🏗️ Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  React Frontend │─────▶│  FastAPI Backend│─────▶│   PostgreSQL    │
│   (Port 3000)   │      │   (Port 8000)   │      │   (Port 5432)   │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Axios** - HTTP client with interceptors
- **CSS3** - Custom styling with gradients

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation
- **Python JSON Logger** - Structured logging for CloudWatch

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Frontend web server

## 📋 Features

- ✅ Create, Read, Delete users
- ✅ Real-time health monitoring
- ✅ Structured JSON logging (CloudWatch-ready)
- ✅ Error handling and validation
- ✅ Responsive UI design
- ✅ API documentation (FastAPI auto-docs)
- ✅ Database connection pooling
- ✅ Production-ready Docker setup

## 🛠️ Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose
- Git

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd user-management-app
```

### 2. Start the application
```bash
docker-compose up --build
```

### 3. Access the application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/api/v1/health

## 📁 Project Structure

```
user-management-app/
├── backend/
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── routers/         # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utilities (logging)
│   │   ├── config.py        # Configuration
│   │   ├── database.py      # DB connection
│   │   └── main.py          # FastAPI app
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API client
│   │   ├── App.jsx
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## 🔌 API Endpoints

### Health & Monitoring
- `GET /api/v1/health` - Health check
- `GET /api/v1/error` - Simulate error (testing)
- `GET /api/v1/slow` - Simulate slow request (testing)

### User Management
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/{id}` - Get user by ID
- `POST /api/v1/users/` - Create new user
- `DELETE /api/v1/users/{id}` - Delete user

## 🧪 Testing Endpoints

### Using curl
```bash
# Health check
curl http://localhost:8000/api/v1/health

# Create user
curl -X POST http://localhost:8000/api/v1/users/ \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Get all users
curl http://localhost:8000/api/v1/users

# Delete user
curl -X DELETE http://localhost:8000/api/v1/users/1
```

## 📊 Monitoring & Logging

The application uses structured JSON logging compatible with AWS CloudWatch:

```json
{
  "asctime": "2024-01-01T12:00:00",
  "name": "user_management_api",
  "levelname": "INFO",
  "message": "User created successfully",
  "pathname": "/app/services/user_service.py",
  "lineno": 45
}
```

## 🔧 Development

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Development
```bash
cd frontend
npm install
npm start
```

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build backend
docker-compose up backend
```

## ☁️ AWS Deployment Readiness

This application is designed for AWS deployment with:

- **VPC**: Can be deployed in private subnets
- **ECS/EKS**: Docker containers ready for orchestration
- **RDS**: PostgreSQL compatible
- **CloudWatch**: Structured logging ready
- **ALB**: Health check endpoints configured
- **Auto Scaling**: Stateless design supports horizontal scaling

## 🔐 Security Features

- Non-root Docker users
- Environment variable configuration
- CORS middleware
- Input validation with Pydantic
- SQL injection protection (SQLAlchemy ORM)
- Health checks for all services

## 📈 Performance

- Database connection pooling
- Request timing middleware
- Optimized Docker images (multi-stage builds)
- Nginx for static file serving

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License

## 👥 Authors

Built with ❤️ using the AI Multi-Agent Development System

---

**Ready for production deployment to AWS! 🚀**
