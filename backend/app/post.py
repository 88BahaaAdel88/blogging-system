from sqlalchemy import Column, Integer, String, Text
from database import Base


class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True) ## increment id for every post
    title = Column(String, index=True)
    content = Column(Text)
