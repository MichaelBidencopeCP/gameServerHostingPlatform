from pydantic import BaseModel

class CreditPaymentIntent(BaseModel):
    credits: int


class StripePaymentConfirm(BaseModel):
    client_secret: str
    