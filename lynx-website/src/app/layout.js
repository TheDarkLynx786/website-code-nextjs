import localFont from "next/font/local";
import "./globals.css";
import styles from "./page.module.css"
import Footer from "@/_components/footer";
import Header from "@/_components/header";


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
        <div className={styles.mainDiv}>
          <main>
            <Header />
            {children}
            <Footer />
          </main>   
        </div>
      </body>
    
    </html>
  );
}
