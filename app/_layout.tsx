import { ThemeProvider } from "@/context/ThemeContext";
import "@/global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
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
  const { token, user } = useAuthStore();
  console.log("🚀 ~ RootLayoutNav ~ user:", user);
  console.log("🚀 ~ RootLayoutNav ~ token:", token);
  const router = useRouter();
  const navigatorKey = token ? (user?.role === "ADMIN" ? "auth-admin" : "auth-user") : "guest";
  useEffect(() => {
    console.log("RESET AUTH FOR TEST");
    useAuthStore.getState().logout();
  }, []);
  return (
    <ThemeProvider>
      <Stack
        key={navigatorKey}
        initialRouteName={token && user?.role === "ADMIN" ? "(admin)/index" : "(tabs)"}
      >
        {token && user?.role === "ADMIN" ? (
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}

        {/* Common screens */}
        <Stack.Screen name="order/cart" options={{ headerShown: false }} />
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

        <Stack.Screen name="quiz/index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
