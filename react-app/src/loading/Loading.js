import React, { useState } from "react";
import { Modal } from "../context/Modal";
import { WaveLoading } from "react-loadingg";


function Loading() {
  const [showModal, setShowModal] = useState(false);

  return <WaveLoading />;
}

export default Loading
