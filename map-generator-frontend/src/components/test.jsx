import { useState, useRef } from "react";

const items = [
  { name: "bed", src: "/bed.png" },
  { name: "chest", src: "/chest.png" },
  { name: "house", src: "/house.png" },
  { name: "lake", src: "/lake.png" },
  { name: "rocks", src: "/rocks.png" },
  { name: "table", src: "/table.png" },
  { name: "tent", src: "/tent.png" },
];

const App = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(items);

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  return (
    <>
      {list &&
        list.map((item, index) => (
          <div
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            key={index}
            draggable
          >
            {item}
          </div>
        ))}
    </>
  );
};
export default App;
