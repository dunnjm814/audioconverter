import "./App.css";
import React, { useState } from "react";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";

function App() {
  const [videoData, setVideoData] = useState();
  const [hidden, setHidden] = useState(false);
  const [mp3, setMp3] = useState("");

  const fileTypes = ["video/*", "video/mp4"];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("mp3", videoData);
    fetch("/api/convert", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        return response.body;
      })
      .then((body) => {
        console.log(body); // this is the readableStream resolved from flask
        const reader = body.getReader();
        // return reader.read()
        let flaskMP3stream = new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              let readStream = reader.read().then(({ done, value }) => {
                console.log('done', done)
                console.log('value', value)
                if (done) {
                  console.log('controller?', controller)
                  controller.close();
                  return;
                }
                console.log('controller value', value)
                controller.enqueue(value);
                return pump();
              });
              console.log('readStream in finshed pump?', readStream)
              return readStream
            }
          }
        });
        console.log('flask mp3 stream post pump', flaskMP3stream)
        return flaskMP3stream
      })
      .then(stream => {
        console.log({ stream });
        return new Response(stream);
      })
      .then((response) => {
        console.log('stream as response object', response);
        console.log('body of response object', response.body)
        // let blob = new Blob([response], { type: "audio/mp3" });
        let blob = response.blob()
        console.log(blob);
        return blob
      })
      .then(blob => {
        let urlCreate = window.URL || window.webkitURL;
        const url = urlCreate.createObjectURL(blob)
        console.log({ url })
        setMp3(url)
      })
      .catch((err) => {
        console.error(err);
        window.alert("something went wrong :(");
      });
  };

  const error = () => {
    setTimeout(() => {
      setHidden((prev) => !prev);
    }, 5000);
    setHidden((prev) => !prev);
  };
  const errorClasses = hidden ? "error-box hidden" : "error-box";
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
      <div className="divs">
        {mp3 ? (
          <a id="download" href={mp3} download="your-file.mp3">
            <AiOutlineDownload />
          </a>
        ) : null}
      </div>
    </>
  );
}

export default App;
