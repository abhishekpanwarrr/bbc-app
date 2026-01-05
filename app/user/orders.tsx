import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { act, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Orders = () => {
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const orders = [
    {
      id: "1",
      orderNumber: "ORD-2024-00123",
      date: "Jan 15, 2024",
      status: "delivered",
      statusText: "Delivered",
      items: 3,
      total: "$245.99",
      trackingNumber: "TRK-789456123",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-00122",
      date: "Jan 12, 2024",
      status: "processing",
      statusText: "Processing",
      items: 1,
      total: "$89.50",
      trackingNumber: "TRK-789456124",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-00121",
      date: "Jan 10, 2024",
      status: "shipped",
      statusText: "Shipped",
      items: 2,
      total: "$156.75",
      trackingNumber: "TRK-789456125",
    },
    {
      id: "4",
      orderNumber: "ORD-2024-00120",
      date: "Jan 5, 2024",
      status: "cancelled",
      statusText: "Cancelled",
      items: 4,
      total: "$312.25",
      trackingNumber: null,
    },
  ];

  const filters = [
    { id: "all", label: "All Orders" },
    { id: "processing", label: "Processing" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "#10B981";
      case "processing":
        return "#F59E0B";
      case "shipped":
        return "#3B82F6";
      case "cancelled":
        return "#EF4444";
      default:
        return theme.textSecondary;
    }
  };

  const filteredOrders =
    selectedFilter === "all" ? orders : orders.filter((o) => o.status === selectedFilter);

  const renderOrderItem = ({ item }: any) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={[styles.orderNo, { color: theme.text }]}>{item.orderNumber}</Text>
          <Text style={{ color: theme.textSecondary }}>{item.date}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.badgeText}>{item.statusText}</Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.row}>
        <Text style={{ color: theme.textSecondary }}>{item.items} items</Text>
        <Text style={[styles.price, { color: theme.text }]}>{item.total}</Text>
      </View>

      {item.trackingNumber && (
        <Text style={[styles.tracking, { color: theme.primary }]}>
          Tracking: {item.trackingNumber}
        </Text>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.outlineBtn, { borderColor: theme.primary }]}>
          <Text style={{ color: theme.primary }}>View Details</Text>
        </TouchableOpacity>

        {item.status === "shipped" && (
          <TouchableOpacity style={[styles.fillBtn, { backgroundColor: theme.primary }]}>
            <Text style={{ color: "#fff" }}>Track Order</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      {/* <View style={[styles.header, { backgroundColor: theme.card }]}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>My Orders</Text>
          <Text style={{ color: theme.textSecondary }}>{filteredOrders.length} orders found</Text>
        </View>
        <Ionicons name="search-outline" size={24} color={theme.primary} />
      </View> */}

      {/* Filters */}
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {filters.map((f) => {
          const active = selectedFilter === f.id;
          return (
            <TouchableOpacity
              key={f.id}
              onPress={() => setSelectedFilter(f.id)}
              style={[styles.filterChip, { backgroundColor: active ? theme.accent : "" }]}
            >
              <Text
                style={{
                  color: active ? "#fff" : "#111827",
                  fontWeight: "600",
                }}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}

      {/* List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(i) => i.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="document-text-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No Orders</Text>
            <Text style={{ color: theme.textSecondary, textAlign: "center" }}>
              You don’t have any orders in this category.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    padding: 15,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: { fontSize: 28, fontWeight: "700" },

  filters: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 10,
    backgroundColor: "transparent",
  },

  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
    maxHeight: 40,
    borderRadius: 20,
    alignItems: "center",
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  card: {
    borderRadius: 10,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  orderNo: { fontSize: 16, fontWeight: "700" },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    marginVertical: 12,
    opacity: 0.3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  price: { fontSize: 16, fontWeight: "700" },

  tracking: { marginBottom: 12, fontWeight: "500" },

  actions: { flexDirection: "row", gap: 10 },

  outlineBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  fillBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  empty: {
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 10,
  },
});
