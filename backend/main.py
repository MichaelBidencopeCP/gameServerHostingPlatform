from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import firebase_admin
from firebase_admin import credentials

from .routers import test, auth, payments
from .database import create_db_and_tables


# This is a context manager that will run before the app starts and after the app stops
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create the database and tables
    create_db_and_tables()
    cred = credentials.Certificate("firebase-cred.json")
    firebase_admin.initialize_app(cred)
    yield
    # Close the database connection

app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(test.router)
app.include_router(auth.router)
app.include_router(payments.router)




