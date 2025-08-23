import { useState } from "react";
import "./SaveModal.css";

export default function SaveMapModal({
  isOpen,
  onClose,
  onSave,
  previewImage,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSave = () => {
    const mapData = {
      title,
      author,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
    };
    onSave(mapData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Save Map</h2>
        <div className="modal-wrapper">
          <form action="" className="form-save-maps">
            <label className="modal-label">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
              placeholder="Enter a title"
              required
            />

            <label className="modal-label">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="modal-input"
              placeholder="Your name"
            />

            <label className="modal-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="modal-textarea"
              placeholder="Describe your map..."
            />

            <label className="modal-label">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="modal-input"
              placeholder="e.g. forest, dungeon, boss"
            />
          </form>
          {previewImage && (
            <div className="modal-preview">
              <p className="modal-preview-label">Preview:</p>
              <img
                src={previewImage}
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
          <button onClick={handleSave} className="modal-btn save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
