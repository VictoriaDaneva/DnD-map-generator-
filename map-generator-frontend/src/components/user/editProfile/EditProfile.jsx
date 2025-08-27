import { useState, useEffect } from "react";
import "../../biomes/savePage/SaveModal.css";
import { useUserContext } from "../../../context/UserContext";
import { useProfile } from "../../../api/authApi";

export default function EditProfile({ isOpen, onClose }) {
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const { fetchProfile } = useProfile();
  const { userId, username, email, imageUrl, address, phoneNumber } =
    useUserContext();

  useEffect(() => {
    if (userId && !isProfileFetched) {
      fetchProfile();
      setIsProfileFetched(true);
    }
  }, [userId, isProfileFetched]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Edit Profile</h2>
        <div className="modal-wrapper">
          <form action="" className="form-save-maps">
            <label className="modal-label">Username *</label>
            <input
              type="text"
              value={username}
              //onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
              placeholder="Enter a username.."
              required
            />

            <label className="modal-label">Email *</label>
            <input
              type="text"
              value={email}
              //onChange={(e) => setAuthor(e.target.value)}
              className="modal-input"
              placeholder="Your email.."
            />

            <label className="modal-label">Profile Picture *</label>
            <input
              type="text"
              value={imageUrl}
              //onChange={(e) => setDescription(e.target.value)}
              className="modal-input"
              placeholder="Your picture.."
            />

            <label className="modal-label">Phone Number *</label>
            <input
              type="text"
              value={phoneNumber}
              //onChange={(e) => setTags(e.target.value)}
              className="modal-input"
              placeholder="Your phone number ;) .."
            />

            <label className="modal-label">Address *</label>
            <input
              type="text"
              value={address}
              //onChange={(e) => setTags(e.target.value)}
              className="modal-input"
              placeholder="Your address mister.."
            />
          </form>
          {imageUrl && (
            <div className="modal-preview">
              <p className="modal-preview-label">Preview:</p>
              <img
                src={imageUrl}
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
          <button className="modal-btn save">Save</button>
        </div>
      </div>
    </div>
  );
}
