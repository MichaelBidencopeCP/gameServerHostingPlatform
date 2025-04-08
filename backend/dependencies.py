from sqlmodel import Session
from fastapi import Depends, Header
from typing import Annotated
from .database import engine
from fastapi import HTTPException

from firebase_admin import auth


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
"""
    Get the user details from Firebase, based on TokenID in the request
    :param request: The HTTP request
"""