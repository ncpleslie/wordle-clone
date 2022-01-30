import { observer } from "mobx-react-lite";
import { createPortal } from "react-dom";
import "./Modal.scss";
import store from "../../../store/game-store";
import DomConstant from "../../../constants/dom.constants";

const Modal = observer(() => {
  const modal = (
    <div className="modal">
      <div className="modal-content">
        <p>{store.modalMessage}</p>
      </div>
    </div>
  );
  if (!store.showModal) {
    return <></>;
  }

  return (
    <>
      {createPortal(
        modal,
        document.getElementById(DomConstant.modalElement) as HTMLElement
      )}
    </>
  );
});

export default Modal;
