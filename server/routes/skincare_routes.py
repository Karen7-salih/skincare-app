
from fastapi import APIRouter, HTTPException, Depends
from services.skincare_service import get_skincare_from_db, add_skincare, get_skincare_by_category , deleted_skincare , update_skincare
from schemas.skincare import SkinCare
from sqlalchemy.orm import Session
from database import get_db
router = APIRouter()
from models.skincare_models import Skincare
from models.skin_type_models import skin_type
import json



@router.get("/")
def get_skincare(db: Session = Depends(get_db)):
    skincare_products = db.query(Skincare).filter(Skincare.deleted == False).all()
    skincare_list = []
   
    for product in skincare_products:
        #Ensuring skin_type is ALWAYS a list
        skin_types_names = (
            db.query(skin_type.name)
            .filter(skin_type.id.in_(product.skin_type) if isinstance(product.skin_type, list) else [product.skin_type])
            .all()
        )
        skin_types_names = [st[0] for st in skin_types_names] if skin_types_names else ["Unknown"]  


        skincare_list.append({
            "id": product.id,
            "product_name": product.product_name,
            "description": product.description,
            "price": product.price,
            "image_url": product.image_url,
            "link_to_purchase": product.link_to_purchase,
            "category": product.category,
            "skin_type": skin_types_names,
            "deleted": product.deleted,
        })
    return skincare_list







@router.post("/")
def add_entity(new_skincare: SkinCare, db: Session = Depends(get_db)):
    try:
        db_skincare = Skincare(
            product_name=new_skincare.product_name,
            description=new_skincare.description,
            price=new_skincare.price,
            image_url=new_skincare.image_url,
            link_to_purchase=new_skincare.link_to_purchase,
            skin_type=new_skincare.skin_type,
            category=new_skincare.category,
        )
        db.add(db_skincare)
        db.commit()
        db.refresh(db_skincare)
        return {"message": "Product added successfully", "product": db_skincare}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error adding product: {str(e)}")






@router.get("/product/{product_id}")
async def get_product_by_id_route(product_id: int, db: Session = Depends(get_db)):
    product = get_skincare_by_id(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product  # ✅ Return the product


@router.get("/category/{category_name}")
def get_skincare_by_category(category_name: str, db: Session = Depends(get_db)):
    skincare_products = db.query(Skincare).filter(
        Skincare.category == category_name,  # Ensure category filtering
        Skincare.deleted == False
    ).all()


    if not skincare_products:
        raise HTTPException(status_code=404, detail="No products found for this category")
   
    skincare_list = []
    for product in skincare_products:
        skin_types_names = db.query(skin_type.name).filter(skin_type.id.in_(product.skin_type)).all()
        skin_types_names = [st[0] for st in skin_types_names]
        skincare_list.append({
            "id": product.id,
            "product_name": product.product_name,
            "description": product.description,
            "price": product.price,
            "image_url": product.image_url,
            "link_to_purchase": product.link_to_purchase,
            "category": product.category,
            "skin_type": ", ".join(skin_types_names),
            "deleted": product.deleted,
        })
   
    return skincare_list








@router.put("/delete/{skincare_id}")
def soft_delete_skincare(skincare_id: int, db: Session = Depends(get_db)):
    skincare_product = db.query(Skincare).filter(Skincare.id == skincare_id, Skincare.deleted == False).first()
    if not skincare_product:
        raise HTTPException(status_code=404, detail="Product not found")
   
    skincare_product.deleted = True
    db.commit()
    return {"message": "Product deleted successfully"}



@router.put("/update/{skincare_id}")
def update_skincare_route(skincare_id: int, updated_data: SkinCare, db: Session = Depends(get_db)):
    updated_product = update_skincare(db, skincare_id, updated_data)

    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product updated successfully!", "product": updated_product}
