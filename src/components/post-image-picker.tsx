import { ImagePlus, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import { Card, CardContent } from "@/components/ui/card";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { removeImage, setChosenImages } from "@/features/upload-post-slice";

const PostImagePicker = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { chosenImages } = useSelector((state: RootState) => state.uploadPost);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    if (chosenImages.length + files.length > 10) {
      toast({
        title: "ten photos max",
        description: "Cannot upload more than 10 photos",
      });
      return;
    }

    Array.from(files).forEach((file) => {
      // Read each selected image file

      const reader = new FileReader();
      reader.onload = () => {
        dispatch(setChosenImages(reader.result as string));
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="mt-4">
      <div className="">
        <label htmlFor="photos" className="w-max block">
          <ImagePlus className="w-16 h-16 bg-primary/10 hover:bg-primary/20 rounded-md p-1 text-blue-600 cursor-pointer" />
        </label>
        <input
          type="file"
          accept="image/*"
          name="photos"
          id="photos"
          className="hidden"
          multiple
          onChange={handleImageUpload}
        />
      </div>

      {/* preview chosen images*/}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 mt-4">
        {chosenImages.map((image, index) => (
          <div
            className="border relative rounded-md group cursor-pointer flex items-center"
            key={index}
          >
            <img src={image} className="w-full object-contain rounded-md" />

            <div className="absolute right-0 w-full top-0  py-2 px-3 bg-black/60 flex justify-between">
              <Pencil className="w-3 h-3 mr-2 hover:text-orange-600 cursor-pointer" />
              <X
                className="w-3 h-3 hover:text-red-600 cursor-pointer"
                onClick={() => dispatch(removeImage(index))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostImagePicker;
