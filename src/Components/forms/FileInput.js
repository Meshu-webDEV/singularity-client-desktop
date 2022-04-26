import { useField, useFormikContext } from "formik";
import { useContext, useEffect, useState } from "react";
import ModalContext from "../../Context/Modal/ModalContext";

import Button from "../actions/Button";

const FileInput = ({
  size = "full",
  bg = "bg-dark-background",
  noLabel = false,
  label,
  secondaryLabel,
  className,
  name,
  selectedFile,
  onChange,
  onFocus,
  ...props
}) => {
  const [field, meta] = useField({ ...props, name: name });

  const [preview, setPreview] = useState(null);
  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  const handlePreview = () => {
    setModalComponent(<FilePreview src={preview} alt={selectedFile?.name} />);
    setModalProps({
      variant: "success",
      title: "Logo preview",
      action: (
        <Button
          text="Close"
          variant="light"
          className="text-xs"
          onClick={offModal}
        />
      ),
      secondary: null,
    });
    setModal("full");
  };

  useEffect(() => {
    if (!selectedFile) return;

    const ObjUrl = URL.createObjectURL(selectedFile);
    setPreview(ObjUrl);

    return () => URL.revokeObjectURL(ObjUrl);
  }, [selectedFile]);

  return (
    <div
      className={`w-full flex flex-col flex-grow text-whites-light space-y-1.5 ${className}`}
    >
      <div className="w-full flex items-center">
        <label
          className="pl-1 text-xs  capitalize"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        <span className="text-2xs font-light tracking-tight opacity-60 p-1">
          {secondaryLabel}
        </span>
      </div>
      <label
        className={`relative ${
          selectedFile ? "bg-secondary-light" : "bg-dark-backgroundDarker "
        } w-full h-8 flex flex-col items-center justify-center rounded-md shadow-md tracking-wide uppercase ease-linear transition-all duration-150`}
      >
        <span className="flex space-x-1 justify-center items-center absolute transform z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs">
          <span className="leading-none min-w-max">
            {selectedFile ? "Change logo" : "Select a logo"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input
          className={`w-full text-xs  focus:ring-transparent rounded-lg  focus:ring-offset-transparent border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 ${bg} opacity-0`}
          type="file"
          name={name}
          onChange={onChange}
          onBlur={onFocus}
          {...props}
        />
      </label>

      {meta.touched && meta.error ? (
        <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
      ) : (
        <div className="flex justify-between items-center text-2xs pl-1 italic text-whites-dark tracking-wide">
          <div>
            {selectedFile?.name ? (
              <span className="font-medium">
                {selectedFile?.name}
                <span className="font-light opacity-80"> selected</span>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileInput;

const FilePreview = ({ src, alt }) => {
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
};
