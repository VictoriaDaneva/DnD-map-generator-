import { useState, useEffect } from "react";
import "../../biomes/savePage/SaveModal.css";
import { useUserContext } from "../../../context/UserContext";
import { editProfile, useProfile } from "../../../api/authApi";
import { useNavigate } from "react-router";

export default function EditProfile({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const { fetchProfile } = useProfile();
  const {
    userLoginHandler,
    userId,
    username,
    email,
    imageUrl,
    address,
    phoneNumber,
    accessToken,
  } = useUserContext();

  useEffect(() => {
    if (userId && !isProfileFetched) {
      fetchProfile();
      setIsProfileFetched(true);
    }
  }, [userId, isProfileFetched]);

  const [formData, setFormData] = useState({
    username: username || "",
    email: email || "",
    phoneNumber: phoneNumber || "",
    imageUrl: imageUrl || "",
    address: address || "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const editProfileHandler = async (event) => {
    event.preventDefault();

    try {
      const updatedUserData = await editProfile(userId, formData, accessToken);

      userLoginHandler({
        ...updatedUserData,
        accessToken: accessToken,
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Edit Profile</h2>
        <div className="modal-wrapper">
          <form onSubmit={editProfileHandler} className="form-save-maps">
            <label className="modal-label">Username *</label>
            <input
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className="modal-input"
              placeholder="Enter a username.."
              required
            />

            <label className="modal-label">Email *</label>
            <input
              type="text"
              value={formData.email}
              onChange={handleInputChange}
              className="modal-input"
              placeholder="Your email.."
            />

            <label className="modal-label">Profile Picture *</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="modal-input"
              placeholder="Your picture.."
            />

            <label className="modal-label">Phone Number *</label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="modal-input"
              placeholder="Your phone number ;) .."
            />

            <label className="modal-label">Address *</label>
            <input
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              className="modal-input"
              placeholder="Your address mister.."
            />
          </form>
          {formData.imageUrl && (
            <div className="modal-preview">
              <p className="modal-preview-label">Preview:</p>
              <img
                src={formData.imageUrl}
                onChange={handleInputChange}
                alt="Profile Picture Preview"
                className="modal-preview-img"
              />
            </div>
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-btn cancel">
            Cancel
          </button>
          <button type="submit" className="modal-btn save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
