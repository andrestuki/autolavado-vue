from fastapi import APIRouter, HTTPException
from db import get_db_connection

router = APIRouter()

@router.get("/")
def ver_pedidos():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.callproc("verPedidos")
        for result in cursor.stored_results():
            pedidos = result.fetchall()
        cursor.close()
        db.close()
        return pedidos
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.put("/estado")
def actualizar_estado(data: dict):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.callproc("actualizarEstadoPedido", [
            data["id_pedido"],
            data["nuevo_estado"]
        ])
        db.commit()
        cursor.close()
        db.close()
        return {"message": "Estado del pedido actualizado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
