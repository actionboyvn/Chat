from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import QueryEngine
import socketio
from socket_manager import sio

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app = socketio.ASGIApp(sio, other_asgi_app=app)

@sio.event
async def connect(sid, environ):
    print('Connected', sid)

@sio.event
async def disconnect(sid):
    print('Disconnected', sid)

@sio.event
async def get_response(sid, conversation, func_sig=None):
    conv = jsonable_encoder(conversation)
    response = await QueryEngine.query(func_sig, conv, sid)
    await sio.emit('get_response_callback', response, room=sid)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('service:app', host="0.0.0.0", port=8001)