import "./ItemsSidebar.css";
export default function Sidebar() {
  const items = [
    { name: "bed", src: "/bed.png" },
    { name: "chest", src: "/chest.png" },
    { name: "house", src: "/house.png" },
    { name: "lake", src: "/lake.png" },
    { name: "rocks", src: "/rocks.png" },
    { name: "table", src: "/table.png" },
    { name: "tent", src: "/tent.png" },
  ];
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Items</h2>
      <ul className="draggable-items">
        {items.map((item, index) => (
          <li
            key={index}
            className="draggable-item"
            onDragStart={(e) => handleDragStart(e, item)}
            draggable
          >
            <img src={item.src} alt={item.name} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
