import OptionCard from "@/components/quiz/OptionCard";
import QuizStep from "@/components/quiz/QuizStep";
import { usePreferences } from "@/store/usePreferences";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Quiz() {
  const router = useRouter();
  const { prefs, setPref, completeQuiz } = usePreferences();
  const [step, setStep] = useState(0);
  console.log("🚀 ~ Quiz ~ step:", step);

  const next = () => setStep((s) => s + 1);

  return (
    <SafeAreaView>
      <View style={{ flex: 1, padding: 16 }}>
        {step === 0 && (
          <QuizStep title="How strong do you like your coffee?">
            {["Light", "Medium", "Strong"].map((v) => (
              <OptionCard
                key={v}
                label={v}
                selected={prefs.strength === v}
                onPress={() => {
                  setPref("strength", v);
                  next();
                }}
              />
            ))}
          </QuizStep>
        )}

        {step === 1 && (
          <QuizStep title="Milk preference?">
            {["None", "Regular", "Oat", "Soy"].map((v) => (
              <OptionCard
                key={v}
                label={v}
                selected={prefs.milk === v}
                onPress={() => {
                  setPref("milk", v);
                  next();
                }}
              />
            ))}
          </QuizStep>
        )}

        {step === 2 && (
          <QuizStep title="Sweetness level?">
            {["No sugar", "Less", "Normal"].map((v) => (
              <OptionCard
                key={v}
                label={v}
                selected={prefs.sweetness === v}
                onPress={() => {
                  setPref("sweetness", v);
                  next();
                }}
              />
            ))}
          </QuizStep>
        )}

        {step === 3 && (
          <QuizStep title="Hot or Cold?">
            {["Hot", "Cold"].map((v) => (
              <OptionCard
                key={v}
                label={v}
                selected={prefs.temperature === v}
                onPress={() => {
                  setPref("temperature", v);
                  completeQuiz();
                  router.replace("/(tabs)/home");
                }}
              />
            ))}
          </QuizStep>
        )}
      </View>
    </SafeAreaView>
  );
}
