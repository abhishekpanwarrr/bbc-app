import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { login, register } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";

const Login = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  // ✅ FORM STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password || (mode === "signup" && !name)) {
      return Alert.alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res =
        mode === "login" ? await login(email, password) : await register(name, email, password);

      setAuth(res.user, res.token);
      router.dismiss();
    } catch (e: any) {
      Alert.alert("Authentication failed", e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.title}>
              {mode === "login" ? "Welcome back ☕" : "Create account ✨"}
            </Text>

            <Text style={styles.subtitle}>
              {mode === "login"
                ? "Login to continue ordering"
                : "Sign up to start your coffee journey"}
            </Text>

            {/* NAME */}
            {mode === "signup" && (
              <Input label="Name" placeholder="John Doe" value={name} onChangeText={setName} />
            )}

            {/* EMAIL */}
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
            />

            {/* PASSWORD */}
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordBox}>
                <TextInput
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  style={{ flex: 1, fontSize: 16 }}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#64748B" />
                </TouchableOpacity>
              </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              disabled={loading}
              onPress={handleSubmit}
              style={[styles.button, { backgroundColor: theme.accent, opacity: loading ? 0.7 : 1 }]}
            >
              <Text style={{ color: theme.text, fontSize: 16, fontWeight: "600" }}>
                {loading ? (
                  <ActivityIndicator size={"small"} color={"#fff"} />
                ) : mode === "login" ? (
                  "Login"
                ) : (
                  "Create account"
                )}
              </Text>
            </TouchableOpacity>

            {/* SWITCH */}
            <TouchableOpacity
              onPress={() => setMode(mode === "login" ? "signup" : "login")}
              style={{ marginTop: 18, alignItems: "center" }}
            >
              <Text style={{ color: "#475569" }}>
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <Text style={{ color: theme.accent, fontWeight: "600" }}>
                  {mode === "login" ? "Sign up" : "Login"}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>By continuing, you agree to our Terms & Privacy Policy</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

/* ---------------- COMPONENTS ---------------- */

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
}) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      autoCapitalize="none"
    />
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    color: "#64748B",
    marginTop: 6,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 20,
  },
});
