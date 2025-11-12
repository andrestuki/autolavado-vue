from fastapi import APIRouter, HTTPException
from db import get_db_connection
import mysql.connector

router = APIRouter()

# 🔹 LOGIN
@router.post("/login")
def login_user(datos: dict):
    try:
        usuario = datos.get("usuario")
        password = datos.get("password")

        print(f"📩 Usuario: {usuario}, Password: {password}")

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        print(f"🔍 Datos recibidos desde frontend -> usuario: {usuario}, password: {password}")
        cursor.callproc("login", (usuario, password))

        data = []
        for result in cursor.stored_results():
            data = result.fetchall()

        print(f"📦 Resultado del procedimiento: {data}")

        if data and data[0].get("idUsuario") != 0:
            return {
                "success": True,
                "idUsuario": data[0]["idUsuario"],
                "idPerfil": data[0]["idPerfil"],
                "mensaje": "Inicio de sesión exitoso"
            }
        else:
            raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")

    except mysql.connector.Error as err:
        print(f"❌ Error MySQL: {err}")
        raise HTTPException(status_code=500, detail=f"Error en la base de datos: {err}")

    finally:
        cursor.close()
        db.close()

# 🔹 REGISTRO DE USUARIO
@router.post("/registrar")
def registrar_usuario(datos: dict):
    try:
        usuario = datos.get("usuario")
        password = datos.get("password")
        gmail = datos.get("gmail")
        idPerfil = datos.get("idPerfil", 2)  # por defecto 2 (usuario común)

        if not usuario or not password or not gmail:
            raise HTTPException(status_code=400, detail="Faltan datos obligatorios")

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        cursor.callproc("registrarUsuario", (usuario, password, gmail, idPerfil))

        data = []
        for result in cursor.stored_results():
            data = result.fetchall()

        if data:
            return {
                "success": True,
                "idUsuario": data[0]["idUsuario"],
                "mensaje": data[0]["mensaje"]
            }

        raise HTTPException(status_code=500, detail="Error al registrar usuario")

    except mysql.connector.Error as err:
        # Captura el error lanzado por SIGNAL en el procedimiento
        if err.errno == 1644:  # SQLSTATE '45000'
            raise HTTPException(status_code=400, detail=str(err.msg))
        raise HTTPException(status_code=500, detail=f"Error en la base de datos: {err}")
    finally:
        cursor.close()
        db.close()
