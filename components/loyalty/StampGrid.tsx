import { useLoyalty } from "@/store/useLoyalty";
import { View } from "react-native";
import Stamp from "./Stamp";

export default function StampGrid() {
  const { stamps, totalStamps } = useLoyalty();

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: totalStamps }).map((_, i) => (
        <Stamp key={i} filled={i < stamps} />
      ))}
    </View>
  );
}
