import LoyaltyPreview from "@/components/loyalty/LoyaltyPreview";
import CoffeeCard from "@/components/menu/CoffeeCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTheme } from "@/context/ThemeContext";
import { getMenu, MenuCategory } from "@/lib/api/menu";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const { theme } = useTheme();
  useEffect(() => {
    const loadMenu = async () => {
      const data = await getMenu();
      setMenu(data);
    };

    loadMenu();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <Text
          style={{
            color: theme.text,
            fontSize: 22,
            fontWeight: "600",
            marginBottom: 6,
          }}
        >
          Good evening ☕
        </Text>

        <Text style={{ color: "#777", marginBottom: 20 }}>Ready for your next coffee?</Text>

        {/* Order Again */}
        <PrimaryButton label="Order again" />

        {/* Featured */}
        <View style={{ marginTop: 28 }}>
          <SectionHeader title="Featured drinks" />

          <FlatList
            data={menu}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <CoffeeCard name={item.name} imageUrl={item?.imageUrl} />}
          />
        </View>

        {/* Loyalty */}
        <View style={{ marginTop: 28 }}>
          <LoyaltyPreview />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
