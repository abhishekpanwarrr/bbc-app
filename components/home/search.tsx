import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 20,
      }}
    >
      <Ionicons name="search-outline" size={18} color="#999" />
      <Text style={{ marginLeft: 8, color: "#999", flex: 1 }}>Search coffee...</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#F3F4F6",
          padding: 8,
          borderRadius: 12,
        }}
      >
        <Ionicons name="options-outline" size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
