import './App.css';
import React, { useState } from "react";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";


function App() {
  const [videoData, setVideoData] = useState()
  const [hidden, setHidden] = useState(false)
  const [mp3, setMp3] = useState('')

  const fileTypes = ["video/*"];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  const onSubmit = async() => {
    const response = await fetch('/api/convert', {
      method: "POST",
      body: videoData
    })
    const converted = await response.json()
    setMp3(converted)
    console.log(mp3)

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
      <form className="submit-form">
        <div className="input-wrap">
          <label htmlFor="file-input" className="custom-file-input">
            <input
              id="file-input"
              type="file"
              onChange={(e) => {
                if (validFileType(e.target.files[0]) && e.target.files[0]) {
                  setVideoData(e.target.files[0]);
                } else {
                  error();
                }
              }}
              accept="video/*"
            ></input>
            <div className={errorClasses}>
              <p>This is not a video file,</p>
              <p>Please try again.</p>
            </div>
          </label>
        </div>
        <button id="upload" disabled={!videoData} onClick={onSubmit}>
          <AiOutlineUpload />
        </button>
      </form>
    </div>
  );
}

export default App;
