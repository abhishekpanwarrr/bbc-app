import { View, Text } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";

const Orders = () => {
  const { token, user } = useAuthStore();

  // 🚨 HARD GUARD
  if (!token || user?.role !== "ADMIN") {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <View>
      <Text>Orders</Text>
    </View>
  );
};

export default Orders;
