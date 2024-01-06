import { updateValues } from "@/features/profile-slice";
import { useDispatch, useSelector } from "react-redux";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RootState } from "@/app/store";

import { Label } from "@/components/ui/label";

export default function SelectGender() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state.profile);
  if (!profile.id) return null;
  return (
    <>
      <RadioGroup
        defaultValue={`${profile.gender}`}
        onValueChange={(value) => {
          dispatch(updateValues({ name: "gender", value }));
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Male" id="Male" />
          <Label htmlFor="Male">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Female" id="Female" />
          <Label htmlFor="Female">Female</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Other" id="Other" />
          <Label htmlFor="Other">Other</Label>
        </div>
      </RadioGroup>
    </>
  );
}
