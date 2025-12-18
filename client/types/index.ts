import { Models } from "react-native-appwrite";

export interface Property extends Models.Document {
  name: string;
  address: string;
  image: string;
  type: string;
  facilities: string[];
  price: number;
  description: string;
  rating: number;
  reviews: Models.Document[];
  gallery: Gallery[];
  agent: {
    avatar: string;
    name: string;
    email: string;
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
}

export interface Gallery extends Models.Document {
  image: string;
}
