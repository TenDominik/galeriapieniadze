import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://axpvzlzmiabbnfumkteu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4cHZ6bHptaWFiYm5mdW1rdGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMDA2OTUsImV4cCI6MjAyOTg3NjY5NX0.qAtqh1j5jqtfXbVnIaEh2lFd5SHQVBCmKS_cqRme5U4'; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const GalleryDisplay = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [error, setError] = useState(null);
  const [searchCountry, setSearchCountry] = useState('');
  const [searchContinent, setSearchContinent] = useState('');

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        let { data, error } = await supabase
          .from('gallery')
          .select('*');

        if (error) {
          throw error;
        }

        setGalleryItems(data || []);
      } catch (error) {
        console.error('Error fetching gallery items:', error.message);
        setError('Error fetching gallery items. Please try again later.');
      }
    };

    fetchGalleryItems();
  }, []);

  const handleSearchCountry = async () => {
    try {
      let { data, error } = await supabase
        .from('gallery')
        .select('*')
        .ilike('country', `%${searchCountry}%`);

      if (error) {
        throw error;
      }

      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error searching by country:', error.message);
      setError('Error searching by country. Please try again later.');
    }
  };

  const handleSearchContinent = async () => {
    try {
      let { data, error } = await supabase
        .from('gallery')
        .select('*')
        .ilike('continent', `%${searchContinent}%`);

      if (error) {
        throw error;
      }

      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error searching by continent:', error.message);
      setError('Error searching by continent. Please try again later.');
    }
  };

  return (
    <div className="gallery-container">
      <div className='search-box'>
        <div className="search-container">
          <input
            type="text"
            placeholder="Kraj"
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
          />
          <button onClick={handleSearchCountry}>Sortuj</button>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Kontynent"
            value={searchContinent}
            onChange={(e) => setSearchContinent(e.target.value)}
          />
          <button onClick={handleSearchContinent}>Sortuj</button>
        </div>
      </div>
      <div className="gallery">
        {error ? (
          <p>{error}</p>
        ) : galleryItems.length > 0 ? (
          galleryItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <img src={item.image_url} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.country}, {item.continent}</p>
            </div>
          ))
        ) : (
          <p>Brak danych</p>
        )}
      </div>
    </div>
  );
};

export default GalleryDisplay;
