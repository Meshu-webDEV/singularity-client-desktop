import { useContext } from "react";

// MUI
import { Dialog, Fade, Modal, Slide, ThemeProvider } from "@material-ui/core";

// Context
import ModalContext from "../Context/Modal/ModalContext";
import Button from "../Components/actions/Button";
import { dialogTheme } from "../lib/muiThemes";
import LogoBR from "../Images/LogoBR";

const AppModal = () => {
  const { modalShow, offModal, component, size, modalProps } =
    useContext(ModalContext);

  // Helper
  const determineBorderBasedOnVariant = () => {
    if (typeof modalProps === "undefined") return "border-grays-light";
    if (modalProps.variant === "success") return "border-secondary-dark";
    if (modalProps.variant === "info") return "border-info";
    if (modalProps.variant === "warning") return "border-warning";
    if (modalProps.variant === "error") return "border-primary-light";
    if (modalProps.variant === "light") return "border-grays-light";
    if (modalProps.variant === "dark") return "border-blacks-dark";
    return "border-grays-light";
  };

  if (size === "content")
    return (
      <ThemeProvider theme={dialogTheme}>
        <Dialog
          className="top-10 relative flex flex-col justify-center items-center"
          open={modalShow}
          onClose={offModal}
        >
          <Fade in={modalShow}>
            <>
              <div className="mui-dialog-child self-center w-full relative flex flex-col flex-grow rounded-tr-md rounded-b-md shadow-2xl bg-dark-background">
                <div
                  className={`text-xs w-full py-2 px-2.5 border-l-4 ${determineBorderBasedOnVariant()} text-whites-light rounded-tr-md bg-dark-backgroundDark flex justify-between items-center`}
                >
                  <span className="uppercase">
                    {modalProps?.title || (
                      <span className="flex items-center space-x-2">
                        <LogoBR w={22} h={22} /> <span>Singularity</span>
                      </span>
                    )}
                  </span>
                  <Button
                    onClick={offModal}
                    iconOnly
                    variant="light"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  />
                </div>
                <div
                  className={`modal-component-wrapper h-full w-auto flex-grow py-2.5 ${
                    modalProps.scrollable && "overflow-y-scroll"
                  }`}
                >
                  <div className="modal-component h-full px-2">{component}</div>
                </div>
                {modalProps?.secondary && modalProps?.action && (
                  <div className="modal-actions relative text-xs w-full pt-3 pb-8 px-3 text-whites-light space-x-2.5 rounded-tr-md font-light flex justify-end items-end">
                    {modalProps?.secondary ? modalProps.secondary : null}
                    {modalProps?.action ? modalProps.action : null}
                  </div>
                )}
              </div>
            </>
          </Fade>
        </Dialog>
      </ThemeProvider>
    );

  if (size === "cropper")
    return (
      <ThemeProvider theme={dialogTheme}>
        <Dialog
          className="top-10 relative flex flex-col justify-center items-center"
          open={modalShow}
          onClose={offModal}
        >
          <Fade in={modalShow}>
            <>
              <div className="max-hight-650 w-full relative flex flex-col flex-grow rounded-tr-md rounded-b-md shadow-2xl bg-dark-background">
                <div
                  className={`text-xs w-full py-2 px-2.5 border-l-4 ${determineBorderBasedOnVariant()} text-whites-light rounded-tr-md bg-dark-backgroundDark flex justify-between items-center`}
                >
                  <span className="uppercase">
                    {modalProps?.title || (
                      <span className="flex items-center space-x-2">
                        <LogoBR w={22} h={22} /> <span>Singularity</span>
                      </span>
                    )}
                  </span>
                  <Button
                    onClick={offModal}
                    iconOnly
                    variant="light"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  />
                </div>
                <div className="h-full flex-grow overflow-y-scroll overflow-x-hidden">
                  <div className="h-full flex-grow overflow-y-scroll overflow-x-hidden">
                    {component}
                  </div>
                </div>
                <div className="relative text-xs w-full py-3 px-3 text-whites-light space-x-2.5 rounded-tr-md font-light flex justify-end items-end">
                  {modalProps?.secondary ? modalProps.secondary : null}
                  {modalProps?.action ? modalProps.action : null}
                </div>
              </div>
            </>
          </Fade>
        </Dialog>
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={dialogTheme}>
      <Dialog
        className="top-10 relative flex flex-col justify-center items-center"
        open={modalShow}
        onClose={offModal}
      >
        <Fade in={modalShow}>
          <>
            <div className="mui-dialog-child self-center w-full relative flex flex-col flex-grow rounded-tr-md rounded-b-md shadow-2xl bg-dark-background">
              <div
                className={`text-xs w-full py-2 px-2.5 border-l-4 ${determineBorderBasedOnVariant()} text-whites-light rounded-tr-md bg-dark-backgroundDark flex justify-between items-center`}
              >
                <span className="uppercase">
                  {modalProps?.title || (
                    <span className="flex items-center space-x-2">
                      <LogoBR w={22} h={22} /> <span>Singularity</span>
                    </span>
                  )}
                </span>
                <Button
                  onClick={offModal}
                  iconOnly
                  variant="light"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              </div>
              <div
                className={`modal-component-wrapper h-full w-auto flex-grow py-2.5 ${
                  modalProps.scrollable && "overflow-y-scroll"
                }`}
              >
                <div className="modal-component h-full px-2">{component}</div>
              </div>
              {modalProps?.secondary && modalProps?.action && (
                <div className="modal-actions relative text-xs w-full pt-3 pb-8 px-3 text-whites-light space-x-2.5 rounded-tr-md font-light flex justify-end items-end">
                  {modalProps?.secondary ? modalProps.secondary : null}
                  {modalProps?.action ? modalProps.action : null}
                </div>
              )}
            </div>
          </>
        </Fade>
      </Dialog>
    </ThemeProvider>
  );
};

export default AppModal;
