import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { login, register } from "@/lib/api/auth";
import { useTheme } from "@/context/ThemeContext";

export default function UserLogin() {
  const { theme } = useTheme();
  const { setAuth } = useAuthStore();
  const [account, setAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");

  const onLogin = async () => {
    if (email === "" || password === "") {
      return Alert.alert("Add email and password");
    }
    try {
      setLoading(true);
      const res = await login(email, password);
      setAuth(res.user, res.token);
    } catch (e: any) {
      console.log("🚀 ~ onLogin ~ e:", e);
      Alert.alert("Login failed", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }} className="border-b border-gray-300 mb-3">
      <Text style={{ fontSize: 22, fontWeight: "600", color: theme.text }}>
        {!account ? "Login" : "Sign Up"}
      </Text>
      {account && (
        <TextInput
          placeholder="Full name"
          autoCapitalize="none"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor={"#456882"}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
            color: theme.text,
          }}
        />
      )}

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={"#456882"}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginTop: 16,
          color: theme.text,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        placeholderTextColor={"#456882"}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginTop: 12,
          color: theme.text,
        }}
      />

      <Pressable
        onPress={onLogin}
        disabled={loading}
        style={{
          backgroundColor: "#000",
          padding: 14,
          borderRadius: 8,
          marginTop: 18,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          {loading && "Loading..."}
          {!loading && (!account ? "Login" : "Sign Up")}
        </Text>
      </Pressable>
      <Pressable onPress={() => setAccount(!account)} style={{ marginTop: 16 }}>
        <Text className="text-pink-800 underline text-base">
          {!account ? "Dont have an account? Create an account" : "Have an account? Login"}
        </Text>
      </Pressable>
    </View>
  );
}
