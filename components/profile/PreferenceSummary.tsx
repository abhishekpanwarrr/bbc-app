import { usePreferences } from "@/store/usePreferences";
import { Text, View } from "react-native";

export default function PreferenceSummary() {
  const { prefs } = usePreferences();

  if (!prefs.completed) {
    return <Text style={{ color: "#777" }}>Preferences not set</Text>;
  }

  return (
    <View>
      <Text style={{ color: "#777", fontSize: 13 }}>
        {prefs.strength} • {prefs.milk} • {prefs.sweetness} • {prefs.temperature}
      </Text>
    </View>
  );
}
