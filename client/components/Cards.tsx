import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "../constants/images";
import icons from "@/constants/icons";
import { Property } from "../types";

//interface for props
interface Props {
  item: Property;
  onPress: () => void;
}

export const FeaturedCard = ({ onPress, item }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative overflow-hidden"
    >
      <Image source={{ uri: item.image }} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />
      <View className="flex flex-row items-center gap-1 bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5 ">
        {/* rating */}
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-sm font-rubik-bold text-primary-300 ml-1">
          {item.rating}
        </Text>
      </View>

      {/* title and location */}
      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-base font-rubik text-white">{item.address}</Text>

        {/* price and heart */}
        <View className="flex flex-row justify-between w-full ">
          <Text className="text-xl font-rubik-extrabold text-white">
            ${item.price}
          </Text>
          <Image source={icons.heart} className="size-5 " />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const PopularCard = ({ onPress, item }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-ful z-50 ">
        {/* rating */}
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-sm font-rubik-bold text-primary-300 ml-0.5">
          {item.rating}
        </Text>
      </View>
      <Image source={{ uri: item.image }} className="w-full h-40 rounded-lg" />

      {/* title and location */}
      <View className="flex flex-col mt-2">
        <Text
          className="text-base font-rubik-bold text-black-300"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-xs font-rubik text-black">{item.address}</Text>

        {/* price and heart */}
        <View className="flex flex-row justify-between items-center mt-2 ">
          <Text className="text-base font-rubik-bold text-primary-300">
            ${item.price}
          </Text>
          <Image
            source={icons.heart}
            className=" w-5 h-5 mr-2 "
            tintColor="#191d31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
// import React from "react";

// // Mock images and icons
// const mockImages = {
//   japan: {
//     uri: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
//   },
//   newYork: {
//     uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
//   },
//   cardGradient: {
//     uri: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:rgba(0,0,0,0);stop-opacity:0' /%3E%3Cstop offset='100%25' style='stop-color:rgba(0,0,0,0.8);stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='400' height='400'/%3E%3C/svg%3E",
//   },
//   avatar: {
//     uri: "https://ui-avatars.com/api/?name=MK&background=6366f1&color=fff&size=200",
//   },
// };

// const mockIcons = {
//   star: { uri: "https://api.iconify.design/ph/star-fill.svg?color=%23fbbf24" },
//   heart: { uri: "https://api.iconify.design/ph/heart.svg?color=%23ffffff" },
//   bell: { uri: "https://api.iconify.design/ph/bell.svg?color=%23000000" },
// };

// interface Props {
//   onPress: () => void;
// }

// export const FeaturedCard = ({ onPress }: Props) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className="w-64 h-80 relative rounded-3xl overflow-hidden shadow-xl shadow-black/25"
//       style={{ elevation: 8 }}
//     >
//       {/* Main Image */}
//       <Image source={mockImages.japan} className="size-full" />

//       {/* Gradient Overlay */}
//       <View className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

//       {/* Rating Badge */}
//       <View className="absolute top-4 right-4 flex-row items-center bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
//         <Text className="text-lg">⭐</Text>
//         <Text className="text-sm font-bold text-gray-800 ml-1">4.8</Text>
//       </View>

//       {/* Content */}
//       <View className="absolute bottom-0 left-0 right-0 p-5">
//         <Text
//           className="text-2xl font-extrabold text-white mb-1"
//           numberOfLines={1}
//         >
//           Modern Apartments
//         </Text>
//         <Text className="text-sm text-white/90 mb-3" numberOfLines={1}>
//           📍 22 W St, New York, NY
//         </Text>

//         {/* Price and Heart */}
//         <View className="flex-row justify-between items-center">
//           <View>
//             <Text className="text-xs text-white/70 mb-0.5">Starting from</Text>
//             <Text className="text-2xl font-extrabold text-white">
//               $2,400<Text className="text-sm font-normal">/mo</Text>
//             </Text>
//           </View>
//           <TouchableOpacity className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
//             <Text className="text-xl">🤍</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export const PopularCard = ({ onPress }: Props) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className="flex-1 bg-white rounded-2xl overflow-hidden shadow-lg"
//       style={{ elevation: 4, minWidth: 280 }}
//     >
//       {/* Image Container */}
//       <View className="relative">
//         <Image source={mockImages.newYork} className="w-full h-48" />

//         {/* Gradient Overlay on Image */}
//         <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

//         {/* Rating Badge */}
//         <View className="absolute top-3 right-3 flex-row items-center bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-md">
//           <Text className="text-sm">⭐</Text>
//           <Text className="text-xs font-bold text-gray-800 ml-1">4.6</Text>
//         </View>

//         {/* Category Badge */}
//         <View className="absolute top-3 left-3 bg-indigo-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
//           <Text className="text-xs font-semibold text-white">Featured</Text>
//         </View>
//       </View>

//       {/* Content */}
//       <View className="p-4">
//         <Text
//           className="text-lg font-bold text-gray-900 mb-1"
//           numberOfLines={1}
//         >
//           Cozy Studio Apartment
//         </Text>
//         <Text className="text-xs text-gray-500 mb-3" numberOfLines={1}>
//           📍 Chelsea, Manhattan, NY
//         </Text>

//         {/* Features */}
//         <View className="flex-row gap-2 mb-3">
//           <View className="bg-gray-100 px-2 py-1 rounded-md">
//             <Text className="text-xs text-gray-600">🛏️ 2 Beds</Text>
//           </View>
//           <View className="bg-gray-100 px-2 py-1 rounded-md">
//             <Text className="text-xs text-gray-600">🚿 1 Bath</Text>
//           </View>
//           <View className="bg-gray-100 px-2 py-1 rounded-md">
//             <Text className="text-xs text-gray-600">📐 850 sqft</Text>
//           </View>
//         </View>

//         {/* Price and Heart */}
//         <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
//           <View>
//             <Text className="text-xs text-gray-500">Price</Text>
//             <Text className="text-xl font-bold text-indigo-600">
//               $1,800
//               <Text className="text-sm font-normal text-gray-500">/mo</Text>
//             </Text>
//           </View>
//           <TouchableOpacity className="bg-indigo-50 p-2.5 rounded-full">
//             <Text className="text-lg">❤️</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };
