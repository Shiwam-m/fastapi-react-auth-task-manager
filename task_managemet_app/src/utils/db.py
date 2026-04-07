import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from src.utils.settings import settings

db_url = settings.DB_CONNECTION

print(f"--- DEBUG: DATABASE URL IS: {db_url[:15]}... ---")

if not db_url:
    db_url = "postgresql://postgres:password@localhost:5433/postgres"

if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

Base = declarative_base()

try:
    engine = create_engine(url=db_url)
    LocalSession = sessionmaker(bind=engine)
except Exception as e:
    print(f"FAILED TO CREATE ENGINE: {e}")
    raise e

def get_db():
    session = LocalSession()
    try:
        yield session
    finally:
        session.close()


        
# Base = declarative_base()
# engine = create_engine(url=settings.DB_CONNECTION)
# LocalSession = sessionmaker(bind=engine)
# Base.metadata.create_all(bind=engine)