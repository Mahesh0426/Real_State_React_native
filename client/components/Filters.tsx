import { Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "../constants/data";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  //function to handle categoty
  const handleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategory(item.title)}
          key={index}
          className={`flex flex-col items-center justify-center mr-4 px-4 py-2 rounded-full  ${
            selectedCategory === item.title
              ? "bg-primary-300 "
              : "bg-primary-200 border border-primary-200 text-black-300"
          } `}
        >
          <Text
            className={`text-sm ${selectedCategory === item.title ? "font-rubik-bold text-white text-center" : "text-black-300 mt-0.5"}`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
