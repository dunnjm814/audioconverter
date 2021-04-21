import './App.css';
import React, { useState } from "react";


function App() {
  const [videoData, setVideoData] = useState('')
  const [hidden, setHidden] = useState(false)

  const fileTypes = ["video/*"];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  const onSubmit = () => {

  }

  const error = () => {
    setTimeout(() => {
      setHidden(prev => !prev)
    }, 5000)
    setHidden(prev => !prev)
  }
  const errorClasses = hidden ? "error-box hidden" : "error-box"
  return (
    <div className="App">
      <h1>Video to mp3 converter</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="file-input" className='custom-file-input'>
          <input id="file-input" type="file" onChange={(e) => {
            if (validFileType(e.target.files[0])) {
              setVideoData(e.target.files[0]);
            } else {
              error()
            }
          }} accept="video/*"></input>
          <div className={errorClasses}>
            <p>This is not a video file,</p>
            <p>Please try again.</p>
          </div>
        </label>
      </form>
    </div>
  );
}

export default App;
