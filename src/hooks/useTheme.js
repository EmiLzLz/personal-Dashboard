import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

function useTheme() {
  const [userPreference, setUserPreference] = useLocalStorage("Theme", "auto");
  const [resolvedTheme, setResolvedTheme] = useState("light");

  useEffect(() => {
    if (userPreference === "dark") {
      setResolvedTheme("dark");
    }

    if (userPreference === "light") {
      setResolvedTheme("light");
    }

    if (userPreference === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setResolvedTheme(mediaQuery.matches ? "dark" : "light");

      const listener = (e) => setResolvedTheme(e.matches ? "dark" : "light");

      mediaQuery.addEventListener("change", listener);

      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [userPreference]);

  useEffect(() => {
    const root = document.documentElement; //<html>

    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme]);

  return [userPreference, setUserPreference];
}
