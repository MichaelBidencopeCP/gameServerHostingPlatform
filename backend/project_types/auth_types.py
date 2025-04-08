from pydantic import BaseModel
#Auth Pydantic Types

class Signup(BaseModel):
    '''
        Pydantic model for user signup
    '''
    username: str
    first_name: str
    last_name: str

