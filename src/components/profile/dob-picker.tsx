import { updateValues } from "@/features/profile-slice";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function DobPicker() {
  const dispatch = useDispatch();

  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (!date) return;
    dispatch(
      updateValues({
        name: "date_of_birth",
        value: format(date, "y-MM-dd"),
      })
    );
  }, [date]);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Pick a date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
