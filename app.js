import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    fetch('/api/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handleInputChange = (e) => {
    setItemName(e.target.value);
  };

  const handleSubmit = () => {
    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: itemName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setItems([...items, data]);
        setItemName('');
      });
  };

  return (
    <div className="App">
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Item name"
        value={itemName}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Add Item</button>
    </div>
  );
}

export default App;
