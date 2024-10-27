import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PageDetail() {
  const [pageData, setPageData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const module = await import(`../../public/data/page${id}.json`);
        setPageData(module.default);
      } catch (error) {
        console.error('Error loading page data:', error);
      }
    };

    loadPageData();
  }, [id]);

  if (!pageData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pageData.title}</h1>
      <p>{pageData.content}</p>
      <p>Date: {pageData.date}</p>
    </div>
  );
}

export default PageDetail;
