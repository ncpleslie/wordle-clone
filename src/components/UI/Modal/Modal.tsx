import { useNavigate } from "react-router-dom";
import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import DomConstant from "../../../constants/dom.constants";
import useCreateDomElementForPortal from "../../../hooks/dom-element-for-portal.hook";
import CloseIcon from "../Icon/CloseIcon";
import ModalProps from "../../../props/modal.props";
import Portal from "../Portal/Portal";

const Modal: FC<ModalProps> = (props) => {
  const navigate = useNavigate();

  const handleOnCloseClicked = () => {
    navigate(-1);
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const modal = (
    <div
      onClick={handleOnCloseClicked}
      className="absolute inset-0 bg-black bg-opacity-75 w-full h-screen z-10 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="bg-gray-200 drop-shadow rounded text-center w-full">
          <div className="grid grid-cols-3 items-center p-2">
            <h2 className="font-bold col-start-2">{props.title}</h2>
            <div
              onClick={handleOnCloseClicked}
              className="cursor-pointer  ml-auto"
            >
              <CloseIcon />
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );

  return (
    <Portal id={DomConstant.modalElement} force>
      {modal}
    </Portal>
  );
};

export default Modal;
