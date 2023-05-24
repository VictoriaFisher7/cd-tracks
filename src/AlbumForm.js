import React, { useState } from 'react';
import saveImage from './images/save.png';
import './AlbumForm.css'
import axios from 'axios';

const AlbumForm = props => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [trackList, setTrackList] = useState('');
  //not working
  const [shouldShow, setShouldShow] = useState(true);

  const handleAlbumTitleChange = (event) => {
    setAlbumTitle(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  const handleTrackListChange = (event) => {
    setTrackList(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Extract the form data
    const formData = {
      title: albumTitle,
      artist: artist,
      songs: trackList.split(',').map((song) => song.trim()),
    };
  
    try {
      // Send a POST request
      const response = await axios.post('http://localhost:3001/cds', formData, {
  headers: {
    'Content-Type': 'application/json'
  }
});
    //refresh fist page with response here with reponse here 
    window.location.reload();
    console.log(response.data); // Handle the response
    console.log(JSON.stringify(formData))
      // Perform any additional actions or update the state if needed
    } catch (error) {
      console.error(error); // Handle the error
    }
  };
  

  if (!props.show){
    return null
}
  return (
    <div className='modal'>
        <div className='modal-content'>
      <h2 className='modal-header'>New Album</h2>
      <form className='modal-body' onSubmit={handleSubmit}>
        <div>
          <label>Album Name:</label>
          <input type="text" value={albumTitle} onChange={handleAlbumTitleChange} />
        </div>
        <div>
          <label>Artist Name</label>
          <input type="text" value={artist} onChange={handleArtistChange} />
        </div>
        <div>
          <label>Track List:</label>
          <textarea rows='5' cols='40' value={trackList} onChange={handleTrackListChange} />
          </div>
        <button className='save-button' type="submit"><div>
          <img src={saveImage} alt="Save Image" />
          </div>Save</button>
      </form>
      </div>
    </div>
  );
};

export default AlbumForm;
