from pydantic import BaseModel

class UserSchema(BaseModel):
    name: str 
    username: str 
    hash_password: str
    email: str 
    # mobile: str 

class UserResponseSchema(BaseModel):
    name: str 
    username: str 
    email: str 
    id: int

    
class LoginSchema(BaseModel):
    username: str 
    password: str 
