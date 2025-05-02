from typing import Optional
from datetime import datetime

from sqlmodel import Field, SQLModel


class Test(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)


class User(SQLModel, table=True):
    id: str = Field(primary_key=True)
    username: str = Field(index=True)
    first_name : str = Field()
    last_name : str = Field()
    created_at: str = Field(default=datetime.now())
    updated_at: str = Field(default=datetime.now())
    credits: int = Field(default=0)
    staff: bool = Field(default=False)
    has_cost_tracking: bool = Field(default=False)

class ServiceType(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: str = Field()
    type: str = Field()
    ami_id: str = Field()


class Service(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: str = Field()
    instance_type: str = Field()
    status: str = Field()
    user_id: str = Field(foreign_key="user.id")
    region: str = Field()
    service_type_id: int = Field(foreign_key="servicetype.id")
    created_at: str = Field(default=datetime.now())
    updated_at: str = Field(default=datetime.now())
    

class ServiceSecurityGroup(SQLModel, table=True):
    id: str = Field(primary_key=True)
    service_id: int = Field(foreign_key="service.id")
    region: str = Field()

class ServiceAmi(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ami_id: str = Field()
    service_id: int = Field(foreign_key="service.id")
    region: str = Field()