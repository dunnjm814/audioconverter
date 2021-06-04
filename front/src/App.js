import './App.css';
import React, { useState } from "react";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";



function App() {
  const [videoData, setVideoData] = useState()
  const [hidden, setHidden] = useState(false)
  const [mp3, setMp3] = useState('')

  const fileTypes = ["video/*", "video/mp4"];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    console.log('hopefully the mp4', videoData)
    data.append('mp3', videoData)
    console.log('hopefully a form object with mp4', data)
    fetch('/api/convert', {
      method: "POST",
      body: data
    }).then(response =>{ return response.body})
      .then(body => {
        console.log(body)
        const reader = body.getReader()
        console.log(reader)
        return reader.read()
      })
      .then(file => {
        console.log({file})
        let blob = new Blob([file], { type: 'audio/mp3' })
        console.log(blob)
        // let song = new Response(blob).text()
        // console.log(song)
        let track = new File([blob], 'your-track')
        console.log(track)
        setMp3(track)
      })
      .catch(err => {
        console.error(err)
        window.alert("something went wrong :(");
      })
  }

  const error = () => {
    setTimeout(() => {
      setHidden(prev => !prev)
    }, 5000)
    setHidden(prev => !prev)
  }
  const errorClasses = hidden ? "error-box hidden" : "error-box"
  return (
    <>
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
      <div className='divs'>
    {mp3 ? <a id='download' href={mp3} download='your-file.mp3'>
        <AiOutlineDownload />
        </a>
      :
      null}
      </div>
    </>
  );
}

export default App;
