import { useState, useLayoutEffect, useEffect } from "react";

/**
 * A hook to handle the creation and then deletion of a DOM element.
 * To be used in conjunction with the portal method.
 * @param elementId The id of the element to create.
 * @returns A boolean if the DOM element has been loaded.
 */
const useCreateDomElementForPortal = (elementId: string): boolean => {
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    if (isLoaded) {
      return;
    }

    const root = document.createElement("div");
    root.setAttribute("id", elementId);
    document.body.prepend(root);
    setIsLoaded(true);
  });

  useEffect(() => {
    return () => {
      document.getElementById(elementId)?.remove();
    };
  }, []);

  return isLoaded;
};

export default useCreateDomElementForPortal;
