import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import Header from "../layouts/Header";
import Button from "../actions/Button";
import MobileBaseLayout from "../layouts/MobileBaseLayout";
import ModalContext from "../../Context/Modal/ModalContext";
import LoadingWithDots from "../layouts/LoadingWithDots";
import { getCroppedImg, readFile } from "../../lib/utils";
import Hr from "../layouts/Hr";
import { useField, useFormikContext } from "formik";
import FileInput from "./FileInput";
import { organizationAvatarSchema } from "../../lib/validation";

const AvatarInput = ({
  setHasSelectedFile,
  handleImageSelected,
  setPixelCrop,
  name,
  ...props
}) => {
  //

  const [field, meta] = useField({ ...props, name: name });

  // State
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // Context
  const { setFieldTouched, setFieldValue, values, setFieldError } =
    useFormikContext();

  const { offModal, setModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  // handler
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setPixelCrop(croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      setModalProps({
        title: "Cropped avatar preview",
        variant: "success",
        action: null,
        secondary: (
          <Button
            disabled
            text={
              <LoadingWithDots
                label="Loading"
                size="0.6rem"
                flow="row"
                color="inherit"
              />
            }
            variant="dark"
            textOnly
          />
        ),
      });
      setModalComponent(<CroppedPreview loading />);
      setModal("full");
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setModalProps({
        title: "Cropped avatar preview",
        variant: "success",
        action: <Button onClick={offModal} text="Close" variant="dark" />,
        secondary: null,
      });
      setModalComponent(<CroppedPreview src={croppedImage} />);
      setModal("cropper");
      setCroppedImage(croppedImage);

      // Show preview modal
      setModalComponent(<CroppedPreview src={croppedImage} />);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const onFileChange = async (e) => {
    if (!e.target.files || !e.target.files.length) return;

    const file = e.target.files[0];
    try {
      await organizationAvatarSchema.validate(file);
      let imageDataUrl = await readFile(file);
      setFieldValue(name, file);
      setImageSrc(imageDataUrl);
      setHasSelectedFile(true);
    } catch (error) {
      setFieldError(name, `${error ? error : "Invalid image"}`);
      setFieldValue(name, undefined);
      setImageSrc(null);
      setHasSelectedFile(false);
    }
  };

  const onFileBlur = () => {
    setFieldTouched(name, true, true);
  };

  return (
    <div className="text-whites-light flex flex-col space-y-10">
      <div>
        <label
          className={`relative ${
            imageSrc ? "bg-secondary-light" : "bg-dark-backgroundDarker "
          } w-full h-8 flex flex-col items-center justify-center rounded-md shadow-md tracking-wide uppercase ease-linear transition-all duration-150`}
        >
          <span className="flex space-x-1 justify-center items-center absolute transform z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs">
            <span className="leading-none min-w-max">
              {imageSrc ? "Change logo" : "Select a logo"}
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
            className={`w-full text-xs  focus:ring-transparent rounded-lg  focus:ring-offset-transparent border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 opacity-0`}
            type="file"
            accept=".jpg,.jpeg,.png"
            name={name}
            onChange={onFileChange}
            onBlur={onFileBlur}
            {...props}
          />
        </label>

        {meta.touched && meta.error ? (
          <div className="text-2xs pt-2 pl-1 text-primary-dark">
            {meta.error}
          </div>
        ) : (
          <div className="flex justify-between items-center text-2xs pl-1 italic text-whites-dark tracking-wide">
            <div>
              {values?.avatar?.name ? (
                <div className="font-medium pt-2">
                  {values?.avatar?.name}
                  <span className="font-light opacity-80"> selected</span>
                </div>
              ) : (
                <div className="font-sans text-3xs pt-1 text-whites-dark italic">
                  .jpg / .jpeg / .png
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {imageSrc && (
        <div className="relative flex flex-col space-y-6">
          <div className="uppercase text-sm font-medium tracking-wide">
            Avatar crop & resize
          </div>
          <div className="cropper relative h-96 flex flex-col space-y-6">
            <div className="crop-container">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 4}
                showGrid={false}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="controllers absolute transform bottom-0 left-1/2 min-w-full translate-y-10 -translate-x-1/2 h-16 px-2 pt-2.5 shadow-md">
              <div className="relative w-full h-full ">
                <div className="w-full shadow-md absolute inset-0 text-whites-light">
                  <div className="flex flex-grow space-x-4 justify-center items-center px-8">
                    <div className="text-xs italic uppercase">Zoom</div>
                    <Slider
                      color="secondary"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoom) => setZoom(zoom)}
                      classes={{ root: "slider" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute transform top-full translate-y-6 right-2">
            <Button
              onClick={showCroppedImage}
              className="border border-dark-backgroundDark border-opacity-25 self-end text-2xs"
              text="Preview avatar"
              variant="light"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarInput;

const CroppedPreview = ({ src, loading }) => {
  if (loading)
    return (
      <div className="flex flex-col h-64 text-whites-dark text-xs uppercase tracking-wider font-light justify-center items-center">
        <LoadingWithDots label="Loading" size="1rem" color="secondary" />
      </div>
    );

  return (
    <div className="relative h-full flex flex-col justify-center items-center py-8 px-4 shadow-inner">
      <div className="flex justify-center items-center bg-blacks-dark bg-opacity-40 filter brightness-75 shadow-lg rounded-full">
        <img
          className="object-cover rounded-full antialiased p-2 transform"
          src={src.toDataURL()}
          alt="Organization logo"
        />
      </div>
      <Hr className="text-whites-dark opacity-10 mt-10 self-center w-7/12" />
    </div>
  );
};
