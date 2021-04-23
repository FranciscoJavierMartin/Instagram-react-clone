export interface FirebaseUser {
  docId: string;
  dateCreated: number;
  emailAddress: string;
  followers: string[];
  following: string[];
  fullName: string;
  userId: string;
  username: string;
}

export interface FirebasePhoto {
  docId: string;
  caption: string;
  comments: Comment[];
  dateCreated: number;
  imageSrc: string;
  likes: any[];
  userId: string;
  userLatitude: string;
  userLongitude: string;
}

export interface Comment {
  comment: string;
  displayName: string;
}

export interface PhotoWithUserDetails extends FirebasePhoto {
  userLikedPhoto: boolean;
  username: string;
}
