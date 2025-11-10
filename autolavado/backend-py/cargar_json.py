import json
from db import get_db_connection

# Abre el archivo JSON
with open("productos.json", "r", encoding="utf-8") as file:
    productos = json.load(file)

db = get_db_connection()
cursor = db.cursor()

for producto in productos:
    # Ajusta los nombres de las claves según tu JSON exacto
    cursor.callproc("registrarProductos", [
        producto["nombre"],
        producto.get("marca", ""),  # si tu SP lo acepta
        producto["precio"],
        producto["cantidad"],
        producto["imagen"],
        producto["raiting"],
        producto["id_categoria"]
    ])

db.commit()
cursor.close()
db.close()

print("✅ Datos cargados correctamente en la base de datos")
