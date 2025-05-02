from fastapi import WebSocket, APIRouter, Depends, HTTPException


router = APIRouter()

@router.websocket("/ws/dashboard")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for the dashboard
    :param websocket: The WebSocket connection
    """
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message text was: {data}")
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.close()