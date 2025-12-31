import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TIMES = ["Now", "15 min", "30 min", "45 min"];

export default function PickupSelector() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState("Now");

  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontWeight: "600",
          color: theme.text,
          marginBottom: 8,
        }}
      >
        Pickup time
      </Text>

      <View style={{ flexDirection: "row" }}>
        {TIMES.map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setSelected(t)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 14,
              backgroundColor: selected === t ? theme.primary : theme.card,
              marginRight: 10,
            }}
          >
            <Text style={{ color: selected === t ? "#fff" : theme.text }}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
