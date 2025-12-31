import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/store/useCart";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function CartBar() {
  const { theme } = useTheme();
  const { items, total } = useCart();
  const router = useRouter();

  if (items.length === 0) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: theme.primary,
        padding: 16,
        borderRadius: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "600" }}>
        {items.length} items • ₹{total}
      </Text>

      <TouchableOpacity onPress={() => router.push("/order/cart")}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>View Cart →</Text>
      </TouchableOpacity>
    </View>
  );
}
