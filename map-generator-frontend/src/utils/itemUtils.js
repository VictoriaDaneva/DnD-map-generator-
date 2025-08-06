export const updateItem = (items, id, updates) =>
  items.map((item) => (item.id === id ? { ...item, ...updates } : item));

export const deleteItem = (items, id) => items.filter((item) => item.id !== id);
