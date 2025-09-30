"use client"; // Needed to use useRouter

import { Book, Bookmark, Lightbulb, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavbarBottom() {
  const router = useRouter();

  const goToVadTest = () => {
    router.push("/vad-test");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-white py-2">
      {/* Book icon navigates to VAD Test */}
      <Book
        className="h-6 w-6 text-gray-600 cursor-pointer" // cursor pointer
        onClick={goToVadTest}
      />
      <Bookmark className="h-6 w-6 text-gray-600 cursor-pointer" />
      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full -mt-8 shadow-lg cursor-pointer">
        <span className="text-white font-bold">•</span>
      </div>
      <User className="h-6 w-6 text-gray-600 cursor-pointer" />
      <Lightbulb className="h-6 w-6 text-gray-600 cursor-pointer" />
    </nav>
  );
}
