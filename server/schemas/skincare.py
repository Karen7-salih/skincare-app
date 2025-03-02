from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import datetime

class SkinCare(BaseModel):
    id: Optional[int] = None
    product_name: str
    skin_type: Union[List[int], str]  
    description: str  
    price: float
    link_to_purchase: Optional[str] = None 
    image_url: Optional[str] = None 
    category: str
    deleted: Optional[bool] = False




