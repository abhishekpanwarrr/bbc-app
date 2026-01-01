// import { DarkTheme, LightTheme } from "@/constants/theme";
// import { load, save } from "@/lib/storage";
// import { createContext, useContext, useState } from "react";
// import { useColorScheme } from "react-native";

// const ThemeContext = createContext<any>(null);
// const savedTheme = load("theme", "system");

// export const ThemeProvider = ({ children }: any) => {
//   const scheme = useColorScheme();
//   const [dark, setDark] = useState(scheme === "dark");

//   const theme = dark ? DarkTheme : LightTheme;
//   const toggle = (v: boolean) => {
//     setDark(v);
//     save("theme", v ? "dark" : "light");
//   };
//   return (
//     <ThemeContext.Provider value={{ theme, dark, setDark }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);

import { DarkTheme, LightTheme } from "@/constants/theme";
import { load, save } from "@/lib/storage";
import { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeContextType = {
  theme: typeof LightTheme;
  dark: boolean;
  toggleTheme: (v: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const savedTheme = load<"dark" | "light" | "system">("theme", "system");

  const initialDark =
    savedTheme === "system" ? systemScheme === "dark" : savedTheme === "dark";

  const [dark, setDark] = useState(initialDark);

  const toggleTheme = (v: boolean) => {
    setDark(v);
    save("theme", v ? "dark" : "light");
  };

  const theme = dark ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
};
