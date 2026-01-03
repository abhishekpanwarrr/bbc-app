import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMenuItemsByCategory, MenuCategoryWithItems } from "@/lib/api/menu"; // adjust path
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const InventoryCategory = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<MenuCategoryWithItems | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getMenuItemsByCategory(id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView>
        <Text>Category not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 16 }}>
      <Stack.Screen
        options={{
          headerTitle: data?.name,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} color={Colors.dark.background} />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={data.items}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => {
          console.log("imageUrl", item.imageUrl);

          return (
            <View
              style={{
                padding: 12,
                borderRadius: 10,
                backgroundColor: "#f2f2f2",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item.imageUrl ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    marginRight: 12,
                  }}
                  contentFit="cover"
                  transition={200}
                />
              ) : (
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    marginRight: 12,
                    backgroundColor: "#ddd",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, color: "#888" }}>No Image</Text>
                </View>
              )}

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
                <Text style={{ marginTop: 4, color: "#666", fontWeight: "400" }}>
                  ₹ {(item.price / 100).toFixed(2)}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: "gray",
                  }}
                >
                  {item?.description}
                </Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={{ marginTop: 10, alignSelf: "center" }}>No items in this category</Text>
        }
      />
    </SafeAreaView>
  );
};

export default InventoryCategory;
