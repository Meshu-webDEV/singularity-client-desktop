import { useContext, useEffect, useState } from "react";
import SlideAnimation from "../Animations/SlideAnimation";
import ToastContext from "../Context/Toast/ToastContext";

const Toast = () => {
  const { offToast, show, message, variant } = useContext(ToastContext);

  const [slide, setSlide] = useState(false);

  const getMessageWidth = (m) => {
    if (!m) return "w-10/12";

    if (m instanceof Array) return "w-10/12";

    if (m.length > 35) return "w-1/1.1";
    if (m.length > 30) return "w-80";
    if (m.length > 25) return "w-72";
    if (m.length > 20) return "w-60";
    if (m.length > 15) return "w-52";
    if (m.length > 10) return "w-40";
    if (m.length > 5) return "w-28";

    return "w-20";
  };

  useEffect(() => {
    setSlide((prev) => !prev);
  }, [show]);

  const determineVariantClasses = () => {
    if (variant === "error") return "text-whites-light bg-primary-light";
    if (variant === "warning") return "text-blacks-dark bg-warning";
    if (variant === "info") return "text-whites-light bg-info";
    if (variant === "success")
      return "text-blacks-dark bg-gradient-to-br from-secondary-light to-success";
  };

  const renderMessage = () => {
    //if string
    if (message instanceof String || typeof message === "string")
      return message;

    if (message instanceof Array) {
      return message
        .map(
          (message, index) => `<p className='my-0.5' key={index}>${message}</p>`
        )
        .toString()
        .replace(/,/g, "");
    }

    return "Internal error - please try again later or contact us";
  };

  return (
    <SlideAnimation slideIn={show} direction="left" timeout={150}>
      <div
        //prettier-ignore
        className={`fixed top-11 shadow-2xl right-5 ${determineVariantClasses()} max-w-xl max-h-full justify-between flex items-center px-2 py-0.5`}
        style={{ zIndex: 1350, minWidth: "340px" }}
      >
        <div
          className="text-xs tracking-tight px-2 py-1 break-words w-11/12"
          dangerouslySetInnerHTML={{
            __html: renderMessage(),
          }}
        ></div>
        <div className="flex justify-around items-center space-x-1">
          <span className="opacity-60 font-light">|</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => {
              offToast();
            }}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </SlideAnimation>
  );
};

export default Toast;
