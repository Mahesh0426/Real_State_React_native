import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "../constants/images";

//interface for props
interface Props {
  onPress: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 relative"
    >
      <Image source={images.japan} className="size-full rounded-t-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />
    </TouchableOpacity>
  );
};

export const PopularCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>PopularCard</Text>
    </TouchableOpacity>
  );
};
