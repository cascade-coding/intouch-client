import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { ZoomIn, ZoomOut } from "lucide-react";

import AvatarEditor from "react-avatar-editor";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { RootState } from "@/app/store";
import { setCoppedImage } from "@/features/profile-slice";

const ProfilePicker = () => {
  const [open, setOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState("");
  const [scale, setScale] = React.useState(1.6);

  const editor = React.useRef(null);

  const dispatch = useDispatch();

  const { profile } = useSelector((state: RootState) => state.profile);

  const handleProfilePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const src = reader.result?.toString() || "";
      setImageSrc(src);
    };

    reader.readAsDataURL(file);
  };

  const saveCrop = () => {
    if (editor.current) {
      const data = editor.current as {
        getImage: () => HTMLCanvasElement;
      };
      const canvas = data.getImage();
      dispatch(setCoppedImage(canvas.toDataURL()));
      setOpen(false);
      setImageSrc("");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <p className="text-blue-600 cursor-pointer">
            {profile.profile_photo
              ? "Change profile photo"
              : "Choose a profile photo"}
          </p>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[600px] overflow-y-auto hide-scrollbar h-[500px]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <label
              htmlFor="profile"
              className="bg-secondary text-secondary-foreground text-sm rounded-full max-w-max px-4 cursor-pointer"
            >
              Choose
            </label>
          </DialogHeader>
          <div>
            <div className="flex justify-center py-4">
              <input
                type="file"
                name="profile"
                accept="image/*"
                id="profile"
                className="hidden"
                onChange={handleProfilePhoto}
              />
            </div>

            {imageSrc && (
              <div className="flex flex-col items-center gap-y-4">
                <div className="relative">
                  <AvatarEditor
                    ref={editor}
                    image={imageSrc}
                    width={250}
                    height={250}
                    border={50}
                    borderRadius={1000}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={scale}
                    rotate={0}
                  />

                  <div className="absolute top-0 left-0 flex justify-between w-full bg-black/60 p-2">
                    <ZoomOut
                      className="cursor-pointer hover:text-orange-600"
                      onClick={() => {
                        if (scale <= 1.2) return;
                        setScale((prev) => prev - 0.5);
                      }}
                    />
                    <ZoomIn
                      className="cursor-pointer hover:text-orange-600"
                      onClick={() => {
                        setScale((prev) => prev + 0.5);
                      }}
                    />
                  </div>
                </div>

                <Button onClick={saveCrop} variant={"ghost"}>
                  Save
                </Button>
              </div>
            )}
          </div>

          <DialogFooter className="mt-6"></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePicker;
