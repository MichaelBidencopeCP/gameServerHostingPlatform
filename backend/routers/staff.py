from fastapi import APIRouter
from ..dependencies import StaffUserDep
from ..models import ServiceType


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

@router.post("/new-service")
async def new_service(serviceType: ServiceType):
    #, user: StaffUserDep):
    """
    Add a new service
    """
    return {
        "message": serviceType
    }