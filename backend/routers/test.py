from fastapi import APIRouter
from sqlmodel import select

from ..dependencies import SessionDep
from ..models import Test


router = APIRouter(
    prefix="/database",
    tags=["database"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def home() -> dict:
    """
        Home route
    """
    return {"message": "Hello World"}

@router.get("/create")
async def create_db(session: SessionDep):
    """
        Create a database
    """
    test = Test(name="test")
    session.add(test)
    session.commit()
    return {"message": "Database created"}

@router.get("/read")
async def read_db(session: SessionDep):
    """
        Read from the database
    """
    return session.exec(select(Test)).all()


