from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session

DATABASE_URL = "postgresql://postgres:Alkerem1!@localhost:5432/skincare_db"

engine = create_engine(DATABASE_URL, echo=True)  # ✅ Enables SQL debugging

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency for FastAPI Routes
def get_db():
    db = SessionLocal()
    try:
        yield db # Keeps the database connection open while in use and closes it automatically after
    finally:
        db.close()

