import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import stripe

app = FastAPI()

# Enable CORS so your Vercel frontend can communicate with Render
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Replace with your Stripe Secret Test Key (from dashboard.stripe.com) or set as env var
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_51...")

class CheckoutRequest(BaseModel):
    stream_id: int
    stream_title: str

@app.get("/")
def read_root():
    return {"message": "Sports App Simulation API is Live!"}

@app.get("/api/streams")
def get_streams():
    return [
        {"id": 1, "title": "Live Championship Game", "category": "Football", "is_premium": False},
        {"id": 2, "title": "Pro Basketball Finals", "category": "Basketball", "is_premium": True},
        {"id": 3, "title": "Grand Slam Highlights", "category": "Tennis", "is_premium": True}
    ]

@app.post("/api/create-checkout-session")
def create_checkout_session(data: CheckoutRequest):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": f"Pass: {data.stream_title}",
                    },
                    "unit_amount": 499, # $4.99 USD
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url="https://sports-app-simulation.vercel.app/?success=true",
            cancel_url="https://sports-app-simulation.vercel.app/?canceled=true",
        )
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))