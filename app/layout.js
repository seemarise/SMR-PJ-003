import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "My Next.js App",
  description: "Built with Next.js and Tailwind CSS",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
// <<<<<<< DJ_dev
      <body className="min-h-screen flex flex-col">
        <body className="min-h-screen flex flex-col">
          <LayoutWrapper>{children}</LayoutWrapper>
        </body>
//   =======
//       <body className="bg-gray-50 text-gray-900">
        {children}
// >>>>>>> classroom-module
      </body>
    </html>
  );
}
