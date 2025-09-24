import localFont from "next/font/local";
import "./globals.css";
import styles from "@/styles/page.module.css"
import Footer from "@/_components/footer";
import Header from "@/_components/header";


export const metadata = {
  title: "Murtaza Haque's Website",
  description: "My Personal Website!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">  
      
      <body>
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
