import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://axpvzlzmiabbnfumkteu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4cHZ6bHptaWFiYm5mdW1rdGV1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDMwMDY5NSwiZXhwIjoyMDI5ODc2Njk1fQ.GqIdeDIDe7aTb3IR9BAPlSqgCmcZJXmJnk5K7yOoLLI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ImageUploadForm = () => {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [continent, setContinent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('galeria')
        .upload(`images/${image.name}`, image);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return;
      }
      const url = supabase.storage
      .from('galeria')
      .getPublicUrl(`images/${image.name}`);

      const { data, error } = await supabase.from('gallery').insert([
        {
          title,
          country,
          continent,
          image_url: url.data.publicUrl,
        },
      ]);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        setTitle('');
        setCountry('');
        setContinent('');
        setImage(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nazwa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kraj"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kontynent"
        value={continent}
        onChange={(e) => setContinent(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploadForm;