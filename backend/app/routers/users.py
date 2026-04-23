"""
User management endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.user import UserCreate, UserResponse
from app.services.user_service import UserService
from app.utils.logger import logger

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new user
    
    Args:
        user: User creation data
        db: Database session
        
    Returns:
        Created user
    """
    logger.info(f"Creating user: {user.email}")
    return UserService.create_user(db, user)


@router.get("/", response_model=List[UserResponse])
async def get_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get all users with pagination
    
    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session
        
    Returns:
        List of users
    """
    logger.info(f"Fetching users (skip={skip}, limit={limit})")
    return UserService.get_users(db, skip, limit)


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Get user by ID
    
    Args:
        user_id: User ID
        db: Database session
        
    Returns:
        User details
        
    Raises:
        HTTPException: If user not found
    """
    logger.info(f"Fetching user: {user_id}")
    user = UserService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete user by ID
    
    Args:
        user_id: User ID
        db: Database session
        
    Raises:
        HTTPException: If user not found
    """
    logger.info(f"Deleting user: {user_id}")
    deleted = UserService.delete_user(db, user_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )
    return None
