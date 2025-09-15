import { Link, useNavigate, useParams } from "react-router";
import "./PostPage.css";
import useAuth from "../../hooks/useAuth";
import {
  getFavoriteMap,
  getLikeListMap,
  getMap,
  useDeleteMap,
  useFavoriteMap,
  useLikeMap,
  useRemoveFavoriteMap,
  useUnlikeMap,
} from "../../api/mapApi";
import { postComment, deleteComment } from "../../api/mapApi";
import { useEffect, useState } from "react";

export default function PostPage() {
  const navigate = useNavigate();
  const { userId, isAuthenticated, accessToken } = useAuth();
  const { mapId } = useParams();
  const deleteMap = useDeleteMap();
  const likeMap = useLikeMap();
  const unlikeMap = useUnlikeMap();
  const removeFavoriteMap = useRemoveFavoriteMap();
  const favoriteMap = useFavoriteMap();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEntering, setIsEntering] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);

  //animation effect
  useEffect(() => {
    let raf = requestAnimationFrame(() => {
      const t = setTimeout(() => setIsEntering(false), 20);
      return () => clearTimeout(t);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  //fetching map
  useEffect(() => {
    const fetchMap = async () => {
      try {
        const data = await getMap(mapId, accessToken);
        setMap(data);
      } catch (err) {
        console.error("❌ Failed to fetch map:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMap();
  }, [mapId, accessToken]);

  const [favourites, setFavourites] = useState(map?.favourites || []);
  const [likes, setLikes] = useState(map?.likes || []);

  // like set
  useEffect(() => {
    const checkIfLiked = async () => {
      if (isAuthenticated && accessToken) {
        try {
          const response = await getLikeListMap(accessToken);

          if (Array.isArray(response)) {
            const isInLikeList = response.some((item) => item._id === mapId);
            setIsLiked(isInLikeList);
          } else {
            console.error(
              "Expected response to be an array, but got:",
              response
            );
          }
        } catch (error) {
          console.error("Error checking if pet is in wishlist", error);
        }
      }
    };

    checkIfLiked();
  }, [mapId, isAuthenticated, accessToken]);

  useEffect(() => {
    const checkIfFavourite = async () => {
      if (isAuthenticated && accessToken) {
        try {
          const response = await getFavoriteMap(accessToken);

          if (Array.isArray(response)) {
            const isInFavouriteList = response.some(
              (item) => item._id === mapId
            );
            setIsFavourite(isInFavouriteList);
          } else {
            console.error(
              "Expected response to be an array, but got:",
              response
            );
          }
        } catch (error) {
          console.error("Error checking if pet is in wishlist", error);
        }
      }
    };

    checkIfFavourite();
  }, [mapId, isAuthenticated, accessToken]);

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

  const mapLikeListHandler = async () => {
    try {
      const res = await likeMap(mapId);
      if (res && res.likes) {
        setLikes(res.likes);
        setIsLiked(true);
      } else {
        console.warn("Unexpected like response", res);
      }
    } catch (err) {
      console.error("Error liking map:", err);
    }
  };

  const mapUnlikeHandler = async () => {
    try {
      const res = await unlikeMap(mapId);
      if (res && res.likes) {
        setLikes(res.likes);
        setIsLiked(false);
      } else {
        console.warn("Unexpected unlike response", res);
      }
    } catch (err) {
      console.error("Error unliking map:", err);
    }
  };

  //favorite functionality
  const handleAddFavourite = async () => {
    try {
      const updated = await favoriteMap(mapId);
      setFavourites(updated.favourites);
      setIsFavourite(true);
    } catch (err) {
      console.error("Error adding favourite:", err);
    }
  };

  const handleRemoveFavourite = async () => {
    try {
      const updated = await removeFavoriteMap(mapId);
      setFavourites(updated.favourites);
      setIsFavourite(false);
    } catch (err) {
      console.error("Error removing favourite:", err);
    }
  };

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
      {loading ? (
        <div className="loading-wrapper">
          <p>Loading...</p>
        </div>
      ) : (
        <>
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
                <Link to={`/posts/${mapId}/edit`}>
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
                {!isFavourite ? (
                  <button onClick={handleAddFavourite}>
                    ⭐ Add to Favorites
                  </button>
                ) : (
                  <button onClick={handleRemoveFavourite}>
                    ⭐ Remove from Favorites
                  </button>
                )}
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
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                        >
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
        </>
      )}
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </div>
  );
}
