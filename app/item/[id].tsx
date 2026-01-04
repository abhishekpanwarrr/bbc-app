import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { getMenuItemByIdCached, itemCache, MenuItemWithCategory } from "@/lib/api/menu";

type OptionKey = "size" | "sugar" | "ice" | "crust" | "bread" | "portion";

type OptionConfig = {
  key: OptionKey;
  title: string;
  options: string[];
};

const ITEM_OPTIONS: Record<string, OptionConfig[]> = {
  coffee: [
    { key: "size", title: "Size", options: ["Small", "Medium", "Large"] },
    { key: "sugar", title: "Sugar", options: ["Normal", "Less", "No"] },
    { key: "ice", title: "Ice", options: ["Normal", "Less", "No"] },
  ],

  drink: [
    { key: "size", title: "Size", options: ["Regular", "Large"] },
    { key: "ice", title: "Ice", options: ["Normal", "Less", "No"] },
  ],

  pizza: [
    { key: "size", title: "Size", options: ["Small", "Medium", "Large"] },
    { key: "crust", title: "Crust", options: ["Classic", "Cheese Burst", "Thin"] },
  ],

  sandwich: [{ key: "bread", title: "Bread", options: ["White", "Brown", "Multigrain"] }],

  pasta: [{ key: "portion", title: "Portion", options: ["Regular", "Large"] }],
};
const Item = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [item, setItem] = useState<MenuItemWithCategory | null>(() => {
    if (id && itemCache.has(id)) return itemCache.get(id)!;
    return null;
  });

  /** OPTION STATES (SAFE – always called) */
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    size: "Medium",
    sugar: "Normal",
    ice: "Normal",
    crust: "Classic",
    bread: "White",
    portion: "Regular",
  });

  const updateOption = (key: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  useEffect(() => {
    if (!id) return;

    if (itemCache.has(id)) {
      setItem(itemCache.get(id)!);
      return;
    }

    getMenuItemByIdCached(id).then(setItem).catch(console.error);
  }, [id]);

  const category = item?.category?.name.toLowerCase() || "";

  const itemType = category.includes("coffee")
    ? "coffee"
    : category.includes("mojito") || category.includes("drink")
      ? "drink"
      : category.includes("pizza")
        ? "pizza"
        : category.includes("sandwich") || category.includes("burger")
          ? "sandwich"
          : category.includes("pasta")
            ? "pasta"
            : "default";

  if (!item) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image
        source={{ uri: item.imageUrl! }}
        resizeMode="cover"
        style={{ width: "100%", height: 300 }}
      />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingTop: 70,
          paddingBottom: 140,
          marginTop: -28,
          backgroundColor: "#fff",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
      >
        {/* CATEGORY */}
        <Chip text={item.category?.name || ""} />

        {/* NAME + PRICE */}
        <Row>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price / 100}</Text>
        </Row>

        {/* OPTIONS */}
        {ITEM_OPTIONS[itemType]?.map((opt) => (
          <OptionGroup
            key={opt.key}
            title={opt.title}
            options={opt.options}
            value={selectedOptions[opt.key]}
            onChange={(value: string) => updateOption(opt.key, value)}
          />
        ))}

        {/* DESCRIPTION */}
        {item.description && (
          <>
            <Text style={styles.section}>Description</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </>
        )}
      </ScrollView>

      {/* CTA */}
      <BottomCTA price={item.price} />
    </SafeAreaView>
  );
};

export default Item;

/* ---------- UI HELPERS ---------- */

const OptionGroup = ({ title, options, value, onChange }: any) => (
  <View style={{ marginTop: 22 }}>
    <Text style={styles.section}>{title}</Text>
    <Row>
      {options.map((opt: string) => (
        <TouchableOpacity
          key={opt}
          onPress={() => onChange(opt)}
          style={[styles.option, value === opt && styles.optionActive]}
        >
          <Text style={{ color: value === opt ? "#C2410C" : "#475569" }}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </Row>
  </View>
);

const Chip = ({ text }: { text: string }) => (
  <View style={styles.chip}>
    <Text style={{ fontSize: 12, color: "#475569" }}>{text}</Text>
  </View>
);

const Row = ({ children }: any) => (
  <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>{children}</View>
);

const BottomCTA = ({ price }: { price: number }) => (
  <View style={styles.cta}>
    <TouchableOpacity style={styles.ctaBtn}>
      <Text style={{ color: "#fff", fontWeight: "600" }}>Add to Cart · ₹{price / 100}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: "700", flex: 1 },
  price: { fontSize: 22, fontWeight: "700", color: Colors.light.text },
  section: { fontSize: 16, fontWeight: "600", marginTop: 20 },
  desc: { marginTop: 8, fontSize: 15, lineHeight: 22, color: "#475569" },
  chip: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  optionActive: {
    backgroundColor: "#FED7AA",
    borderColor: "#FDBA74",
  },
  cta: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  ctaBtn: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
  },
});
