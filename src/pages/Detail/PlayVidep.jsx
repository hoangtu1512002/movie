import { useRef } from "react";
import Modal, { ModalContent } from "../../components/layout/modal/Modal";

function PlayVideo(props) {
  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${props.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="400px"
          title="trailer"
          id="trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </ModalContent>
    </Modal>
  );
}

export default PlayVideo;
