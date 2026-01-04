import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";

const PromoBanner = () => {
  return (
    <View
      style={{
        backgroundColor: "#FFE4C7",
        borderRadius: 20,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 28,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13, color: "#6B4E16" }}>Today only</Text>
        <Text style={{ fontSize: 26, fontWeight: "800", marginVertical: 6 }}>70% OFF</Text>
        <Text style={{ color: "#6B4E16", marginBottom: 10 }}>Super Discount</Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#F59E0B",
            paddingVertical: 8,
            paddingHorizontal: 18,
            borderRadius: 999,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Order now</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        }}
        style={{ width: 120, height: 120 }}
      />
    </View>
  );
};

export default PromoBanner;
