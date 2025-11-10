import json
from fastapi import APIRouter
from db import get_db_connection

router = APIRouter()

# Cargar JSON con manejo de errores
productos = []
try:
    with open("productos.json", "r", encoding="utf-8") as f:
        productos = json.load(f)
    print(f" JSON cargado: {len(productos)} productos")
except Exception as e:
    print(f"Error cargando JSON: {e}")
    productos = []


@router.get("/")
def mostrar_productos():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.callproc("mostrarProductos")
    for result in cursor.stored_results():
        productos = result.fetchall()
    cursor.close()
    db.close()

    for producto in productos:
        if "imagen" in producto and producto["imagen"]:
            imagen_path = producto["imagen"]
            producto["imagen"] = imagen_path.split("/")[-1]
        # Normalizar el campo de ID - si ya tiene id_producto, mantenerlo
        # Si tiene campos específicos, crear id_producto
        if "id_producto" not in producto:
            if "id_hidrobomba" in producto:
                producto["id_producto"] = producto["id_hidrobomba"]
            elif "id_pintura" in producto:
                producto["id_producto"] = producto["id_pintura"]
            elif "id_pulidora" in producto:
                producto["id_producto"] = producto["id_pulidora"]
            elif "id_shampoo" in producto:
                producto["id_producto"] = producto["id_shampoo"]
                producto["id_shampoos"] = producto["id_shampoo"]  # Para compatibilidad
    return productos

@router.get("/hidrobombas")
def get_hidrobombas():
    hidrobombas = []
    try:
        # Intentar consultar BD primero
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.callproc("mostrarProductos")
        productos_db = []
        for result in cursor.stored_results():
            productos_db = result.fetchall()
        cursor.close()
        db.close()
        
        # Si la BD tiene datos, usarlos
        if productos_db:
            hidrobombas = [p for p in productos_db if p.get("id_categoria") == 1 or p.get("idCategoria") == 1]
            print(f"Hidrobombas desde BD: {len(hidrobombas)}")
    except Exception as e:
        print(f" Error consultando BD: {e}")
    
    # Si no hay datos de BD, usar JSON como fallback
    if not hidrobombas and productos:
        hidrobombas = [p for p in productos if p.get("id_categoria") == 1]
        print(f" Hidrobombas desde JSON: {len(hidrobombas)}")
    
    # Procesar imágenes y normalizar IDs
    for hidrobomba in hidrobombas:
        if "imagen" in hidrobomba and hidrobomba["imagen"]:
            imagen_path = hidrobomba["imagen"]
            hidrobomba["imagen"] = imagen_path.split("/")[-1]
        # Normalizar el campo de ID
        if "id_producto" not in hidrobomba:
            if "id_hidrobomba" in hidrobomba:
                hidrobomba["id_producto"] = hidrobomba["id_hidrobomba"]
            elif "idProducto" in hidrobomba:
                hidrobomba["id_producto"] = hidrobomba["idProducto"]
    
    return hidrobombas

@router.get("/pinturas")
def get_pinturas():
    pinturas = []
    try:
        # Intentar consultar BD primero
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.callproc("mostrarProductos")
        productos_db = []
        for result in cursor.stored_results():
            productos_db = result.fetchall()
        cursor.close()
        db.close()
        
        # Si la BD tiene datos, usarlos
        if productos_db:
            pinturas = [p for p in productos_db if p.get("id_categoria") == 2 or p.get("idCategoria") == 2]
            print(f"Pinturas desde BD: {len(pinturas)}")
    except Exception as e:
        print(f"Error consultando BD: {e}")
    
    # Si no hay datos de BD, usar JSON como fallback
    if not pinturas and productos:
        pinturas = [p for p in productos if p.get("id_categoria") == 2]
        print(f"Pinturas desde JSON: {len(pinturas)}")
    
    # Procesar imágenes y normalizar IDs
    for pintura in pinturas:
        if "imagen" in pintura and pintura["imagen"]:
            imagen_path = pintura["imagen"]
            pintura["imagen"] = imagen_path.split("/")[-1]
        # Normalizar el campo de ID
        if "id_producto" not in pintura:
            if "id_pintura" in pintura:
                pintura["id_producto"] = pintura["id_pintura"]
            elif "idProducto" in pintura:
                pintura["id_producto"] = pintura["idProducto"]
    return pinturas

