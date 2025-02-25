from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import PostCreate, PostUpdate, Post
from database import SessionLocal, engine, Base
from crud import create_post as create_post_crud, get_post as get_post_crud , get_posts as get_posts_crud, update_post as update_post_crud, delete_post as delete_post_curd


app = FastAPI()

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/posts/", response_model=Post)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    return create_post_crud(db=db, post=post)


@app.get("/posts/", response_model=list[Post])
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    posts = get_posts_crud(db, skip=skip, limit=limit)
    return posts


@app.get("/posts/{post_id}", response_model=Post)
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = get_post_crud(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post


@app.put("/posts/{post_id}", response_model=Post)
def update_post(post_id: int, post: PostUpdate, db: Session = Depends(get_db)):
    db_post = update_post_crud(db, post_id, post)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post


@app.delete("/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db)):
    db_post = delete_post_curd(db, post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}
