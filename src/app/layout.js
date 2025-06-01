import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import "./globals.css";
import {AuthProvider} from "../context/AuthContext"
import {SiteProvider} from "../context/siteContext"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SiteProvider>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
            <Footer />
          </SiteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
