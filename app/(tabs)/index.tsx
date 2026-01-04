import Header from "@/components/home/header";
import PromoBanner from "@/components/home/promo-banner";
import Search from "@/components/home/search";
import CoffeeCard from "@/components/menu/CoffeeCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTheme } from "@/context/ThemeContext";
import { getFeaturedItems, getMenu, MenuCategory } from "@/lib/api/menu";
import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { theme } = useTheme();
  const [menu, setMenu] = useState<MenuCategory[]>([]);

  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | "ALL">("ALL");

  const horizontalItems = useMemo(() => {
    if (selectedCategoryId === "ALL") {
      // flatten all category items
      return menu.flatMap((cat) => cat.items || []);
    }

    const category = menu.find((cat) => cat.id === selectedCategoryId);
    return category?.items || [];
  }, [menu, selectedCategoryId]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [menuData, featuredData] = await Promise.all([getMenu(), getFeaturedItems()]);

        setMenu(menuData);
        setFeaturedItems(featuredData);
      } catch (error) {
        console.error("Failed to load menu data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"black"} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={featuredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 14 }}
        contentContainerStyle={{ padding: 16, gap: 14 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CoffeeCard type="featured" id={item.id} name={item.name} imageUrl={item.imageUrl} />
        )}
        /* 🔑 EVERYTHING ABOVE GOES HERE */
        ListHeaderComponent={
          <>
            <Header />
            <Search />
            <PromoBanner />
            <SectionHeader title="Categories" />
            <View
              style={{
                paddingBottom: 5,
                backgroundColor: "#eee",
              }}
            >
              <FlatList
                data={menu}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ marginVertical: 12 }}
                renderItem={({ item, index }) => {
                  const isActive = selectedCategoryId === item.id;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedCategoryId(item.id)}
                      style={{
                        backgroundColor: isActive ? "#F59E0B" : "#fff",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: isActive ? "#fff" : "#111827",
                          fontWeight: "500",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Image
                        source={{
                          uri: item?.imageUrl,
                        }}
                        style={{
                          width: 20,
                          height: 20,
                          alignSelf: "center",
                          marginTop: 4,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
              <View style={{ marginTop: 16 }}>
                <FlatList
                  data={horizontalItems}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{ gap: 12, paddingVertical: 12 }}
                  renderItem={({ item }) => (
                    <CoffeeCard
                      type="featured"
                      id={item.id}
                      name={item.name}
                      imageUrl={item.imageUrl}
                    />
                  )}
                  ListEmptyComponent={
                    <Text style={{ color: "#6B7280", marginTop: 10 }}>No items available</Text>
                  }
                />
              </View>
            </View>
            <SectionHeader title="Featured items" />
          </>
        }
      />
    </SafeAreaView>
  );
}
