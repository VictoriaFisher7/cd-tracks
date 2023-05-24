import logo from './logo.svg';
import addImage from './images/add.png';
import axios from 'axios';
import AlbumForm from './AlbumForm';
import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
const [show, setShow] = useState(false);
const [data, setData] = useState([]);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/cds');
    setData(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="App">
      <div>
      <h1 className='app-header'>Album List</h1>
      {data.length > 0 ? (
        <div className='app-body'>
          {data.map((album, index) => (
            <ul key={index}>
            <div className='title'>
              <strong>{album.title}</strong>
            </div>
            <div>
              {album.artist}
            </div>
            <ul>
              {album.songs.map((song, songIndex) => (
                <ul key={songIndex}>{song}</ul>
              ))}
            </ul>
          </ul>
          ))}
        </div>
      ) : (
        <p>No albums added yet.</p>
      )}
      </div>
    
      {/* imagne tag */}
      <button className='add-button' onClick={() => setShow(!show)}>
        <div>
          <img src={addImage} alt="Add Image" />
          </div>Add</button>
      <AlbumForm show={show} />
    </div>
  );
}

export default App;
