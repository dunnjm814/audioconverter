import React, { useState, useEffect } from "react";
import { Modal } from "../context/Modal";
import { WaveLoading } from "react-loadingg";
import {AiOutlineDownload } from "react-icons/ai";


function Loading({loading, setLoading, mp3, download}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(!showModal)
  }, [loading])

  return (
    <>
      {showModal && (
        <Modal onClose={() => {
          setLoading(false)

        }}>
          {mp3 ?
            (
          <a id="download" href={mp3} download={`${download}.mp3`}>
            <AiOutlineDownload />
          </a>
          )
          :  <WaveLoading />
          }
        </Modal>
      )}
    </>
  )
}

export default Loading
