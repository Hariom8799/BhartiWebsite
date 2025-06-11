// hooks/useTranslation.js
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Hook for translating single text with debouncing
export const useTranslatedText = (originalText, dependencies = []) => {
  const { language, translateText } = useLanguage();
  const [translatedText, setTranslatedText] = useState(originalText);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // Reset error when text changes
    setError(null);

    if (!originalText || !originalText.trim() || language === "en") {
      setTranslatedText(originalText);
      return;
    }

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const translateAsync = async () => {
      setIsLoading(true);
      abortControllerRef.current = new AbortController();

      try {
        const translated = await translateText(originalText, language, "en");

        // Check if request was aborted
        if (abortControllerRef.current.signal.aborted) {
          return;
        }

        setTranslatedText(translated);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          return; // Request was cancelled, ignore
        }

        console.error("Translation error:", error);
        setError(error.message || "Translation failed");
        setTranslatedText(originalText); // Fallback to original
      } finally {
        if (!abortControllerRef.current?.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    // Debounce translation requests
    const timeoutId = setTimeout(translateAsync, 300);

    return () => {
      clearTimeout(timeoutId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [originalText, language, translateText, ...dependencies]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { translatedText, isLoading, error };
};

// Hook for translating arrays of text with better performance
export const useTranslatedArray = (originalArray, textKey = null) => {
  const { language, translateBatch } = useLanguage();
  const [translatedArray, setTranslatedArray] = useState(originalArray);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousArrayRef = useRef();

  const memoizedArray = useCallback(() => {
    if (!originalArray) return [];
    return Array.isArray(originalArray) ? originalArray : [];
  }, [originalArray]);

  useEffect(() => {
    const currentArray = memoizedArray();

    // Skip if array hasn't changed
    if (previousArrayRef.current === currentArray) {
      return;
    }
    previousArrayRef.current = currentArray;

    setError(null);

    if (!currentArray.length || language === "en") {
      setTranslatedArray(currentArray);
      return;
    }

    const translateAsync = async () => {
      setIsLoading(true);
      try {
        if (textKey) {
          // For array of objects with specific text key
          const textsToTranslate = currentArray
            .map((item) => item?.[textKey] || "")
            .filter((text) => text.trim() !== "");

          if (textsToTranslate.length === 0) {
            setTranslatedArray(currentArray);
            return;
          }

          const translatedTexts = await translateBatch(
            textsToTranslate,
            language,
            "en"
          );

          const translatedArray = currentArray.map((item, index) => {
            if (!item || !item[textKey] || item[textKey].trim() === "") {
              return item;
            }

            const textIndex =
              currentArray
                .slice(0, index + 1)
                .filter((i) => i?.[textKey]?.trim() !== "").length - 1;

            return {
              ...item,
              [textKey]: translatedTexts[textIndex] || item[textKey],
            };
          });

          setTranslatedArray(translatedArray);
        } else {
          // For simple array of strings
          const validTexts = currentArray.filter(
            (text) => typeof text === "string" && text.trim() !== ""
          );

          if (validTexts.length === 0) {
            setTranslatedArray(currentArray);
            return;
          }

          const translatedTexts = await translateBatch(
            validTexts,
            language,
            "en"
          );

          const translatedArray = currentArray.map((text, index) => {
            if (typeof text !== "string" || text.trim() === "") {
              return text;
            }

            const textIndex =
              currentArray
                .slice(0, index + 1)
                .filter((t) => typeof t === "string" && t.trim() !== "")
                .length - 1;

            return translatedTexts[textIndex] || text;
          });

          setTranslatedArray(translatedArray);
        }
        setError(null);
      } catch (error) {
        console.error("Batch translation error:", error);
        setError(error.message || "Batch translation failed");
        setTranslatedArray(currentArray); // Fallback to original
      } finally {
        setIsLoading(false);
      }
    };

    translateAsync();
  }, [memoizedArray, language, textKey, translateBatch]);

  return { translatedArray, isLoading, error };
};

// Hook for translating complex objects
export const useTranslatedObject = (originalObject, fieldsToTranslate = []) => {
  const { language, translateBatch } = useLanguage();
  const [translatedObject, setTranslatedObject] = useState(originalObject);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);

    if (!originalObject || !fieldsToTranslate.length || language === "en") {
      setTranslatedObject(originalObject);
      return;
    }

    const translateAsync = async () => {
      setIsLoading(true);
      try {
        const textsToTranslate = fieldsToTranslate
          .map((field) => originalObject[field] || "")
          .filter((text) => text.trim() !== "");

        if (textsToTranslate.length === 0) {
          setTranslatedObject(originalObject);
          return;
        }

        const translatedTexts = await translateBatch(
          textsToTranslate,
          language,
          "en"
        );

        const translatedObject = { ...originalObject };
        let textIndex = 0;

        fieldsToTranslate.forEach((field) => {
          if (originalObject[field] && originalObject[field].trim() !== "") {
            translatedObject[field] =
              translatedTexts[textIndex] || originalObject[field];
            textIndex++;
          }
        });

        setTranslatedObject(translatedObject);
        setError(null);
      } catch (error) {
        console.error("Object translation error:", error);
        setError(error.message || "Object translation failed");
        setTranslatedObject(originalObject);
      } finally {
        setIsLoading(false);
      }
    };

    translateAsync();
  }, [originalObject, language, fieldsToTranslate.join(","), translateBatch]);

  return { translatedObject, isLoading, error };
};

// Component wrapper for auto-translation with error handling
export const TranslatedText = ({
  children,
  className = "",
  tag = "span",
  showError = false,
  fallback = null,
}) => {
  const { translatedText, isLoading, error } = useTranslatedText(children);

  const Component = tag;

  if (error && showError) {
    return (
      <Component className={`${className} translation-error`} title={error}>
        {fallback || children}
      </Component>
    );
  }

  return (
    <Component className={className}>
      {isLoading ? fallback || children : translatedText}
    </Component>
  );
};

// Component for translating HTML content with sanitization
export const TranslatedHTML = ({
  html,
  className = "",
  showError = false,
  fallback = null,
}) => {
  const { translatedText, isLoading, error } = useTranslatedText(html);

  if (error && showError) {
    return (
      <div className={`${className} translation-error`} title={error}>
        <div dangerouslySetInnerHTML={{ __html: fallback || html }} />
      </div>
    );
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: isLoading ? fallback || html : translatedText,
      }}
    />
  );
};

// Hook for managing translation state across multiple components
export const useTranslationManager = () => {
  const { language, isTranslating, clearTranslationCache } = useLanguage();
  const [translationQueue, setTranslationQueue] = useState([]);
  const [completedTranslations, setCompletedTranslations] = useState(0);

  const addToQueue = (id) => {
    setTranslationQueue((prev) => [...prev, id]);
  };

  const removeFromQueue = (id) => {
    setTranslationQueue((prev) => prev.filter((item) => item !== id));
    setCompletedTranslations((prev) => prev + 1);
  };

  const resetQueue = () => {
    setTranslationQueue([]);
    setCompletedTranslations(0);
  };

  return {
    language,
    isTranslating,
    translationQueue,
    completedTranslations,
    addToQueue,
    removeFromQueue,
    resetQueue,
    clearTranslationCache,
  };
};
