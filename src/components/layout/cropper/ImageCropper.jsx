import * as React from 'react';
import { Box, Button, Slider, TextField, Typography } from '@mui/material';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../utils/canvaUtils';
import readFile from '../../../utils/ReadFile';

const ImageCropper = ({ setSelectedImages, selectedImages }) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };
  const showCroppedImage = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      setSelectedImages([...selectedImages, croppedImageUrl]);
      setImageSrc(null);
    } catch (e) {
      console.error(e);
    }
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <>
      {imageSrc ? (
        <Box padding={10} border={2}>
          <Box position={'relative'} height={400} sx={{ width: '100%' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={3 / 4}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography>Zoom</Typography>
            <Slider value={zoom} min={1} max={3} step={0.1} aria-labelledby="Zoom" onChange={(e, zoom) => setZoom(zoom)} />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Button variant="contained" color="primary" onClick={() => setImageSrc(null)}>
                Cancel
              </Button>
              <Button variant="contained" color="secondary" onClick={() => showCroppedImage()}>
                Cropp and add
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <TextField name="upload-photo" type="file" margin="normal" fullWidth onChange={onFileChange}></TextField>
      )}
    </>
  );
};

export default ImageCropper;
