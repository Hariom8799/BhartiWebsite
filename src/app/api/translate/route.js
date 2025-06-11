// // pages/api/translate.js (for Pages Router)
// // or app/api/translate/route.js (for App Router)

// import { NextResponse } from "next/server";

// // Using LibreTranslate (free alternative) or Google Translate API
// export async function POST(request) {
//   try {
//     const { text, targetLang, sourceLang = "auto" } = await request.json();

//     if (!text) {
//       return NextResponse.json({ error: "Text is required" }, { status: 400 });
//     }

//     // Option 1: Using LibreTranslate (Free)
//     const libreTranslateResponse = await fetch(
//       "https://libretranslate.de/translate",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           q: text,
//           source: sourceLang === "auto" ? "en" : sourceLang,
//           target: targetLang === "hi" ? "hi" : "en",
//           format: "text",
//         }),
//       }
//     );

//     if (libreTranslateResponse.ok) {
//       const data = await libreTranslateResponse.json();
//       return NextResponse.json({ translatedText: data.translatedText });
//     }

//     // Option 2: Using Google Cloud Translation API (Requires API Key)
//     /*
//     const googleResponse = await fetch(
//       `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           q: text,
//           source: sourceLang,
//           target: targetLang,
//           format: 'text'
//         }),
//       }
//     );

//     if (googleResponse.ok) {
//       const data = await googleResponse.json();
//       return NextResponse.json({ 
//         translatedText: data.data.translations[0].translatedText 
//       });
//     }
//     */

//     // Option 3: Using MyMemory Translation API (Free with limits)
//     const myMemoryResponse = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
//         text
//       )}&langpair=${sourceLang}|${targetLang}`
//     );

//     if (myMemoryResponse.ok) {
//       const data = await myMemoryResponse.json();
//       if (data.responseStatus === 200) {
//         return NextResponse.json({
//           translatedText: data.responseData.translatedText,
//         });
//       }
//     }

//     return NextResponse.json({ error: "Translation failed" }, { status: 500 });
//   } catch (error) {
//     console.error("Translation API error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// // For Pages Router, export as default
// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { text, targetLang, sourceLang = "auto" } = req.body;

//     if (!text) {
//       return res.status(400).json({ error: "Text is required" });
//     }

//     // Using LibreTranslate (Free)
//     const response = await fetch("https://libretranslate.de/translate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         q: text,
//         source: sourceLang === "auto" ? "en" : sourceLang,
//         target: targetLang === "hi" ? "hi" : "en",
//         format: "text",
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return res.status(200).json({ translatedText: data.translatedText });
//     }

//     // Fallback to MyMemory API
//     const fallbackResponse = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
//         text
//       )}&langpair=${sourceLang}|${targetLang}`
//     );

//     if (fallbackResponse.ok) {
//       const fallbackData = await fallbackResponse.json();
//       if (fallbackData.responseStatus === 200) {
//         return res
//           .status(200)
//           .json({ translatedText: fallbackData.responseData.translatedText });
//       }
//     }

//     return res.status(500).json({ error: "Translation failed" });
//   } catch (error) {
//     console.error("Translation API error:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }


import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { text, targetLang, sourceLang = "auto" } = await request.json();

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: "Text and target language are required" },
        { status: 400 }
      );
    }

    // Validate and normalize language codes
    const normalizeLanguageCode = (lang) => {
      const langMap = {
        english: "en",
        hindi: "hi",
        spanish: "es",
        french: "fr",
        german: "de",
        italian: "it",
        portuguese: "pt",
        russian: "ru",
        japanese: "ja",
        korean: "ko",
        chinese: "zh",
        arabic: "ar",
        // Add more mappings as needed
      };

      // If it's already a 2-letter code, return as is
      if (lang.length === 2) {
        return lang.toLowerCase();
      }

      // If it's a full name, convert to code
      return langMap[lang.toLowerCase()] || lang.toLowerCase();
    };

    const normalizedTargetLang = normalizeLanguageCode(targetLang);
    const normalizedSourceLang =
      sourceLang === "auto" ? "auto" : normalizeLanguageCode(sourceLang);

    // Create proper language pair
    const langPair =
      normalizedSourceLang === "auto"
        ? `en|${normalizedTargetLang}` // Default to English when auto-detecting
        : `${normalizedSourceLang}|${normalizedTargetLang}`;

    // Handle long text by truncating if necessary (MyMemory has limits)
    const maxTextLength = 500; // Adjust based on your needs
    const truncatedText =
      text.length > maxTextLength ? text.substring(0, maxTextLength) : text;

    // MyMemory Translation API
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      truncatedText
    )}&langpair=${langPair}`;

    console.log("Translation request:", {
      langPair,
      textLength: truncatedText.length,
      url: url.substring(0, 100) + "...", // Log partial URL for debugging
    });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "NextJSTranslationApp/1.0",
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      console.error(
        "MyMemory API HTTP error:",
        response.status,
        response.statusText
      );
      return NextResponse.json(
        { error: `Translation service error: ${response.status}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("MyMemory response:", data);

    // Check for successful response
    if (data.responseStatus === 200 || data.responseStatus === "200") {
      return NextResponse.json({
        translatedText: data.responseData.translatedText,
        match: data.responseData.match, // Quality score
        sourceLang: normalizedSourceLang,
        targetLang: normalizedTargetLang,
        originalLength: text.length,
        translatedLength: truncatedText.length,
      });
    } else {
      console.error("MyMemory API error:", data);

      // Handle specific error cases
      if (data.responseStatus === 403 || data.responseStatus === "403") {
        return NextResponse.json(
          {
            error: `Invalid language pair: ${langPair}. Please check language codes.`,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error: `Translation failed: ${
            data.responseDetails || "Unknown error"
          }`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Internal server error:", error);

    if (error.name === "AbortError") {
      return NextResponse.json(
        { error: "Translation request timed out" },
        { status: 408 }
      );
    }

    if (error.code === "ENOTFOUND") {
      return NextResponse.json(
        { error: "Translation service unavailable. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}