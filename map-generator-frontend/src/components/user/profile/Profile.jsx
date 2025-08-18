import { Link } from "react-router";
import { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [isEntering, setIsEntering] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  // Static mock data (replace later with backend/user context)
  const userId = 1;
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, Springfield",
    image: "https://i.pravatar.cc/200?img=32",
  };

  // Static example maps/pets
  const maps = [
    {
      id: 1,
      title: "Desert Adventure",
      thumbnail: "https://placehold.co/200x120",
    },
    {
      id: 2,
      title: "Forest Hideout",
      thumbnail: "https://placehold.co/200x120",
    },
    {
      id: 3,
      title: "Mountain Quest",
      thumbnail: "https://placehold.co/200x120",
    },
  ];

  return (
    <>
      <div className="background-profile">
        <div className="profile-wrapper">
          <div className="profile-card">
            {/* Left side */}
            <div className="profile-left">
              <div className="profile-image">
                <img src={user.image} alt={user.name} />
              </div>
            </div>

            {/* Right side */}
            <div className="profile-right">
              <h2>Profile</h2>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {user.phone}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
              <Link to={`/profile/edit/${userId}`}>
                <button className="edit-profile-btn">Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="section-divider"></div>
        <div className="maps-wrapper">
          <section className="maps-and-post-section">
            <h2>Your Maps ✨🪶</h2>
            <div className="maps-grid">
              {maps.map((map) => (
                <div key={map.id} className="product-card">
                  <img
                    src={map.thumbnail}
                    alt={map.title}
                    className="product-image"
                  />
                  <p className="product-name">{map.title}</p>
                  <Link to={`/maps/${map.id}`} className="details-link">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
      </div>
    </>
  );
}
