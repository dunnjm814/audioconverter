import './App.css';
import React, { useState } from "react";


function App() {
  const [videoData, setVideoData] = useState('')
const fileTypes = ["video/*"];
function validFileType(file) {
  return fileTypes.includes(file.type);
}
  const onSubmit = () => {

  }
  return (
    <div className="App">
      <h1>Video to mp3 converter</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="file-input" className='custom-file-input'>
          <input id="file-input" type="file" onChange={(e) => {

          }} accept="video/*"></input>
        </label>
      </form>
    </div>
  );
}

export default App;
