import { DarkTheme, LightTheme } from "@/constants/theme";
import { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const scheme = useColorScheme();
  const [dark, setDark] = useState(scheme === "dark");

  const theme = dark ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
