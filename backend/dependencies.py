from sqlmodel import Session, select
from fastapi import Depends, Header
from typing import Annotated
from .database import engine
from fastapi import HTTPException

from firebase_admin import auth

from .models import User




def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]


def get_firebase_user(token:Annotated[str, Header()]):
    """
    Get the user details from Firebase, based on TokenID in the request
    :param request: The HTTP request
    """
   
    if not token:
        raise HTTPException(status_code=400, detail='TokenID must be provided')

    try:
        claims = auth.verify_id_token(token, clock_skew_seconds=10)
        return claims
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail='Unauthorized')

FirebaseUserDep = Annotated[dict, Depends(get_firebase_user)]

def get_staff_user(
    firebase_user: FirebaseUserDep,
    session: SessionDep
):
    """
    Get the Firebase user and check if they are an staff in the database
    :param firebase_user: The authenticated Firebase user
    :param session: The database session
    :return: The Firebase user if they are an staff
    :raises HTTPException: If the user is not an staff
    """
    # Get the Firebase UID
    uid = firebase_user.get("uid")
    
    # Query the database for the user
    
    user = select(User).where(User.id == uid)
    user = session.exec(user).first()
    # Check if the user exists
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Check if the user is an staff
    if not user or not user.staff:
        raise HTTPException(status_code=403, detail="Staff access required")
    
    return firebase_user

StaffUserDep = Annotated[dict, Depends(get_staff_user)]