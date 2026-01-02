import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/context/ThemeContext";
const ProfileBox = ({ user }: any) => {
  const { theme } = useTheme();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          logout();
          console.log("User logged out");
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.profile, { backgroundColor: theme.card }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Ionicons
            size={60}
            color={theme.text}
            name="person-circle-outline"
            style={styles.profileAvatar}
          />
          <View>
            <Text style={[styles.profileName, { color: theme.text }]}>{user?.name}</Text>
            <Text style={[styles.profileHandle, { color: theme.text }]}>{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
          }}
          onPress={handleLogout}
        >
          <Text
            style={{
              color: "#ff4444",
              fontWeight: "600",
              borderWidth: 1,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderColor: "#ff4444",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileBox;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
  },
  profile: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    gap: 10,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292929",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: "#858585",
  },
});
