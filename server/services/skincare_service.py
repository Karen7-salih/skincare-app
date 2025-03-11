""" Processes data and business logic.meaning it actually does routes work """


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
    skincare_product.deleted_on = func.now() #Store the deletion timestamp
    db.commit()
    db.refresh(skincare_product) #Update the object with the latest database state
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
        Skincare.category == category_name,  
        Skincare.deleted == False
    ).all()

    if not skincare_products:
        return []

    for product in skincare_products:
        skin_types_names = db.query(skin_type.name).filter(
            skin_type.id.in_(product.skin_type) if isinstance(product.skin_type, list) else [product.skin_type]
        ).all()

        product.skin_type = [st[0] for st in skin_types_names] if skin_types_names else ["Unknown"]

    return skincare_products  # Return only after processing all products


def update_skincare(db: Session, skincare_id: int, updated_data: SkinCare):
    try:
        skincare_product = db.query(Skincare).filter(Skincare.id == skincare_id, Skincare.deleted == False).first()

        if not skincare_product:
            return None  # This prevents errors in the route

        # Only update non-empty fields
        if updated_data.product_name:
            skincare_product.product_name = updated_data.product_name
        if updated_data.description:
            skincare_product.description = updated_data.description
        if updated_data.price:
            skincare_product.price = updated_data.price
        if updated_data.image_url:
            skincare_product.image_url = updated_data.image_url
        if updated_data.link_to_purchase:
            skincare_product.link_to_purchase = updated_data.link_to_purchase
        if updated_data.category:
            skincare_product.category = updated_data.category
        if updated_data.skin_type:
            skincare_product.skin_type = updated_data.skin_type  # Ensure correct format

        db.commit()
        db.refresh(skincare_product)
        return skincare_product  #  Return the updated product

    except Exception as e:
        print(f"Server error during update: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")



def get_skincare_by_id(db: Session, skincare_id: int):
    product = db.query(Skincare).filter(Skincare.id == skincare_id, Skincare.deleted == False).first()

    if not product:
        return None  # This prevents errors in the route

    # Convert skin_type IDs to actual names
    skin_types_names = db.query(skin_type.name).filter(
        skin_type.id.in_(product.skin_type) if isinstance(product.skin_type, list) else [product.skin_type]
    ).all()
    skin_types_names = [st[0] for st in skin_types_names] if skin_types_names else ["Unknown"]

    return {
        "id": product.id,
        "product_name": product.product_name,
        "description": product.description,
        "price": product.price,
        "image_url": product.image_url,
        "link_to_purchase": product.link_to_purchase,
        "category": product.category,
        "skin_type": skin_types_names,
        "deleted": product.deleted,
    }







