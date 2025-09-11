import { Link, useNavigate, useParams } from "react-router";
import "./PostPage.css";
import useAuth from "../../hooks/useAuth";
import {
  getLikeListMap,
  getMap,
  useDeleteMap,
  useLikeMap,
  useUnlikeMap,
} from "../../api/mapApi";
import { postComment, deleteComment } from "../../api/mapApi";
import { useEffect, useState } from "react";

export default function PostPage() {
  const navigate = useNavigate();
  const { userId, isAuthenticated, accessToken } = useAuth();
  const { mapId } = useParams();
  const { map } = getMap(mapId);
  const deleteMap = useDeleteMap();
  const likeMap = useLikeMap();
  const unlikeMap = useUnlikeMap();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEntering, setIsEntering] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(map?.likes || []);
  const [favouriteList, setFavouriteList] = useState([]);

  //animation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 30);
    return () => clearTimeout(timer);
  }, []);

  // likes set
  useEffect(() => {
    if (map?.likes) {
      setLikes(map.likes);
    }
  }, [map]);

  //comments set
  useEffect(() => {
    if (map?.comments) {
      setComments(map.comments);
    }
  }, [map]);

  //loader
  if (!map) {
    return <p>Loading...</p>;
  }

  //comments functionality
  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    const comment = await postComment(map._id, newComment, accessToken);
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    await deleteComment(commentId, accessToken);
    setComments(comments.filter((c) => c._id !== commentId));
  };

  //like functionality
  useEffect(() => {
    const checkIfLiked = async () => {
      if (isAuthenticated && accessToken) {
        try {
          const response = await getLikeListMap(accessToken);

          if (Array.isArray(response)) {
            const isInLikeList = response.some((m) => m._id === mapId);
            setIsLiked(isInLikeList);
          } else {
            console.error(
              "Expected response to be an array, but got:",
              response
            );
          }
        } catch (error) {
          console.error("Error checking if map is in like list", error);
        }
      }
    };

    checkIfLiked();
  }, [mapId, isAuthenticated, accessToken]);

  const mapLikeListHandler = async () => {
    await likeMap(mapId);
    setIsLiked(true);
    setLikes([...likes, { _id: userId }]);
  };

  const mapUnlikeHandler = async () => {
    await unlikeMap(mapId);
    setIsLiked(false);
    setLikes(likes.filter((l) => l._id !== userId));
  };

  //favorite functionality

  //owner - edit and delete

  const isOwner = map?.owner?._id && userId === map.owner._id;

  const mapDeleteHandler = async () => {
    const hasConfirm = confirm(`Are you sure you want to delete ${map.title}?`);
    if (!hasConfirm) return;

    await deleteMap(mapId);
    navigate("/posts");
  };
  return (
    <div className="post-page">
      <div className="post-image-container">
        <img src={map.image} alt={map.title} className="background-image" />

        {map.items?.map((item) => {
          const originalWidth = 800;
          const originalHeight = 600;

          return (
            <img
              key={item._id}
              src={`/${item.name}.png`}
              alt={item.name}
              className="map-item"
              style={{
                left: `${(item.x / originalWidth) * 100}%`,
                top: `${(item.y / originalHeight) * 100}%`,
                width: `${(item.size / originalWidth) * 100}%`,
                transform: `rotate(${item.rotation}deg)`,
              }}
            />
          );
        })}
      </div>
      <div className="actions">
        {isOwner ? (
          <>
            <Link to={`/map/${mapId}/edit`}>
              <button className="edit-button">Edit</button>
            </Link>
            <button onClick={mapDeleteHandler} className="delete-button">
              Delete
            </button>
          </>
        ) : isAuthenticated ? (
          <>
            {!isLiked ? (
              <button onClick={mapLikeListHandler} className="like-button">
                ❤️ Like ({likes.length})
              </button>
            ) : (
              <button onClick={mapUnlikeHandler} className="like-button">
                💔 Unlike ({likes.length})
              </button>
            )}
            <button>⭐ Add to Favourites</button>
            <button>💬 Comment</button>
            <button>⬇ Download</button>
          </>
        ) : null}
      </div>

      <div className="post-info">
        <h1>{map.title}</h1>
        <p>
          by <span className="author">{map.author}</span>
        </p>
        <p className="meta">
          Published: {map.createdAt} | Owned by{" "}
          <span className="owner">{map.owner?.username}</span>
        </p>
      </div>

      <div className="comments">
        <h2>Comments ({comments?.length})</h2>

        {isAuthenticated && (
          <div className="comment-input">
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handlePostComment}>Post</button>
          </div>
        )}

        <div className="comment-list">
          {comments?.length ? (
            comments.map((comment) => (
              <div key={comment._id} className="comment">
                <div className="comment-user">{comment.user?.username}</div>
                <div className="comment-date">
                  {new Date(comment.date).toLocaleDateString()}
                </div>
                <p>{comment.text}</p>

                {comment.user?._id === userId && (
                  <div className="comment-actions">
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet.</p>
          )}
        </div>
      </div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </div>
  );
}
