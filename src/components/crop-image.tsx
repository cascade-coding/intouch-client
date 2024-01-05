import { RootState } from "@/app/store";
import { useRef, useState } from "react";

import ReactCrop, { convertToPixelCrop } from "react-image-crop";

import { type Crop } from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { updateCroppedImage } from "@/features/upload-post-slice";
import { canvasPreview } from "@/lib/canvasPreview";

const CropImage = () => {
  const dispatch = useDispatch();

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [crop, setCrop] = useState<Crop>();
  const { cropImage } = useSelector((state: RootState) => state.uploadPost);

  if (!cropImage) return;

  const handleCrop = () => {
    canvasPreview(
      imageRef.current as HTMLImageElement,
      canvasRef.current as HTMLCanvasElement,
      convertToPixelCrop(
        crop as Crop,
        imageRef.current?.width as number,
        canvasRef.current?.height as number
      )
    );
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL("image/png");
      dispatch(updateCroppedImage(dataUrl));
      setCrop(undefined);
    }
  };

  return (
    <div className="mt-4">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        minWidth={60}
        minHeight={60}
        keepSelection
      >
        <img src={cropImage} ref={imageRef} />
      </ReactCrop>

      <div>
        <Button size="sm" variant="ghost" className="mt-4" onClick={handleCrop}>
          Save Crop
        </Button>
      </div>

      {crop && <canvas ref={canvasRef} className="mt-4 hidden" />}
    </div>
  );
};

export default CropImage;
