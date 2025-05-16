import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      overlayClassName={css.modalOverlay}
      className={css.modalContent}
    >
      {image && (
        <div>
          <img src={image.fullSrc} alt={image.alt} />
        </div>
      )}
    </Modal>
  );
}
