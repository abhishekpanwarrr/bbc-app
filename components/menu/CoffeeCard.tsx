import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

export default function CoffeeCard({
  id,
  name,
  imageUrl,
}: {
  id: string;
  name: string;
  imageUrl?: string;
}) {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/inventory/${id}`)}
      //       onPress={() =>
      //   router.push({
      //     pathname: "/inventory/[id]",
      //     params: { id },
      //   })
      // }
      style={{
        backgroundColor: theme.card,
        padding: 14,
        borderRadius: 18,
        width: 150,
        marginRight: 12,
        alignItems: "center",
        gap: 10,
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

      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          width: 40,
          height: 40,
        }}
      />
    </TouchableOpacity>
  );
}
