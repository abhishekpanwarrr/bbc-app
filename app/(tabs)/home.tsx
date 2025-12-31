import LoyaltyPreview from "@/components/loyalty/LoyaltyPreview";
import CoffeeCard from "@/components/menu/CoffeeCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTheme } from "@/context/ThemeContext";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { theme } = useTheme();

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

        <Text style={{ color: "#777", marginBottom: 20 }}>
          Ready for your next coffee?
        </Text>

        {/* Order Again */}
        <PrimaryButton label="Order again" />

        {/* Featured */}
        <View style={{ marginTop: 28 }}>
          <SectionHeader title="Featured drinks" />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CoffeeCard name="Cappuccino" price="180" />
            <CoffeeCard name="Cold Brew" price="220" />
            <CoffeeCard name="Latte" price="200" />
          </ScrollView>
        </View>

        {/* Loyalty */}
        <View style={{ marginTop: 28 }}>
          <LoyaltyPreview />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
