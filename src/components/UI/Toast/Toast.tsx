import { observer } from "mobx-react-lite";
import { createPortal } from "react-dom";
import "./Toast.scss";
import store from "../../../store/game-store";
import DomConstant from "../../../constants/dom.constants";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

const Toast = observer(() => {
  const ref = useRef();

  const toast = (
    <CSSTransition
      in={store.showToast}
      timeout={store.toastTimeoutInMs}
      classNames="slide"
      mountOnEnter
      unmountOnExit
      nodeRef={ref}
    >
      <div ref={ref} className="toast">
        <div className="toast-content">
          <p>{store.toastMessage}</p>
        </div>
      </div>
    </CSSTransition>
  );

  return (
    <>
      {createPortal(
        toast,
        document.getElementById(DomConstant.toastElement) as HTMLElement
      )}
    </>
  );
});

export default Toast;
