export type PostType = {
  id: string;
  profile: {
    id: string;
    profile_photo: string;
    user: {
      id: string;
      username: string;
    };
  };
  user_liked: boolean;
  user_disliked: boolean;
  like_counts: number;
  dislike_counts: number;
  text: string | null;
  post_images: { id: string; image: string }[] | [];
};

export type SuggestionType = {
  id: string;
  profile_photo: string;
  total_followers: number;
  total_following: number;
  user: {
    id: string;
    username: string;
  };
  is_following: boolean;
};

export type FollowProfilesType = {
  next: null | string;
  previous: null | string;
  results: [] | SuggestionType[];
};


export type UserType = {
  id: string;
  username: string;
  email: string;
  profile: {
    id: string;
    profile_photo: string;
  };
};