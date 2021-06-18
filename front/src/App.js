import "./App.css";
import React, { useState, useEffect } from "react";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";

function App() {
  const [videoData, setVideoData] = useState();
  const [hidden, setHidden] = useState(false);
  const [mp3, setMp3] = useState("");
  const [download, setDownload] = useState("");

  const fileTypes = ["video/*", "video/mp4"];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  function removeExt(fileName) {
    return fileName?.slice(0, fileName?.indexOf("."));
  }

  useEffect(() => {
    let downloadName = removeExt(videoData?.name)
    setDownload(downloadName)
  }, [videoData])

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
        const reader = body.getReader();
        let flaskMP3stream = new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                return pump();
              });
            }
          }
        });
        return flaskMP3stream
      })
      .then(stream => new Response(stream))
      .then((response) => response.blob())
      .then(blob => {
        let urlCreate = window.URL || window.webkitURL;
        const url = urlCreate.createObjectURL(blob)
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
  const inputText = videoData ? videoData.name : "Please select a video file";
  return (
    <>
      <div className="App">
        <h1>Video to mp3 converter</h1>
        <form className="submit-form">
          <div className="input-wrap">
            <label htmlFor="file-input" className="custom-file-input">
              {inputText}
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
      <div className="download">
        {mp3 && (
          <a id="download" href={mp3} download={`${download}.mp3`}>
            <AiOutlineDownload />
          </a>
        )}
      </div>
    </>
  );
}

export default App;
