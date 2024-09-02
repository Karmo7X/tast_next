
import { Inter } from "next/font/google";
import "./globals.scss";
import { StoreProvider } from "./API/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task",
  description: "Test task",
};

export default function RootLayout({ children }) {
  

  return (
    <html lang="en">
      <body className={inter.className}>
        {<StoreProvider>{children}</StoreProvider>}
      </body>
    </html>
  );
}
