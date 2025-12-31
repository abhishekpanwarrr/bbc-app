import { useTheme } from "@/context/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

export default function CoffeeCard({
  name,
  price,
}: {
  name: string;
  price: string;
}) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.card,
        padding: 14,
        borderRadius: 18,
        width: 160,
        marginRight: 12,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 4,
        }}
      >
        {name}
      </Text>

      <Text style={{ color: "#777", fontSize: 13 }}>Smooth • Balanced</Text>

      <Text
        style={{
          color: theme.primary,
          fontWeight: "600",
          marginTop: 8,
        }}
      >
        ₹{price}
      </Text>
    </TouchableOpacity>
  );
}
