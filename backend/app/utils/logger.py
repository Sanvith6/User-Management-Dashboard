"""
Structured logging configuration for CloudWatch compatibility
"""
import logging
import sys
from pythonjsonlogger import jsonlogger


def setup_logger(name: str = "user_management_api") -> logging.Logger:
    """
    Setup structured JSON logger for production monitoring
    
    Args:
        name: Logger name
        
    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    # Remove existing handlers
    logger.handlers = []
    
    # Create console handler with JSON formatter
    handler = logging.StreamHandler(sys.stdout)
    
    # JSON formatter for structured logging (CloudWatch compatible)
    formatter = jsonlogger.JsonFormatter(
        '%(asctime)s %(name)s %(levelname)s %(message)s %(pathname)s %(lineno)d',
        timestamp=True
    )
    
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    
    return logger


# Global logger instance
logger = setup_logger()
