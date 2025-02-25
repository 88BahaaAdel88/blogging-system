from sqlalchemy.orm import Session
from schemas import PostCreate, PostUpdate, Post
from post import Post as PostModel

def create_post(db: Session, post: PostCreate):
    db_post = PostModel(title=post.title, content=post.content)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def get_post(db: Session, post_id: int):
    return db.query(PostModel).filter(PostModel.id == post_id).first()


def get_posts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(PostModel).offset(skip).limit(limit).all()


def update_post(db: Session, post_id: int, post: PostUpdate):
    db_post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if db_post:
        if post.title:
            db_post.title = post.title
        if post.content:
            db_post.content = post.content
        db.commit()
        db.refresh(db_post)
    return db_post


def delete_post(db: Session, post_id: int):
    db_post = db.query(PostModel).filter(PostModel.id== post_id).first()
    if db_post:
        db.delete(db_post)
        db.commit()
    return db_post
