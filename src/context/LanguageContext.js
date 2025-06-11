"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [translationCache, setTranslationCache] = useState({});
  const [googleTranslateLoaded, setGoogleTranslateLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedLanguage = localStorage.getItem("preferred-language");
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
        setLanguage(savedLanguage);
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && language) {
      localStorage.setItem("preferred-language", language);
    }
  }, [language, isClient]);

  // Enhanced translation function with better error handling
  const translateText = async (text, targetLang, sourceLang = "en") => {
    if (!text || text.trim() === "") return text;

    // Don't translate if target language is the same as source
    if (sourceLang === targetLang) return text;

    // Don't translate if it's English and target is English
    if (targetLang === "en" && sourceLang === "en") return text;

    const cacheKey = `${text}-${sourceLang}-${targetLang}`;

    // Check cache first
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.trim(),
          targetLang,
          sourceLang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Translation API error:", response.status, errorData);
        throw new Error(`Translation failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data.translatedText) {
        console.error("No translated text in response:", data);
        throw new Error("No translated text received");
      }

      const translatedText = data.translatedText;

      // Cache the translation
      setTranslationCache((prev) => ({
        ...prev,
        [cacheKey]: translatedText,
      }));

      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      // Return original text as fallback
      return text;
    }
  };

  // Improved batch translate with rate limiting
  const translateBatch = async (texts, targetLang, sourceLang = "en") => {
    if (!texts || texts.length === 0) return [];

    // Filter out empty texts and create mapping
    const textMap = texts.map((text, index) => ({
      text,
      index,
      original: text,
    }));
    const validTexts = textMap.filter(
      (item) => item.text && item.text.trim() !== ""
    );

    if (validTexts.length === 0) return texts;

    const results = new Array(texts.length);

    // Process in smaller batches to avoid overwhelming the API
    const batchSize = 5;
    const batches = [];

    for (let i = 0; i < validTexts.length; i += batchSize) {
      batches.push(validTexts.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const promises = batch.map(async (item) => {
        try {
          const translated = await translateText(
            item.text,
            targetLang,
            sourceLang
          );
          return { ...item, translated };
        } catch (error) {
          console.error(`Failed to translate: "${item.text}"`, error);
          return { ...item, translated: item.text };
        }
      });

      const batchResults = await Promise.all(promises);

      // Map results back to original positions
      batchResults.forEach((item) => {
        results[item.index] = item.translated;
      });

      // Add delay between batches to avoid rate limiting
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    // Fill in any missing results with original text
    texts.forEach((text, index) => {
      if (results[index] === undefined) {
        results[index] = text;
      }
    });

    return results;
  };

  // Load Google Translate Widget (improved)
  const loadGoogleTranslateWidget = () => {
    return new Promise((resolve, reject) => {
      if (!isClient) {
        reject(new Error("Not on client side"));
        return;
      }

      if (googleTranslateLoaded) {
        resolve();
        return;
      }

      // Check if already loaded
      if (window.google && window.google.translate) {
        setGoogleTranslateLoaded(true);
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      window.googleTranslateElementInit = () => {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi",
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );
          setGoogleTranslateLoaded(true);
          resolve();
        } catch (error) {
          console.error("Google Translate initialization error:", error);
          reject(error);
        }
      };

      script.onerror = (error) => {
        console.error("Failed to load Google Translate script:", error);
        reject(new Error("Failed to load Google Translate"));
      };

      document.head.appendChild(script);
    });
  };

  // Enhanced page translation
  const translatePageContent = async (targetLang) => {
    if (!isClient) return;

    setIsTranslating(true);

    try {
      await loadGoogleTranslateWidget();

      // Wait for widget to be ready
      const waitForWidget = () => {
        return new Promise((resolve) => {
          const checkWidget = () => {
            const selectElement = document.querySelector(
              "#google_translate_element select"
            );
            if (selectElement) {
              resolve(selectElement);
            } else {
              setTimeout(checkWidget, 100);
            }
          };
          checkWidget();
        });
      };

      const selectElement = await waitForWidget();
      selectElement.value = targetLang;
      selectElement.dispatchEvent(new Event("change"));
    } catch (error) {
      console.error("Page translation error:", error);
    } finally {
      setTimeout(() => setIsTranslating(false), 2000);
    }
  };

  // Toggle language with better handling
  const toggleLanguage = async () => {
    if (!isClient) return;

    const newLanguage = language === "en" ? "hi" : "en";
    setLanguage(newLanguage);

    // Only use page translation if needed
    if (newLanguage === "hi") {
      await translatePageContent(newLanguage);
    }
  };

  // Enhanced static translations
  const staticTranslations = {
    en: {
      home: "Home",
      about: "About Us",
      career: "Career",
      contact: "Contact Us",
      faq: "FAQ",
      addJob: "Add Job",
      logout: "Logout",
      departmentLogin: "Department Login",
      more: "More",
      switchToHindi: "Switch to Hindi",
      switchToEnglish: "Switch to English",
      loading: "Loading...",
      searchPlaceholder: "Search...",
      readMore: "Read More",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      previous: "Previous",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Information",
    },
    hi: {
      home: "होम",
      about: "हमारे बारे में",
      career: "करियर",
      contact: "संपर्क करें",
      faq: "सामान्य प्रश्न",
      addJob: "नौकरी जोड़ें",
      logout: "लॉगआउट",
      departmentLogin: "विभाग लॉगिन",
      more: "और",
      switchToHindi: "हिंदी में बदलें",
      switchToEnglish: "अंग्रेजी में बदलें",
      loading: "लोड हो रहा है...",
      searchPlaceholder: "खोजें...",
      readMore: "और पढ़ें",
      submit: "जमा करें",
      cancel: "रद्द करें",
      save: "सेव करें",
      edit: "संपादित करें",
      delete: "हटाएं",
      confirm: "पुष्टि करें",
      back: "वापस",
      next: "अगला",
      previous: "पिछला",
      error: "त्रुटि",
      success: "सफलता",
      warning: "चेतावनी",
      info: "जानकारी",
    },
  };

  const t = (key) => {
    return staticTranslations[language]?.[key] || key;
  };

  // Clear cache function for development
  const clearTranslationCache = () => {
    setTranslationCache({});
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isTranslating,
    isClient,
    t,
    translateText,
    translateBatch,
    translatePageContent,
    translationCache,
    clearTranslationCache,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
      {isClient && (
        <div id="google_translate_element" style={{ display: "none" }}></div>
      )}
    </LanguageContext.Provider>
  );
};
