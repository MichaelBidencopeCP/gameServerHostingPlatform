from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select

from ..dependencies import FirebaseUserDep, SessionDep
from ..project_types.dashboard import NewService
from ..models import User, Service
from ..aws.ec2Services import create_instance, terminate_instance


router = APIRouter()

@router.get("/dashboard")
def dashboard(user: FirebaseUserDep):
    """
    Get uesrs services offline and online
    :param user: The authenticated Firebase user
    :return: Services and statuses 
    """
    # Get the services and their statuses
    # This is a placeholder for the actual implementation
    services = {
        "service1": "online",
        "service2": "offline",
        "service3": "online"
    }
    
    return {"services": services}

@router.get("/dashboard/service-info")
def service_info(session: SessionDep):
    """
    Get information about all services
    :param session: Database session
    :return: Service information
    """
    # This is a placeholder for the actual implementation
    services = [
        {
            "id": 1,
            "name": "MineCraft Server",
            "description": "Description of Service 1",
        },
        {
            "id": 2,
            "name": "Service 2",
            "description": "Description of Service 2",
        }
    ]
    
    return {"services": services}

@router.post("/dashboard/new-service")
def new_service(service:NewService, session: SessionDep, user: FirebaseUserDep):
    """
    Add a new service to the database
    :param service_id: The ID of the new service
    :param session: Database session
    :return: Confirmation message
    """
    # This is a placeholder for the actual implementation
    # In a real application, you would add the service to the database here

    userData = select(User).where(User.id == user['uid'])
    userData = session.exec(userData).first()
    if userData is None:
        raise HTTPException(status_code=404, detail="User not found")
    # Check if the user has cost tracking

    if userData.cost_tracking is False:
        pass
    # Get service information with the service_id
    service_info = select(Service).where(Service.id == service.serviceId)
    service_info = session.exec(service_info).first()
    # Get security group information

    if service_info is None:
        raise HTTPException(status_code=404, detail="Service not found")
    

    # Create the new service
    try:
        instance = create_instance(
            region_name=service.region,
            instance_type=service.instanceType,
            ami_id=service_info.ami_id,
            security_group_ids=service_info.security_group,
            user_id=user['uid'],

        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if instance is None:
        raise HTTPException(status_code=500, detail="Failed to create instance")
    
    # add service to the database
    try:
        new_service = Service(
            service_id=service.service_id,
            user_id=user['uid'],
            instance_id=instance.id,
            status="pending",
            cost_tracking=userData.cost_tracking
        )
        session.add(new_service)
        session.commit()
    except Exception as e:
        # If there is an error, delete the instance
        terminate_instance(instance.id)
        # and raise an HTTP exception
        raise HTTPException(status_code=500, detail=str(e))
    return {"message": "Service created successfully", "instance_id": instance.id}






