import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE_URL = "https://sports-app-api-rvy4.onrender.com";

function App() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/streams`)
      .then((res) => res.json())
      .then((data) => {
        setStreams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching streams:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh' }}>
      <h1>🏆 Sports Streaming Hub</h1>
      <p>Live portfolio demo powered by FastAPI & React</p>

      {loading ? (
        <p>Loading streams from live backend...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          {streams.map((stream) => (
            <div key={stream.id} style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#1e293b' }}>
              <h3>{stream.title}</h3>
              <p>Category: <strong>{stream.category}</strong></p>
              {stream.is_premium ? (
                <button style={{ backgroundColor: '#f59e0b', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Unlock Stream ($4.99)
                </button>
              ) : (
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Free Stream</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;