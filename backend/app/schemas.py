from pydantic import BaseModel
from typing import Optional

class PostBase(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None


class PostCreate(PostBase): ## inherts from PostBase both title and content to avoid dublicating code
    pass


class PostUpdate(PostBase):
    pass


class Post(PostBase):
    id: int

    class Config:
        orm_mode = True
