import { FC } from "react";
import { createPortal } from "react-dom";
import useCreateDomElementForPortal from "../../../hooks/dom-element-for-portal.hook";

const Portal: FC<{ id: string; force?: boolean }> = ({
  children,
  id,
  force,
}) => {
  if (force) {
    const isLoaded = useCreateDomElementForPortal(id);

    if (!isLoaded) {
      return <></>;
    }
  }

  return (
    <>{createPortal(children, document.getElementById(id) as HTMLElement)}</>
  );
};

export default Portal;
