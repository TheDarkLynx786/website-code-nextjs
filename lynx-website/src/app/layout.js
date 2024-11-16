import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import Sidebar from "@/app/_components/sidebar";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Murtaza Haque's Website",
  description: "My Personal Website!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">  
      
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        <Header />
        <Sidebar />
        {children}
        <Footer />
      
      </body>
    
    </html>
  );
}
