import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AccessibilityContext = createContext({
  scale: "",
  setScale: () => {},
  getFontSizeClass: () => {},
  language: "EN",
  updateLanguage: () => {},
});

const AccessibilityContextProvider = ({ children }) => {
  const [scale, setScale] = useState(0.35);
  const [language, setLanguage] = useState("EN");

  // useEffect(() => {
  //   console.log("scale", scale);
  //   // const storedScale = localStorage.getItem("fs");
  //   // setScale(storedScale);
  // }, [scale]);

  const getFontSizeClass = useCallback(
    (baseSize) => {
      const sizes = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"];
      const minScale = 0.35; // Minimum scale
      const maxScale = 1; // Maximum scale
      const baseIndex = sizes.indexOf(baseSize);

      // Map scale to index adjustment
      const scaleAdjustment = Math.round(
        ((scale - minScale) / (maxScale - minScale)) * (sizes.length - 1)
      );
      const newIndex = Math.min(
        sizes.length - 1,
        Math.max(0, baseIndex + scaleAdjustment)
      );
      return sizes[newIndex];
    },
    [scale]
  );

  const updateLanguage = (languageSelection) => {
    setLanguage(languageSelection);
  };

  const contextValue = useMemo(
    () => ({
      scale,
      setScale,
      getFontSizeClass,
      language,
      updateLanguage,
    }),
    [scale, getFontSizeClass, language]
  );

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityContextProvider;
