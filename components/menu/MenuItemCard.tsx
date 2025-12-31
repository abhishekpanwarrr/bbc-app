import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/store/useCart";
import { Text, TouchableOpacity, View } from "react-native";

export default function MenuItemCard({
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price: number;
}) {
  const { theme } = useTheme();
  const addItem = useCart((s) => s.addItem);

  return (
    <View
      style={{
        backgroundColor: theme.card,
        padding: 16,
        borderRadius: 18,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600", color: theme.text }}>
        {name}
      </Text>

      <Text style={{ color: "#777", marginVertical: 4 }}>
        Smooth • Freshly brewed
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.primary, fontWeight: "600" }}>
          ₹{price}
        </Text>

        <TouchableOpacity
          onPress={() => addItem({ id, name, price })}
          style={{
            backgroundColor: theme.primary,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
