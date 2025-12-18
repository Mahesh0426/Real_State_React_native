/* eslint-disable import/no-unresolved */
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import "../../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { FeaturedCard, PopularCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import Seed from "../../../lib/seed";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  //get latest properties
  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  //get properties
  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="bg-white h-full">
      <Button title="Seed" onPress={Seed} />

      {/* recommendation properties */}
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <PopularCard item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName=" flex gap-5 px-5 justify-between"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="my-5">
              {/* Header Section */}
              <View className="flex flex-row items-center justify-between mt-5">
                <View className="flex flex-row items-center gap-3">
                  {/* Avatar with gradient border effect */}
                  <View className="relative">
                    <View className="absolute inset-0 bg-primary-300 rounded-full opacity-20 blur-xl" />
                    <Image
                      source={user?.avatar || images.avatar}
                      className="size-14 rounded-full border-2 border-primary-100"
                    />
                  </View>

                  {/* Greeting Text */}
                  <View className="flex flex-col">
                    <Text className="text-medium font-rubik text-black-100 mb-0.5">
                      Good Morning 👋
                    </Text>
                    <Text className="text-lg font-rubik-bold text-black-300">
                      {user?.name}
                    </Text>
                  </View>
                </View>

                {/* Notification Bell with badge */}
                <View className="relative">
                  <View className="bg-primary-100/10 p-3 rounded-full">
                    <Image
                      source={icons.bell}
                      className="size-6"
                      tintColor="#000"
                    />
                  </View>

                  {/* Notification badge */}
                  <View className="absolute -top-1 -right-1 bg-red-500 size-5 rounded-full items-center justify-center border-2 border-white">
                    <Text className="text-white text-[10px] font-rubik-bold">
                      3
                    </Text>
                  </View>
                </View>
              </View>

              {/* Search Component */}
              <Search />

              {/* Featured Section  */}
              <View className="flex flex-row items-center justify-between mt-4 mb-2">
                <View>
                  <Text className="text-xl font-rubik-bold text-black-300">
                    Featured Properties
                  </Text>
                  <Text className="text-sm font-rubik text-black-100 ">
                    Find your dream home
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-sm font-rubik-medium text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Featured Section */}
              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}
            </View>

            {/* Recommended Section */}
            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-xl font-rubik-bold text-black-300">
                    Our Recommendation
                  </Text>
                  <Text className="text-sm font-rubik text-black-100 ">
                    get your recommended properties
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {/* filters section */}
              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
