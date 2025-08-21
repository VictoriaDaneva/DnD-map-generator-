import "./PostPage.css";

export default function PostPage() {
  const post = {
    title: "The Scarlet Dragon Empress",
    img: "/login.jpg",
    author: "Verdetto",
    date: "Apr 22, 2025",
    owner: "LisaEternity",
  };

  const comments = [
    { id: 1, user: "MegaSirene", text: "Impressive!", date: "Jun 28, 2025" },
    {
      id: 2,
      user: "DragonSlayer",
      text: "Epic details!",
      date: "Jun 27, 2025",
    },
    {
      id: 3,
      user: "MapWizard",
      text: "This would fit perfectly in my campaign!",
      date: "Jun 25, 2025",
    },
  ];

  return (
    <div className="post-page">
      <div className="post-image-container">
        <img src={post.img} alt={post.title} />
      </div>

      <div className="actions">
        <button>⭐ Add to Favourites</button>
        <button>💬 Comment</button>
        <button>❤️ Like</button>
        <button>⬇ Download</button>
      </div>

      <div className="post-info">
        <h1>{post.title}</h1>
        <p>
          by <span className="author">{post.author}</span>
        </p>
        <p className="meta">
          Published: {post.date} | Owned by{" "}
          <span className="owner">{post.owner}</span>
        </p>
      </div>

      <div className="comments">
        <h2>Comments {comments.length}</h2>
        <div className="comment-input">
          <textarea placeholder="Write a comment..." disabled />
          <button disabled>Post</button>
        </div>
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-user">{comment.user}</div>
              <div className="comment-date">{comment.date}</div>
              <p>{comment.text}</p>
              <div className="comment-actions">
                <button>💬 Reply</button>
                <button>❤️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
