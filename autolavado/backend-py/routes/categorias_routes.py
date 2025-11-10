from fastapi import APIRouter
from db import get_db_connection

router = APIRouter()

@router.get("/")
def listar_categorias():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.callproc("llenarCategoria")
    for result in cursor.stored_results():
        categorias = result.fetchall()
    cursor.close()
    db.close()
    return categorias
