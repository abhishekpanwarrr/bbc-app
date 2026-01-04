import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const { theme } = useTheme();
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning ☀️";
    if (hour < 17) return "Good afternoon 🌤️";
    if (hour < 21) return "Good evening ☕";
    return "Good night 🌙";
  };
  const greeting = useMemo(() => getGreeting(), []);
  const router = useRouter();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
      <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={{ width: 42, height: 42, borderRadius: 21 }}
        />
      </TouchableOpacity>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ color: theme.text, fontSize: 16, fontWeight: "600" }}>Abhishek</Text>
        <Text style={{ color: theme.primary, fontSize: 13 }}>{greeting}</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 999,
        }}
      >
        <Ionicons name="notifications-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
