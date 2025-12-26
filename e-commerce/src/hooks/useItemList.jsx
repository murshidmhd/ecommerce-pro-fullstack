// import { useState } from "react";

// export function useItemList(initialItem = []) {
//   const [items, setItems] = useState(initialItem);

//   const addItem = (item) => {
//     setItems((prv) => {
//       if (prv.find((i) => i.id === item.id)) return prv;
//       return [...prv, item];
//     });
//   };

//   const removeItem = (id) => {
//     setItems((prv) => prv.filter((i) => i.id !== id));
//   };

//   const clearItem = () => {
//     setItems([]);
//   };

//   return { items, addItem, removeItem, clearItem, setItems };
// }

