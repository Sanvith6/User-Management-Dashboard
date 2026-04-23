"""
User model for database
"""
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


# SQLAlchemy Model
class User(Base):
    """User database model"""
    
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


# Pydantic Schemas
class UserCreate(BaseModel):
    """Schema for creating a user"""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr


class UserResponse(BaseModel):
    """Schema for user response"""
    id: int
    name: str
    email: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    """Schema for updating a user"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
