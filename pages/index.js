import { useEffect, useState } from 'react';

export default function Home() {
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    console.log("Running useEffect...");

    fetch('/api/facts')
      .then((res) => {
        console.log("Got response from /api/facts:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched facts:", data);
        setFacts(data);
      })
      .catch((err) => {
        console.error("Error fetching facts:", err);
      });
  }, []);

  return (
    <div className="container">
      <h1>Discover Ecuador</h1>
      {facts.length === 0 ? (
        <p>No facts found</p>
      ) : (
        facts.map((fact) => (
          <div key={fact.id} className="fact">
            <h3>{fact.category}</h3>
            <p>{fact.fact}</p>
          </div>
        ))
      )}
    </div>
  );
}
