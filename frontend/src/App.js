import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ title: '', description: '' });

  useEffect(() => {
    // Fetch data from backend
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
      setMessage('Successfully connected to backend!');
    } catch (error) {
      setMessage('Error connecting to backend. Make sure backend is running.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNewItem = async () => {
    if (!newItem.title || !newItem.description) {
      alert('Please enter both title and description');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/data', newItem);
      setData([...data, response.data]);
      setNewItem({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Docker Learning Project</h1>
        <p>Frontend running in Docker container!</p>
        <div className="status-message">
          <strong>Backend Status:</strong> {message}
        </div>
      </header>
      
      <main className="App-main">
        <section className="data-section">
          <h2>Data from Backend</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="data-list">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <div key={index} className="data-item">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <small>ID: {item.id}</small>
                  </div>
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
          )}
          
          <div className="add-item-form">
            <h3>Add New Item</h3>
            <div className="form-group">
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={newItem.title}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                placeholder="Enter description"
                value={newItem.description}
                onChange={handleInputChange}
                className="form-textarea"
                rows="3"
              />
            </div>
            <button onClick={addNewItem} className="add-button">
              Add New Item
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
