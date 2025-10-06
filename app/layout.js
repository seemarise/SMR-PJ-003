
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "Vadai APP",
  description: "Built with Next.js and Tailwind CSS",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen overflow-y-auto">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>

    </html>
  );
}
