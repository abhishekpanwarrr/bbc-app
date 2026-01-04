import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CoffeeCard({
  id,
  name,
  imageUrl,
  type,
}: {
  id: string;
  name: string;
  imageUrl?: string | null;
  type?: string;
}) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(type === "featured" ? `/item/${id}` : `/inventory/${id}`)}
      style={{
        flex: 1,
        backgroundColor: theme.card,
        borderRadius: 20,
        padding: 12,
      }}
    >
      {/* Image */}
      <View
        style={{
          backgroundColor: theme.background,
          borderRadius: 14,
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Image
          source={{
            uri: imageUrl || "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
          }}
          resizeMode="contain"
          style={{
            width: type === "featured" ? "100%" : 80,
            resizeMode: "cover",
            borderRadius: type === "featured" ? 8 : 0,
            height: 80,
          }}
        />
      </View>

      {/* Name */}
      <Text
        numberOfLines={2}
        style={{
          color: theme.text,
          fontSize: 15,
          fontWeight: "600",
          marginBottom: 4,
        }}
      >
        {name}
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          color: "#888",
          fontSize: 12,
        }}
      >
        Freshly brewed
      </Text>
    </TouchableOpacity>
  );
}
