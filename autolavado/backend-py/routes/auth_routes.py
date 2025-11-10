from fastapi import APIRouter
from db import get_db_connection

router = APIRouter()

@router.post("/login")
def login(data: dict):
    usuario = data.get("usuario")
    password = data.get("password")

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.callproc("login", [usuario, password])
    for result in cursor.stored_results():
        res = result.fetchall()

    cursor.close()
    db.close()
    return res[0] if res else {"idUsuario": 0, "idPerfil": 0}
