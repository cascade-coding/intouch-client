import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import SuggestionCardPrimary from "./suggestion-card-primary";

import { SuggestionType } from "@/types";

import { privateApi } from "@/http";

import { RootState } from "@/app/store";

const Discover = () => {
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState<SuggestionType[]>([]);
  const [notFound, setNotFound] = useState(false);

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getData = setTimeout(async () => {
      if (search.trim() === "") return;
      try {
        const { data } = await privateApi.get(`/search_profile/${search}/`);

        const { profiles } = data as { profiles: SuggestionType[] | [] };

        setProfiles(profiles);

        if (profiles.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      } catch (error) {
        console.log(error);
      }
    }, 1500);

    return () => clearTimeout(getData);
  }, [search]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MagnifyingGlassIcon className="w-6 h-6 hover:text-primary transition-all cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] -mt-16">
        <DialogHeader>
          <DialogTitle>Discover new people</DialogTitle>
          <DialogDescription>
            You can search people by there username
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="black_sheep"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {profiles.map((profile) => (
          <SuggestionCardPrimary
            suggestion={profile}
            key={profile.id}
            setSuggestions={setProfiles}
            user={user}
          />
        ))}

        {notFound && (
          <div>
            <p className="text-center">no user found</p>
          </div>
        )}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Discover;
