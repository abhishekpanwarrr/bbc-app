import { ThemeProvider } from "@/context/ThemeContext";
import "@/global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="user/orders"
          options={{
            headerLeft: () => (
              <Ionicons
                onPress={() => router.back()}
                name="chevron-back"
                size={24}
                color={"gray"}
              />
            ),
            title: "My Orders",
          }}
        />
        <Stack.Screen
          name="user/payments"
          options={{
            headerLeft: () => (
              <Ionicons
                onPress={() => router.back()}
                name="chevron-back"
                size={24}
                color={"gray"}
              />
            ),
            title: "My Payments",
          }}
        />
        <Stack.Screen
          name="user/login"
          options={{
            presentation: "pageSheet",
            title: "Authentication",
          }}
        />
        <Stack.Screen
          name="item/[id]"
          options={{
            presentation: "modal",
            headerTitle: "Details",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={22} color="#111" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
