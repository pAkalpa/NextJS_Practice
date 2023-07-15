import { useState, useEffect, useContext } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "@/store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const notificationContext = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

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
    notificationContext.showNotification({
      title: "Posting Comment...",
      message: "Posting the comment",
      status: "pending",
    });
    setIsFetchingComments(true);
    const response = await fetch(`/api/comment/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setIsFetchingComments(false);
      const message = `An error has occured: ${response.status}`;
      notificationContext.showNotification({
        title: "Error!",
        message: message,
        status: "error",
      });
      return;
    }
    const data = await response.json();
    setIsFetchingComments(false);
    notificationContext.showNotification({
      title: "Success!",
      message: "Successfully posted the comment!",
      status: "success",
    });
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
