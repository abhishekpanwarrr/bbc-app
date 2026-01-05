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
      {/* Profile Card */}
      <View style={[styles.profileCard, { backgroundColor: theme.card }]}>
        {/* User Info Section */}
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarBackground, { backgroundColor: theme.primary + "20" }]}>
              <Ionicons size={40} color={theme.accent} name="person-outline" />
            </View>
          </View>

          <View style={styles.userTextContainer}>
            <Text style={[styles.profileName, { color: theme.text }]} numberOfLines={1}>
              {user?.name || "Guest User"}
            </Text>
            <Text style={[styles.profileEmail, { color: theme.text }]} numberOfLines={1}>
              {user?.email || "user@example.com"}
            </Text>

            {/* Optional Status Badge */}
            <View style={[styles.statusBadge, { backgroundColor: theme.primary + "15" }]}>
              <View style={[styles.statusDot, { backgroundColor: theme.card }]} />
              <Text style={[styles.statusText, { color: theme.primary }]}>Premium Member</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>24</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Payments</Text>
          </View>
          <View style={[styles.statSeparator, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>128</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Orders</Text>
          </View>
          <View style={[styles.statSeparator, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>89</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Favorites</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* <TouchableOpacity
            style={[styles.editButton, { backgroundColor: theme.primary + "15" }]}
            onPress={() => console.log("Edit profile")}
          >
            <Ionicons name="pencil-outline" size={18} color={theme.primary} />
            <Text style={[styles.editButtonText, { color: theme.primary }]}>Edit Profile</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileBox;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileCard: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarBackground: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  userTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 12,
    opacity: 0.8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 20,
    opacity: 0.3,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "500",
    opacity: 0.7,
  },
  statSeparator: {
    width: 1,
    height: "70%",
    alignSelf: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  logoutButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4444",
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
    shadowColor: "#ff4444",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
