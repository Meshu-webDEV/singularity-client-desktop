import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import Header from '../../Components/layouts/Header';
import Button from '../../Components/actions/Button';
import MobileBaseLayout from '../../Components/layouts/MobileBaseLayout';
import ModalContext from '../../Context/Modal/ModalContext';
import LoadingWithDots from '../../Components/layouts/LoadingWithDots';
import { getCroppedImg } from '../../lib/utils';

const TestCrop = () => {
  //

  // State
  const [imageSrc, setImageSrc] = useState('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // Context
  const { offModal, setModal, setModalComponent, setModalProps, modalShow } =
    useContext(ModalContext);

  // handler
  const handleApplyCrop = useCallback(
    async src => {
      try {
        console.log(src);
        // TODO: THIS BITCH IS ALWAYS FUCKOIGN NULL
        const croppedImage = await getCroppedImg(src);
        console.log('done ', { croppedImage });
        setCroppedImage(croppedImage);
      } catch (e) {
        console.error(e);
      }
    },
    [imageSrc, croppedAreaPixels]
  );

  const handleFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);

      setModalComponent(
        <ImageCropModal
          src={imageDataUrl}
          setCroppedAreaPixels={setCroppedAreaPixels}
        />
      );
      setModalProps({
        variant: 'success',
        title: 'Avatar crop & resize',
        action: (
          <Button
            onClick={() => {
              console.log(imageSrc);
              handleApplyCrop(imageDataUrl);
            }}
            text='Apply & select'
            variant='success'
          />
        ),
        secondary: <Button onClick={offModal} text='Discard' textOnly />,
      });
      setModal('cropper');
    }
  };

  // Helpers
  function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  return (
    <MobileBaseLayout header={<Header />}>
      <div className='text-whites-light'>
        <label
          className={`relative ${
            false ? 'bg-secondary-light' : 'bg-dark-backgroundDarker '
          } w-full h-8 flex flex-col items-center justify-center rounded-md shadow-md tracking-wide uppercase ease-linear transition-all duration-150`}
        >
          <span className='flex space-x-1 justify-center items-center absolute transform z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs'>
            <span className='leading-none min-w-max'>
              {false ? 'Change logo' : 'Select a logo'}
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                clipRule='evenodd'
              />
            </svg>
          </span>
          <input
            className='group-hover:w-full text-xs  focus:ring-transparent rounded-lg  focus:ring-offset-transparent border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 opacity-0'
            type='file'
            onChange={handleFileChange}
            accept='.jpg,.jpeg,.png'
          />
        </label>
      </div>
    </MobileBaseLayout>
  );
};

export default TestCrop;

const ImageCropModal = ({ src, setCroppedAreaPixels }) => {
  //

  // State
  const [show, setShow] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Handlers
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShow(true);
    }, 600);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className='relative h-98'>
      {show ? (
        <>
          <div className='crop-container'>
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={8 / 8}
              cropShape='round'
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              disableAutomaticStylesInjection
            />
          </div>
          <div className='controls bg-dark-backgroundDarker w-full bg-opacity-30 shadow-md'>
            <div className='flex flex-grow space-x-4 justify-center items-center px-8'>
              <div className='text-xs text-whites-light italic uppercase'>
                Zoom
              </div>
              <Slider
                color='secondary'
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(e, zoom) => setZoom(zoom)}
                classes={{ root: 'slider' }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className='h-4/5 text-xs text-whites-dark flex-grow flex justify-center items-center'>
          <LoadingWithDots label='Loading' size='1.2rem' color='secondary' />
        </div>
      )}
    </div>
  );
};
