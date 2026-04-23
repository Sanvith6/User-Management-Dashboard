"""
Health check and monitoring endpoints
"""
from fastapi import APIRouter, HTTPException
from app.utils.logger import logger
from app.config import get_settings
import time
import asyncio

router = APIRouter(tags=["Health"])
settings = get_settings()


@router.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring
    
    Returns:
        Health status
    """
    logger.info("Health check requested")
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION
    }


@router.get("/error")
async def simulate_error():
    """
    Simulate error for testing error logging and monitoring
    
    Raises:
        HTTPException: Simulated error
    """
    logger.error("Simulated error endpoint called - intentional failure")
    raise HTTPException(
        status_code=500,
        detail="This is a simulated error for testing monitoring systems"
    )


@router.get("/slow")
async def simulate_slow_request():
    """
    Simulate slow request for testing performance monitoring
    
    Returns:
        Response after delay
    """
    logger.warning("Slow endpoint called - simulating 3 second delay")
    await asyncio.sleep(3)
    logger.info("Slow endpoint completed")
    return {
        "message": "This request took 3 seconds to complete",
        "delay_seconds": 3
    }
