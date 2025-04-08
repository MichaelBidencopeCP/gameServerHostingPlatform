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
