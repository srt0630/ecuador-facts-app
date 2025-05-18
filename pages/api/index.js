import { useEffect, useState } from 'react';

export default function Home() {
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    fetch('/api/facts')
      .then((res) => res.json())
      .then(setFacts);
  }, []);

  return (
    <div className="container">
      <h1>Discover Ecuador</h1>
      {facts.map((fact) => (
        <div key={fact.id} className="fact">
          <h3>{fact.category}</h3>
          <p>{fact.fact}</p>
        </div>
      ))}
    </div>
  );
}
