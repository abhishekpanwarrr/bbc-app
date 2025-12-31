import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/store/useCart";
import { Text, TouchableOpacity, View } from "react-native";

export default function CartItemRow({ item }: any) {
  const { theme } = useTheme();
  const { increaseQty, decreaseQty } = useCart();

  return (
    <View
      style={{
        backgroundColor: theme.card,
        padding: 14,
        borderRadius: 16,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontWeight: "600", color: theme.text }}>{item.name}</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Text style={{ color: theme.primary }}>₹{item.price * item.qty}</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => decreaseQty(item.id)}>
            <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>−</Text>
          </TouchableOpacity>

          <Text style={{ fontWeight: "600" }}>{item.qty}</Text>

          <TouchableOpacity onPress={() => increaseQty(item.id)}>
            <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
