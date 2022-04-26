import merge from 'lodash/merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export async function objectMergeAsync(obj1, obj2) {
  return new Promise((resolve, reject) => {
    try {
      const mergedObj = merge(obj1, obj2);
      return resolve(mergedObj);
    } catch (error) {
      reject('Internal error - ERR-MERGEOBJ');
    }
  });
}

export function formatDate(date, withTime = true) {
  try {
    if (!withTime) return dayjs(date).format('DD/MM/YYYY');
    return dayjs(date).format('DD/MM/YYYY hh:mm A');
  } catch (error) {
    console.log('error formatting date', error.message);
    return 'Error formatting';
  }
}

export function fromDate(date) {
  try {
    return dayjs(date).fromNow();
  } catch (error) {
    console.log('error formatting date', error.message);
    return 'Error formatting';
  }
}

/**
 *
 * @param {Date} date
 */
export function isDateHoursAgo(date, hours) {
  return dayjs(new Date(date)).add(hours, 'hours').isBefore(dayjs(new Date()));
}

export function parseStringValueToFloat(value) {
  return parseFloat(value.replaceAll(',', ''), 10).toFixed(2);
}

export function isPast(date) {
  return dayjs(date).isBefore(new Date());
}

export function isBefore(date, tested_against_date) {
  return dayjs(date).isBefore(tested_against_date);
}
// $(urlfetch https://singularity-events-api.herokuapp.com/api/v1/events/sOww8rwqz-18cC8eHuA30/nightbot-scores)
export function generateNightbotCommand(url) {
  return `!addcom !standings $(urlfetch ${url})`;
}

export function normalize(string = '') {
  return string.toString().replace(/ /g, '').toLowerCase();
}

// React easy crop
const createImage = url =>
  new Promise((resolve, reject) => {
    try {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  mimetype
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  // As Canvas
  return canvas;

  // As Base64 string
  // return canvas.toDataURL(mimetype);

  // As a blob
  // return new Promise(resolve => {
  //   canvas.toBlob(async file => {
  //     console.log('blob resolve file: ', file);
  //     console.log('blob resolve mimetype: ', mimetype);
  //     console.log('blob resolve arrayBuffer: ', await file.arrayBuffer());
  //     resolve(file);
  //     // resolve(URL.createObjectURL(file));
  //     resolve(file);
  //   }, 'image/jpeg');
  // });
}

export function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export function blobToFile(theBlob, fileName, lastModifiedDate, mimetype) {
  return new File([theBlob], fileName, {
    lastModified: new Date(lastModifiedDate),
    type: mimetype,
  });
}

// To convert dataUrl (which we get from our blob) to a a file object
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) u8arr[n] = bstr.charCodeAt(n);

  return new File([u8arr], filename, { type: mime });
};
