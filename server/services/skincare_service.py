from schemas.skincare import SkinCare
from sqlalchemy.orm import Session
from models.skincare_models import Skincare
from models.skin_type_models import skin_type 
from sqlalchemy import DateTime
from sqlalchemy.sql import func  


def get_skincare_from_db(db: Session):
    try:
        skincare_products = db.query(Skincare).filter(Skincare.deleted == False).all()

        if not skincare_products:
            print("No skincare products found in the database.")
            return []

        # Convert skin_type IDs (stored as an array) into actual names
        skincare_list = []
        for product in skincare_products:
            skin_types_names = db.query(skin_type.name).filter(skin_type.id.in_(product.skin_type)).all()
            skin_types_names = [st[0] for st in skin_types_names]  # Extract names from tuples
            
            skincare_list.append({
                "id": product.id,
                "product_name": product.product_name,
                "description": product.description,
                "price": product.price,
                "image_url": product.image_url,
                "link_to_purchase": product.link_to_purchase,
                "category": product.category,
                "skin_type": ", ".join(skin_types_names),  # Convert to string
                "deleted": product.deleted,
            })

        return skincare_list
    except Exception as e:
        print(f"ERROR in get_skincare_from_db: {e}")
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")


def deleted_skincare(db: Session, skincare_id: int):
    skincare_product = db.query(Skincare).filter(Skincare.id == skincare_id, Skincare.deleted == False).first()
    if not skincare_product:
        return None  
    skincare_product.deleted = True
    skincare_product.deleted_on = func.now()
    db.commit()
    db.refresh(skincare_product)
    return skincare_product




def add_skincare(db: Session, skincaredata):
    db_skincare = Skincare(
        product_name=skincaredata.product_name,
        description=skincaredata.description,
        price=skincaredata.price,
        image_url=skincaredata.image_url,
        link_to_purchase=skincaredata.link_to_purchase,
        skin_type=skincaredata.skin_type,
        category=skincaredata.category
    )
    db.add(db_skincare)
    db.commit()
    db.refresh(db_skincare)
    return db_skincare


def get_skincare_by_category(db: Session, category_name: str):
    skincare_products = db.query(Skincare).filter(
        Skincare.category == category_name,  # Ensure exact category match
        Skincare.deleted == False
    ).all()

    if not skincare_products:
        return []

    for product in skincare_products:
        if isinstance(product.skin_type, list):  
            product.skin_type = [skin_type.get(st, "Unknown") for st in product.skin_type]  

    return skincare_products



def permanent_delete_skincare(db: Session, skincare_id: int):
    skincare_product = db.query(Skincare).filter(Skincare.id == skincare_id).first()

    if not skincare_product:
        return None  

    db.delete(skincare_product)
    db.commit()
    return True  
