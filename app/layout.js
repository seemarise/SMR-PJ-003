
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ToastContainer, toast } from 'react-toastify';

export const metadata = {
  title: "Vadai APP",
  description: "Built with Next.js and Tailwind CSS",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen overflow-y-auto bg-white">
        <LayoutWrapper>{children}</LayoutWrapper>
        <ToastContainer />
      </body>

    </html>
  );
}
