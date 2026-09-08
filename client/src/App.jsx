import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE_URL = "https://sports-app-api-rvy4.onrender.com";

function App() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check for success or canceled status in URL query string
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("🎉 Payment successful! You now have full access to premium streams.");
    }
    if (query.get("canceled")) {
      setMessage("⚠️ Payment canceled. You can try again whenever you are ready.");
    }

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

  const handleCheckout = async (stream) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stream_id: stream.id,
          stream_title: stream.title,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to initialize payment session.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error redirecting to checkout.");
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh' }}>
      <h1>🏆 Sports Streaming Hub</h1>
      <p>Live portfolio demo powered by FastAPI, React & Stripe</p>

      {message && (
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#60a5fa' }}>
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading streams from live backend...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          {streams.map((stream) => (
            <div key={stream.id} style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#1e293b' }}>
              <h3>{stream.title}</h3>
              <p>Category: <strong>{stream.category}</strong></p>
              {stream.is_premium ? (
                <button 
                  onClick={() => handleCheckout(stream)}
                  style={{ backgroundColor: '#f59e0b', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
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