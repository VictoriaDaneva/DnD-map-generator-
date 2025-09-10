import { useNavigate, useParams } from "react-router";
import "./PostPage.css";
import useAuth from "../../hooks/useAuth";
import { getMap, useDeleteMap } from "../../api/mapApi";

export default function PostPage() {
  const navigate = useNavigate();
  const { userId, isAuthenticated, accessToken } = useAuth();
  const { mapId } = useParams();
  const { map } = getMap(mapId);
  const deleteMap = useDeleteMap();

  if (!map) {
    return <p>Loading...</p>;
  }

  console.log(map);

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
        <button>⭐ Add to Favourites</button>
        <button>💬 Comment</button>
        <button>❤️ Like</button>
        <button>⬇ Download</button>
      </div>

      <div className="post-info">
        <h1>{map.title}</h1>
        <p>
          by <span className="author">{map.author}</span>
        </p>
        <p className="meta">
          Published: {map.date} | Owned by{" "}
          <span className="owner">{map.owner?.username}</span>
        </p>
      </div>

      <div className="comments">
        <h2>Comments {map.comments?.length}</h2>
        <div className="comment-input">
          <textarea placeholder="Write a comment..." disabled />
          <button disabled>Post</button>
        </div>
        <div className="comment-list">
          {map.comments?.length > 0 ? (
            map.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <div className="comment-user">{comment.user?.username}</div>
                <div className="comment-date">
                  {new Date(comment.date).toLocaleDateString()}
                </div>
                <p>{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
