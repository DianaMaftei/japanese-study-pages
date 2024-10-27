import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const loadPages = async () => {
      const context = require.context('../../public/data', false, /\.json$/);
      const pages = context.keys().map((key) => {
        // Extract the file name without extension
        const fileName = key.slice(2, -5);
        // Assuming the file name format is 'pageX.json' where X is the ID
        const id = fileName.replace('page', '');
        return { id, title: `Page ${id}` };
      });
      setPages(pages);
    };

    loadPages();
  }, []);

  return (
    <div>
      <h1>Available Pages</h1>
      <ul>
        {pages.map(page => (
          <li key={page.id}>
            <Link to={`/page/${page.id}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
