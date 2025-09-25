import "./Loader.css";

export default function Loader() {
  return (
    <div className="post-page-loader">
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading your map...</p>
      </div>
    </div>
  );
}
