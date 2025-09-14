import { Link } from "react-router";
import { useState, useEffect } from "react";
import "./Profile.css";
import { useProfile } from "../../../api/authApi";
import { useUserContext } from "../../../context/UserContext";
import EditProfile from "../editProfile/EditProfile";
import useAuth from "../../../hooks/useAuth";
import { getFavoriteMap, getMap } from "../../../api/mapApi";

export default function Profile() {
  const [isEntering, setIsEntering] = useState(true);
  const { fetchProfile } = useProfile();
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    userId,
    username,
    email,
    imageUrl,
    address,
    phoneNumber,
    posts,
    favourite,
  } = useUserContext();

  const { accessToken } = useAuth();

  console.log(posts, favourite);

  const [userMaps, setUserMaps] = useState([]);
  const [favouriteMaps, setFavouriteMaps] = useState([]);

  useEffect(() => {
    if (userId && !isProfileFetched) {
      fetchProfile();
      setIsProfileFetched(true);
    }
  }, [userId, isProfileFetched, fetchProfile]);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  // Maps - posts and favorites

  useEffect(() => {
    const fetchData = async () => {
      try {
        // user’s posts
        if (posts && posts.length > 0) {
          const myMaps = await Promise.all(
            posts.map((id) => getMap(id, accessToken))
          );
          setUserMaps(myMaps);
        }

        // favourites
        const favs = await getFavoriteMap(accessToken);
        setFavouriteMaps(favs);
      } catch (err) {
        console.error("❌ Error fetching profile maps:", err);
      }
    };

    if (accessToken && userId) {
      fetchData();
    }
  }, [accessToken, userId, posts]);

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
              {userMaps.length > 0 ? (
                userMaps.map((map) => (
                  <div key={map._id} className="product-card">
                    <div className="map-preview-container">
                      <img
                        src={map.image}
                        alt={map.title}
                        className="map-preview-image"
                      />

                      {map.items?.map((item) => {
                        const originalWidth = 800;
                        const originalHeight = 600;

                        return (
                          <img
                            key={item._id}
                            src={`/${item.name}.png`}
                            alt={item.name}
                            className="map-item-overlay"
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

                    <p className="product-name">{map.title}</p>
                    <Link to={`/maps/${map._id}`} className="details-link">
                      View Details
                    </Link>
                  </div>
                ))
              ) : (
                <p>No maps yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Favourites */}
        <div className="maps-wrapper">
          <section className="maps-and-post-section">
            <h2>Your Favourite Maps ❤️</h2>
            <div className="maps-grid">
              <div className="maps-grid">
                {favouriteMaps.length > 0 ? (
                  favouriteMaps.map((map) => (
                    <div key={map._id} className="product-card">
                      <div className="map-preview-container">
                        <img
                          src={map.image}
                          alt={map.title}
                          className="map-preview-image"
                        />

                        {map.items?.map((item) => {
                          const originalWidth = 800;
                          const originalHeight = 600;

                          return (
                            <img
                              key={item._id}
                              src={`/${item.name}.png`}
                              alt={item.name}
                              className="map-item-overlay"
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

                      <p className="product-name">{map.title}</p>
                      <Link to={`/posts/${map._id}`} className="details-link">
                        View Details
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No maps yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>
        <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
      </div>
    </>
  );
}
