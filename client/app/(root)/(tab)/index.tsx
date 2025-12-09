/* eslint-disable import/no-unresolved */
import { Text, View, Image, TouchableOpacity } from "react-native";
import "../../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { FeaturedCard, PopularCard } from "@/components/Cards";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        {/* Header Section */}
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center gap-3">
            {/* Avatar with gradient border effect */}
            <View className="relative">
              <View className="absolute inset-0 bg-primary-300 rounded-full opacity-20 blur-xl" />
              <Image
                source={images.avatar}
                className="size-14 rounded-full border-2 border-primary-100"
              />
            </View>

            {/* Greeting Text */}
            <View className="flex flex-col">
              <Text className="text-medium font-rubik text-black-100 mb-0.5">
                Good Morning 👋
              </Text>
              <Text className="text-lg font-rubik-bold text-black-300">
                Mahesh Kumar
              </Text>
            </View>
          </View>

          {/* Notification Bell with badge */}
          <View className="relative">
            <View className="bg-primary-100/10 p-3 rounded-full">
              <Image source={icons.bell} className="size-6" tintColor="#000" />
            </View>
            {/* Notification badge */}
            <View className="absolute -top-1 -right-1 bg-red-500 size-5 rounded-full items-center justify-center border-2 border-white">
              <Text className="text-white text-[10px] font-rubik-bold">3</Text>
            </View>
          </View>
        </View>

        {/* Search Component */}
        <Search />

        {/* Featured Section  */}
        <View className="flex flex-row items-center justify-between mt-6 mb-4">
          <View>
            <Text className="text-xl font-rubik-bold text-black-300">
              Featured Properties
            </Text>
            <Text className="text-sm font-rubik text-black-100 mt-1">
              Find your dream home
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm font-rubik-medium text-primary-300">
              See all
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Section */}
      <FeaturedCard />

      {/* Popular Section */}
      <PopularCard />
    </SafeAreaView>
  );
}
