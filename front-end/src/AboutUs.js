import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_SERVER_HOSTNAME || "http://localhost:5002";

function AboutUs() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/about`)
      .then((res) => setData(res.data))
      .catch(() => setError("Error loading About Us content."));
  }, []);

  if (error) return <div style={{ padding: 20 }}>{error}</div>;
  if (!data) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20, textAlign: "center" }}>
      <h1>About Us</h1>
      <img
        src={data.imageUrl}
        alt={data.name}
        style={{ width: 220, height: 220, borderRadius: "50%", objectFit: "cover" }}
      />
      <h2>{data.name}</h2>
      <p><em>{data.title}</em></p>
      {data.paragraphs.map((para, index) => (
        <p key={index} style={{ textAlign: "left" }}>{para}</p>
      ))}
    </div>
  );
}

export default AboutUs;
