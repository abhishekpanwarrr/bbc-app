import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";

const Summary = () => {
  const { logout } = useAuthStore();
  const { token, user } = useAuthStore();

  // 🚨 HARD GUARD
  if (!token || user?.role !== "ADMIN") {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Summary</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Summary;
