from fastapi import APIRouter
from ..dependencies import StaffUserDep


router = APIRouter(
    prefix='/staff',
    tags=['staff']
)

@router.get("/")
async def get_staff(user: StaffUserDep):
    """
    Get the staff members
    """
    return {
        "message": "Staff members"
    }
