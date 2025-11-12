import json
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import  productos_routes, categorias_routes, pedidos_routes, carrito_routes,login_routes
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
router = APIRouter()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(productos_routes.router, prefix="/api/productos", tags=["Productos"])
app.include_router(categorias_routes.router, prefix="/api/categorias", tags=["Categorias"])
app.include_router(pedidos_routes.router, prefix="/api/pedidos", tags=["Pedidos"])
app.include_router(carrito_routes.router, prefix="/api/carrito", tags=["Carrito"])
app.include_router(carrito_routes.router, prefix="/api/cart", tags=["Carrito"])
app.include_router(login_routes.router, prefix="/api/login", tags=["Login"])

with open("productos.json", "r", encoding="utf-8") as f:
    productos = json.load(f)

@app.get("/")
def root():
    return {"message": "🚗 API del Autolavado funcionando correctamente"}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT")), reload=True)
