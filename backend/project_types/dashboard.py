from pydantic import BaseModel

# Dashboard Pydantic Types for requests and responses

class Dashboard(BaseModel):
    """
        Pydantic model for dashboard
    """
    name: str
    description: str
    type: str
    data: dict

class ServiceInfo(BaseModel):
    """
        Pydantic model for service information
    """
    id: int
    name: str
    description: str
    status: str

class NewService(BaseModel):
    """
        Pydantic model for new service
    """
    serviceId: int
    region: str
    name: str
    instanceType: str


