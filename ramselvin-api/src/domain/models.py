from typing import Optional
from pydantic import BaseModel

class CasaApuestas(BaseModel):
    id: Optional[int]
    nombre: str
    pais_oferta: str
    ingreso_adquisicion: float
