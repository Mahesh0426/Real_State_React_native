import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import icons from "../constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const param = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = React.useState(param?.query || "");

  //use debounce to search
  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  //handle search function
  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 py-2 mt-5 rounded-lg border border-primary-100">
      <View className=" items-center flex-1 flex-row justify-start z-50">
        <Image source={icons.search} className="size-5 pt-1" />
        <TextInput
          placeholder="Search for anything"
          value={search}
          onChangeText={handleSearch}
          className="text-lg font-rubik-medium text-green-900 flex-1 ml-2 "
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  );
};

export default Search;
