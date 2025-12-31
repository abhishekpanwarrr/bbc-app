import CategoryChip from "@/components/menu/CategoryChip";
import MenuItemCard from "@/components/menu/MenuItemCard";
import CartBar from "@/components/order/CartBar";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = ["All", "Espresso", "Cold", "Milk", "Vegan"];

export default function Order() {
  const { theme } = useTheme();
  const [active, setActive] = useState("All");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((c) => (
              <CategoryChip
                key={c}
                label={c}
                active={active === c}
                onPress={() => setActive(c)}
              />
            ))}
          </ScrollView>

          {/* Menu */}
          <View style={{ marginTop: 20 }}>
            <MenuItemCard id="1" name="Cappuccino" price={180} />
            <MenuItemCard id="2" name="Latte" price={200} />
            <MenuItemCard id="3" name="Cold Brew" price={220} />
            <MenuItemCard id="4" name="Americano" price={160} />
          </View>
        </ScrollView>

        <CartBar />
      </View>
    </SafeAreaView>
  );
}
