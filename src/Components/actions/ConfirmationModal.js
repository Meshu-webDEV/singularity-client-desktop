import React from "react";
import { useContext } from "react";
import ModalContext from "../../Context/Modal/ModalContext";
import Hr from "../layouts/Hr";
import Button from "./Button";

const ConfirmationModal = ({
  title,
  description,
  confirm,
  cancel,
  confirmVariant = "success",
}) => {
  const { offModal } = useContext(ModalContext);

  const handleConfirm = () => {
    confirm();
    offModal();
  };

  const handleCancel = () => {
    offModal();
  };

  return (
    <div className="confirmation-wrapper text-whites-light flex flex-col space-y-6 py-4 px-8">
      <div className="confirmation-container px-1.5 text-xs flex flex-col justify-center items-center">
        <div className="confirmation-description flex flex-col space-y-2 justify-center items-center text-center">
          <span>{description}</span>
        </div>
        <Hr className="text-whites-dark opacity-10 w-9/12 self-center my-4" />
        <div className="confirmation-actions flex text-2xs items-center space-x-5">
          <Button
            className="text-whites-dark"
            text="Cancel"
            textOnly
            onClick={handleCancel}
          />
          <Button
            text="Confirm"
            variant={confirmVariant}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
