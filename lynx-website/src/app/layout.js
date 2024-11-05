import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";


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
  description: "My personal website!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">  
      
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        <Header title={metadata.title} />
        {children}
        <Footer />
      
      </body>
    
    </html>
  );
}