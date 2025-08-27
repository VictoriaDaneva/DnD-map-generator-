import { Link } from "react-router";
import { useState, useEffect } from "react";
import "./Profile.css";
import { useProfile } from "../../../api/authApi";
import { useUserContext } from "../../../context/UserContext";
import EditProfile from "../editProfile/EditProfile";

export default function Profile() {
  const [isEntering, setIsEntering] = useState(true);
  const { fetchProfile } = useProfile();
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userId, username, email, imageUrl, address, phoneNumber } =
    useUserContext();

  useEffect(() => {
    if (userId && !isProfileFetched) {
      fetchProfile();
      setIsProfileFetched(true);
    }
  }, [userId, isProfileFetched]);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

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
                <img src={imageUrl} alt={username} />
              </div>
            </div>

            {/* Right side */}
            <div className="profile-right">
              <h2>Profile</h2>
              <p>
                <strong>Name:</strong> {username}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Phone Number:</strong> {phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {address}
              </p>
              <button
                className="edit-profile-btn"
                onClick={() => setIsModalOpen(true)}
              >
                Edit Profile
              </button>
              <EditProfile
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                //onSave={handleSave}
              />
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
