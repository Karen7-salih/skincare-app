from database import engine, Base
from models.skincare_models import Skincare
from models.skin_type_models import skin_type

Base.metadata.create_all(bind=engine)