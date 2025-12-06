import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../../../global.css";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className=" bg-white">
        <Text className="text-3xl font-bold text-blue-500">
          Welcome to realstate app!
        </Text>
      </View>
      <Link href="/sign-in">Sign in</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/123">Preperty</Link>
    </View>
  );
}
