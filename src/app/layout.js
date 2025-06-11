import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import "./globals.css";
import "./responsive.css";
import {AuthProvider} from "../context/AuthContext"
import {SiteProvider} from "../context/siteContext"
import { LanguageProvider } from "@/context/LanguageContext";
import Disclaimer from "./components/Disclaimer";

export const metadata = {
  title: "Bharti Job Portal",
  description: "Website for Bharti Job Portal Uttarakhand",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <AuthProvider>
            <SiteProvider>
              <Header />
              <Toaster position="top-center" reverseOrder={false} />
              {children}
              <Footer />
              <Disclaimer/>
            </SiteProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
