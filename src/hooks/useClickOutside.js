import { useEffect } from "react";

const useClickOutside = (ref, handler) => {
     useEffect(() => {
          const listener = (event) => {
               // if user clicks inside the ref element, do nothing
               if (!ref.current || ref.current.contains(event.target)) {
                    return;
               }
               // if user clicks outside the ref element, call the handler
               handler();
          };

          document.addEventListener("mousedown", listener);
          document.addEventListener("touchstart", listener);

          return () => {
               document.removeEventListener("mousedown", listener);
               document.removeEventListener("touchstart", listener);
          };
     }, [ref, handler]);
};

export default useClickOutside;
