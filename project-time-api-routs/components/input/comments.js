import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import NotificationContext from "../../store/notification-context";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(async () => {
    if (showComments) {
      setIsFetchingComments(true);
      await getComments();
    }
    async function getComments() {
      const response = await fetch("/api/comments");
      const commentsData = await response.json();
      setComments(commentsData.comments);
      setIsFetchingComments(false);
    }
  }, [showComments]);

  async function addCommentHandler(commentData) {
    // send data to API
    notificationCtx.showNotification({
      title: "Signing comment...",
      message: "Whatever.",
      status: "pending",
    });
    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponded = await response.json();

      notificationCtx.showNotification({
        title: "Success!",
        message: "Whatever.",
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Whatever.",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
