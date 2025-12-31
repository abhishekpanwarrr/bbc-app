import CartItemRow from "@/components/order/CartItemRow";
import PickupSelector from "@/components/order/PickupSelector";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/store/useCart";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const { theme } = useTheme();
  const { items, total } = useCart();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: theme.text,
              marginBottom: 16,
            }}
          >
            Your Order
          </Text>

          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}

          <PickupSelector />
        </ScrollView>

        {/* Checkout */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            backgroundColor: theme.card,
          }}
        >
          <TouchableOpacity
            onPress={() => alert("Order placed (mock)")}
            style={{
              backgroundColor: theme.primary,
              padding: 16,
              borderRadius: 18,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Confirm Order • ₹{total}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
