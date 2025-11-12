from fastapi import APIRouter, HTTPException, Body
from db import get_db_connection
import mysql.connector
import logging

router = APIRouter()


@router.post("/agregar")
def agregar_al_carrito(data: dict):
    idUsuario = data.get("idUsuario")
    id_producto = data.get("id_producto")
    cantidad = data.get("cantidad", 1)

    if not idUsuario or not id_producto:
        raise HTTPException(status_code=400, detail="Faltan idUsuario o id_producto")

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # validar que el producto existe
        cursor.execute("SELECT 1 FROM productos WHERE id_producto = %s", (id_producto,))
        if cursor.fetchone() is None:
            raise HTTPException(status_code=400, detail=f"Producto {id_producto} no encontrado")

        # (opcional) validar que el usuario existe
        cursor.execute("SELECT 1 FROM usuario WHERE idUsuario = %s", (idUsuario,))
        if cursor.fetchone() is None:
            raise HTTPException(status_code=400, detail=f"Usuario {idUsuario} no encontrado")

        cursor.callproc('agregarAlCarrito', [idUsuario, id_producto, cantidad])
        conn.commit()
        return {"message": "Producto agregado al carrito"}
    except mysql.connector.errors.IntegrityError as e:
        logging.exception("Error en agregar_al_carrito - IntegrityError")
        raise HTTPException(status_code=400, detail="Error de integridad en la base de datos")
    except Exception as e:
        logging.exception("Error en agregar_al_carrito")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


@router.get("/ver/{idUsuario}")
def ver_carrito(idUsuario: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        # Asegúrate que el SP 'verCarrito' existe y recibe (idUsuario)
        cursor.callproc('verCarrito', [idUsuario])
        resultados = []
        # recoger resultados devueltos por el SP
        for res in cursor.stored_results():
            resultados = res.fetchall()
        return resultados or []
    except Exception as e:
        logging.exception("Error en ver_carrito")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


@router.delete("/eliminar")
def eliminar_producto_carrito(data: dict = Body(...)):
    """
    Recibe: {"idUsuario": 1, "id_producto": 2}
    """
    idUsuario = data.get("idUsuario")
    id_producto = data.get("id_producto")

    print(f"DEBUG DELETE - idUsuario: {idUsuario}, id_producto: {id_producto}")
    print(f"DEBUG DELETE - data completa: {data}")

    if not idUsuario or not id_producto:
        raise HTTPException(
            status_code=400, 
            detail=f"Faltan parámetros. Recibido: {data}"
        )

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.callproc('eliminarProductoCarrito', [idUsuario, id_producto])
        conn.commit()
        return {"message": "Producto eliminado del carrito"}
    except Exception as e:
        logging.exception("Error en eliminar_producto_carrito")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


@router.post("/finalizar")
def finalizar_carrito(data: dict):
    idUsuario = data.get("idUsuario")
    if not idUsuario:
        raise HTTPException(status_code=400, detail="Falta idUsuario")

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.callproc('finalizarCarrito', [idUsuario])
        conn.commit()
        return {"message": "Carrito finalizado"}
    except mysql.connector.errors.DatabaseError as e:
        if "stock" in str(e).lower():
            raise HTTPException(status_code=400, detail="Stock insuficiente en algunos productos")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logging.exception("Error en finalizar_carrito")
        raise HTTPException(status_code=500, detail="Error al finalizar carrito")
    finally:
        cursor.close()
        conn.close()
