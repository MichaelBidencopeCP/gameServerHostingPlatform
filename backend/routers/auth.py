from fastapi import APIRouter

from datetime import datetime
from firebase_admin import auth
from sqlmodel import select

from ..dependencies import FirebaseUserDep, SessionDep
from ..models import User
from ..project_types.auth_types import Signup, Credits

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.get("/user")
def get_user(user: FirebaseUserDep,session:SessionDep):
    
    exists = select(User.username, User.first_name, User.last_name, User.credits).where(User.id == user['uid'])
    signup = session.exec(exists).first()
    if not signup:
        return {
            "message": "finish signup",
            "signup": True
        }
    user.update({
        "username": signup.username,
        "first_name": signup.first_name,
        "last_name": signup.last_name,
        "credits": signup.credits
    })
    return user



@router.post("/user")
def signup(user: FirebaseUserDep, session:SessionDep, userInfo:Signup):
    user = User(
        id=user['uid'],
        username=userInfo.username,
        first_name=userInfo.first_name,
        last_name=userInfo.last_name,
        credits=0,
        last_updated=datetime.now()
    )
    session.add(user)
    session.commit()
    return user

@router.get("/credits")
def get_credits(user: FirebaseUserDep, session:SessionDep) -> Credits:
    """
        Get the credits of the user
    """
    credits = select(User.credits).where(User.id == user['uid'])
    credits = session.exec(credits).first()
    
    return Credits(credits=credits)


