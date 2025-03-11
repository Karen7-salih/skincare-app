""" Defines database tables and their structure. """


from sqlalchemy import Column, Integer, String, Float, ARRAY
from database import Base

class skin_type(Base):
    __tablename__ = "skin_type"  
    id= Column(Integer, primary_key=True , index=True)
    name= Column(String, nullable=False)
    

