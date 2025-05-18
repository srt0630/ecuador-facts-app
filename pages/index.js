import { useEffect, useState } from 'react';

export default function Home() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/facts')
      .then((res) => res.json())
      .then((data) => {
        setFacts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading facts...</p>;

  const filteredFacts = facts.filter(fact =>
    fact.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Discover Ecuador 🇪🇨</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '70%',
            marginRight: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
        <button
          onClick={() => setSearch('')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#2f4858',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Clear
        </button>
      </div>

      <p>
        Showing {filteredFacts.length} fact{filteredFacts.length !== 1 ? 's' : ''}
      </p>

      {filteredFacts.length > 0 ? (
        filteredFacts.map((fact) => (
          <div key={fact.id} className="fact">
            <h3>{fact.category}</h3>
            <p>{fact.fact}</p>
          </div>
        ))
      ) : (
        <p>No facts found for "{search}"</p>
      )}
    </div>
  );
}
