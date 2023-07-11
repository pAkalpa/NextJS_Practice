import { useState, useEffect } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comment/${eventId}`)
        .then((response) => response.json())
        .then((data) => setComments(data.comments));
    }
  }, [showComments, eventId]);

  const toggleCommentsHandler = async () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (commentData) => {
    const response = await fetch(`/api/comment/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("🤬 ~ file: comments.jsx:24 ~ addCommentHandler ~ data:", data);
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