@router.get("/pulidoras")
def get_pulidoras():
    pulidoras = []
    try:
        # Intentar consultar BD primero
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.callproc("mostrarProductos")
        productos_db = []
        for result in cursor.stored_results():
            productos_db = result.fetchall()
        cursor.close()
        db.close()
        
        # Si la BD tiene datos, usarlos
        if productos_db:
            pulidoras = [p for p in productos_db if p.get("id_categoria") == 3 or p.get("idCategoria") == 3]
            print(f"Pulidoras desde BD: {len(pulidoras)}")
    except Exception as e:
        print(f"Error consultando BD: {e}")
    
    # Si no hay datos de BD, usar JSON como fallback
    if not pulidoras and productos:
        pulidoras = [p for p in productos if p.get("id_categoria") == 3]
        print(f"Pulidoras desde JSON: {len(pulidoras)}")
    
    # Procesar imágenes y normalizar IDs
    for pulidora in pulidoras:
        if "imagen" in pulidora and pulidora["imagen"]:
            imagen_path = pulidora["imagen"]
            pulidora["imagen"] = imagen_path.split("/")[-1]
        # Normalizar el campo de ID
        if "id_producto" not in pulidora:
            if "id_pulidora" in pulidora:
                pulidora["id_producto"] = pulidora["id_pulidora"]
            elif "idProducto" in pulidora:
                pulidora["id_producto"] = pulidora["idProducto"]
    return pulidoras

@router.get("/shampoos")
def get_shampoos():
    shampoos = []
    try:
        # Intentar consultar BD primero
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.callproc("mostrarProductos")
        productos_db = []
        for result in cursor.stored_results():
            productos_db = result.fetchall()
        cursor.close()
        db.close()
        
        # Si la BD tiene datos, usarlos
        if productos_db:
            shampoos = [p for p in productos_db if p.get("id_categoria") == 4 or p.get("idCategoria") == 4]
            print(f" Shampoos desde BD: {len(shampoos)}")
    except Exception as e:
        print(f" Error consultando BD: {e}")
    
    # Si no hay datos de BD, usar JSON como fallback
    if not shampoos and productos:
        shampoos = [p for p in productos if p.get("id_categoria") == 4]
        print(f" Shampoos desde JSON: {len(shampoos)}")
    
    # Procesar imágenes y normalizar IDs
    for shampoo in shampoos:
        if "imagen" in shampoo and shampoo["imagen"]:
            imagen_path = shampoo["imagen"]
            shampoo["imagen"] = imagen_path.split("/")[-1]
        # Normalizar el campo de ID para que sea consistente
        if "id_producto" not in shampoo:
            if "id_shampoo" in shampoo:
                shampoo["id_producto"] = shampoo["id_shampoo"]
                shampoo["id_shampoos"] = shampoo["id_shampoo"]  # Para compatibilidad con el frontend
            elif "idProducto" in shampoo:
                shampoo["id_producto"] = shampoo["idProducto"]
                shampoo["id_shampoos"] = shampoo["idProducto"]
        else:
            # Si viene de la BD, usar id_producto directamente
            shampoo["id_shampoos"] = shampoo.get("id_producto")
    return shampoos

@router.post("/registrar")
def registrar_producto(data: dict):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.callproc("registrarProductos", [
        data["nombre"], data["descripcion"], data["precio"],
        data["stock"], data["imagen"], data["rating"], data["id_categoria"]
    ])
    db.commit()
    cursor.close()
    db.close()
    return {"message": "Producto registrado correctamente"}



@router.delete("/eliminar/{id_producto}")
def eliminar_producto(id_producto: int):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.callproc("eliminarProducto", [id_producto])
    db.commit()
    cursor.close()
    db.close()
    return {"message": "Producto eliminado correctamente"}
