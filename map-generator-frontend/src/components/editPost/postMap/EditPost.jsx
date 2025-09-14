import { useEffect, useState, useRef } from "react";
import "./EditPost.css";
import Sidebar from "../../biomes/itemsSidebar/ItemsSidebar";
import useDragAndDrop from "../../../hooks/dragAndDrop";
import {
  updateItem as update,
  deleteItem as remove,
} from "../../../utils/itemUtils";
import { biomeImages } from "../../../utils/biomeImageMap";
import Item from "../../biomes/item/Item";
import EditMapModal from "../editModal/EditModal";
import { useParams } from "react-router";
import { getMap } from "../../../api/mapApi";
import useAuth from "../../../hooks/useAuth";

export default function MapEditor() {
  const { mapId } = useParams();
  const { accessToken } = useAuth();

  const [isEntering, setIsEntering] = useState(true);
  const [map, setMap] = useState(null);
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef(null);
  const { handleMouseDown } = useDragAndDrop(
    containerRef,
    placedItems,
    setPlacedItems,
    selectedItemId,
    setSelectedItemId
  );
  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const data = await getMap(mapId, accessToken);

        const itemsWithSrc = (data.items || []).map((item) => ({
          ...item,
          id: item._id || Date.now() + Math.random(),
          src: `/${item.name}.png`,
        }));

        setMap(data);
        setPlacedItems(itemsWithSrc);
      } catch (err) {
        console.error("❌ Failed to fetch map:", err);
      }
    };

    if (mapId && accessToken) fetchMapData();
  }, [mapId, accessToken]);

  if (!map) return <p>Loading map...</p>;

  const biome = map.biome;
  const biomeImage = biomeImages[biome];

  const allowDrop = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const json = e.dataTransfer.getData("application/json");
    const itemIndex = e.dataTransfer.getData("itemIndex");

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (json) {
      const itemData = JSON.parse(json);
      const newItem = {
        ...itemData,
        x,
        y,
        id: Date.now() + Math.random(),
        size: 60,
        rotation: 0,
      };
      setPlacedItems((prev) => [...prev, newItem]);
    } else if (itemIndex) {
      setPlacedItems((prev) =>
        prev.map((item, i) => (i == itemIndex ? { ...item, x, y } : item))
      );
    }
  };

  const updateItem = (id, updates) =>
    setPlacedItems((prev) => update(prev, id, updates));
  const deleteItem = (id) => {
    setPlacedItems((prev) => remove(prev, id));
    setSelectedItemId(null);
  };

  const handleSave = (mapData) => {
    const fullMapData = {
      ...mapData,
      biome,
      image: biomeImage,
      items: placedItems.map((item) => ({
        name: item.name,
        x: item.x,
        y: item.y,
        size: item.size,
        rotation: item.rotation,
      })),
    };

    console.log("Saving map with data:", fullMapData);
    return fullMapData;
  };

  return (
    <>
      <div
        ref={containerRef}
        className="background-desert"
        style={{ backgroundImage: `url(${biomeImage})` }}
        onDrop={handleDrop}
        onDragOver={allowDrop}
        onMouseDown={(e) => {
          if (!e.target.closest(".dropped-wrapper")) setSelectedItemId(null);
        }}
      >
        <Sidebar />
        {placedItems.map((item) => (
          <Item
            key={item._id || item.id}
            item={item}
            isSelected={selectedItemId === item.id}
            onMouseDown={handleMouseDown}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        ))}
      </div>

      <div className="save-btn-wrapper">
        <button className="save-btn" onClick={() => setIsModalOpen(true)}>
          Save
        </button>
      </div>

      <EditMapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        placedItems={placedItems}
        biome={biome}
        image={biomeImage}
        previewImage={biomeImage}
        map={map}
      />

      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </>
  );
}
