"""
User service - Business logic layer
"""
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.user import User, UserCreate, UserUpdate
from app.utils.logger import logger
from typing import List, Optional
from fastapi import HTTPException


class UserService:
    """Service class for user operations"""
    
    @staticmethod
    def create_user(db: Session, user_data: UserCreate) -> User:
        """
        Create a new user
        
        Args:
            db: Database session
            user_data: User creation data
            
        Returns:
            Created user
            
        Raises:
            HTTPException: If user with email already exists
        """
        try:
            db_user = User(
                name=user_data.name,
                email=user_data.email
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            
            logger.info(f"User created successfully: {user_data.email}")
            return db_user
            
        except IntegrityError:
            db.rollback()
            logger.error(f"User creation failed - email already exists: {user_data.email}")
            raise HTTPException(
                status_code=400,
                detail="User with this email already exists"
            )
        except Exception as e:
            db.rollback()
            logger.error(f"User creation failed: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to create user")
    
    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        """
        Get all users with pagination
        
        Args:
            db: Database session
            skip: Number of records to skip
            limit: Maximum number of records to return
            
        Returns:
            List of users
        """
        try:
            users = db.query(User).offset(skip).limit(limit).all()
            logger.info(f"Retrieved {len(users)} users")
            return users
        except Exception as e:
            logger.error(f"Failed to retrieve users: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to retrieve users")
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
        """
        Get user by ID
        
        Args:
            db: Database session
            user_id: User ID
            
        Returns:
            User if found, None otherwise
        """
        try:
            user = db.query(User).filter(User.id == user_id).first()
            if user:
                logger.info(f"User found: {user_id}")
            else:
                logger.warning(f"User not found: {user_id}")
            return user
        except Exception as e:
            logger.error(f"Failed to retrieve user {user_id}: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to retrieve user")
    
    @staticmethod
    def delete_user(db: Session, user_id: int) -> bool:
        """
        Delete user by ID
        
        Args:
            db: Database session
            user_id: User ID
            
        Returns:
            True if deleted, False if not found
        """
        try:
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                logger.warning(f"User not found for deletion: {user_id}")
                return False
            
            db.delete(user)
            db.commit()
            logger.info(f"User deleted successfully: {user_id}")
            return True
            
        except Exception as e:
            db.rollback()
            logger.error(f"Failed to delete user {user_id}: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to delete user")
