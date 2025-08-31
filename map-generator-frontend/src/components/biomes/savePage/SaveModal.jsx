import { createMap } from "../../../api/mapApi";
import { useUserContext } from "../../../context/UserContext";
import "./SaveModal.css";
import { useNavigate } from "react-router";

export default function SaveMapModal({
  isOpen,
  onClose,
  previewImage,
  onSave,
  placedItems,
  biome,
}) {
  const navigate = useNavigate();
  const { accessToken } = useUserContext();

  const submitAction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const mapData = Object.fromEntries(formData);

    const fullMapData = onSave({
      ...mapData,
      biome,
      items: placedItems.map((item) => ({
        name: item.name,
        x: item.x,
        y: item.y,
        size: item.size,
        rotation: item.rotation,
      })),
    });

    try {
      await createMap(fullMapData, accessToken);
      navigate("/posts");
    } catch (error) {
      console.error("Failed to create map:", error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Save Map</h2>
        <div className="modal-wrapper">
          <form
            id="post-map-form"
            onSubmit={submitAction}
            className="form-save-maps"
          >
            <label className="modal-label">Title *</label>
            <input
              type="text"
              name="title"
              className="modal-input"
              placeholder="Enter a title"
              required
            />

            <label className="modal-label">Author</label>
            <input
              type="text"
              name="author"
              className="modal-input"
              placeholder="Your name"
              required
            />

            <label className="modal-label">Description</label>
            <textarea
              name="description"
              className="modal-textarea"
              placeholder="Describe your map..."
            />

            <label className="modal-label">Tags</label>
            <input
              type="text"
              name="tags"
              className="modal-input"
              placeholder="e.g. forest, dungeon, boss"
            />
          </form>
          {previewImage && (
            <div className="modal-preview">
              <p className="modal-preview-label">Preview:</p>
              <img
                src={previewImage}
                name="previewImage"
                alt="Map Preview"
                className="modal-preview-img"
              />
            </div>
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-btn cancel">
            Cancel
          </button>
          <button form="post-map-form" type="submit" className="modal-btn save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
