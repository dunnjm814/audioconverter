import React, { useState, useEffect } from "react";
import { Modal } from "../context/Modal";
import { WaveLoading } from "react-loadingg";
import {AiOutlineDownload } from "react-icons/ai";


function Loading({loading, setLoading, mp3, download}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(s => !s)
  }, [loading])

  return (
    <>
      {showModal && (
        <Modal
          onClose={() => {
            setLoading(false);
          }}
        >
          {mp3 ? (
            <div id="download-wrap">
              <a id="download" href={mp3} download={`${download}.mp3`}>
                <AiOutlineDownload />
              </a>
              <span id="download-text" className="convert-text">
                Download your MP3
              </span>
            </div>
          ) : (
            <span id="download">
              <WaveLoading />
            </span>
          )}
        </Modal>
      )}
    </>
  );
}

export default Loading
