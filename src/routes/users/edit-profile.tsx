import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import DobPicker from "@/components/profile/dob-picker";
import SelectGender from "@/components/profile/select-gender";
import ProfilePicker from "@/components/profile/profile-picker";

import { IMAGE_BASE } from "@/config";

import { RootState } from "@/app/store";

import { privateApi } from "@/http";

import { updateProfilePhoto } from "@/features/user-slice";
import { updateValues } from "@/features/profile-slice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const { profile, croppedImage } = useSelector(
    (state: RootState) => state.profile
  );

  const setValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateValues({ name, value }));
  };

  const handleProfileEdit = async () => {
    try {
      setLoading(true);
      let newProfile;

      if (croppedImage) {
        newProfile = new Image();
        newProfile.src = croppedImage;
      }

      const formData = new FormData();

      formData.append("name", profile.name);
      formData.append("bio", profile.bio);
      formData.append("gender", profile.gender);
      profile.date_of_birth &&
        formData.append("date_of_birth", profile.date_of_birth);

      if (croppedImage && newProfile?.src) {
        const blob = await fetch(newProfile.src).then((response) =>
          response.blob()
        );
        formData.append("profile_photo", blob, `${profile.id}_profile.png`);
      }

      const { data } = await privateApi.put("/edit_profile/", formData);

      if (data && croppedImage) dispatch(updateProfilePhoto(croppedImage));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="mt-28">
        <div className="mx-auto px-4 sm:px-8 w-full max-w-5xl min-h-screen">
          <div className="flex flex-col gap-y-6 pb-20 md:pb-8 w-full max-w-md mx-auto">
            <div className="flex flex-col gap-y-4 items-center">
              <div
                className="
              dark:bg-blue-950 bg-neutral-400 h-20 w-20 rounded-full"
              >
                {profile.profile_photo && !croppedImage && (
                  <img
                    src={`${IMAGE_BASE}${profile.profile_photo}`}
                    alt="profile"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                )}

                {croppedImage && (
                  <img
                    src={croppedImage}
                    alt="profile"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                )}
              </div>

              <ProfilePicker />
            </div>

            <div className="flex flex-col gap-y-4">
              <Label htmlFor="name">Name</Label>
              <Input name="name" value={profile.name} onChange={setValue} />
            </div>

            <div className="flex flex-col gap-y-4">
              <Label htmlFor="date_of_birth">Date Of Birth</Label>

              <div className="flex gap-1">
                <Input
                  name="date_of_birth"
                  value={profile.date_of_birth ? profile.date_of_birth : ""}
                  onChange={setValue}
                  type="date"
                />

                <DobPicker />
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                name="bio"
                placeholder="Write about yourself"
                value={profile.bio}
                onChange={setValue}
              />
            </div>

            <div className="flex flex-col gap-y-4">
              <Label>Gender</Label>
              <SelectGender />
            </div>

            <Button
              variant={"secondary"}
              onClick={handleProfileEdit}
              disabled={loading}
            >
              {loading ? "Saving" : "Save"}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditProfile;
