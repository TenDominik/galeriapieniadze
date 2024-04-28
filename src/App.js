import React from 'react';
import ImageUploadForm from './upload';
import GalleryDisplay from './display';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <ImageUploadForm />
      <h2>Galeria</h2>
      <GalleryDisplay />
    </div>
  );
};

export default App;