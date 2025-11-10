from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def listar_pedidos():
    return {"message": "Aquí irían los pedidos 😉"}
