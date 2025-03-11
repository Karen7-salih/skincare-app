""" Defines database tables and their structure. """


from sqlalchemy import Column, Integer, String, Float, ARRAY , Boolean
from database import Base
from sqlalchemy import DateTime

class Skincare(Base):
    __tablename__ = "skincare"  

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, nullable=False)  
    description = Column(String, nullable=False) 
    price = Column(Float, nullable=False) 
    image_url = Column(String, nullable=True)  
    link_to_purchase = Column(String, nullable=True) 
    skin_type = Column(ARRAY(Integer), nullable=False)  
    category = Column(String, nullable=False) 
    deleted = Column(Boolean, default=False)  # Soft delete flag







