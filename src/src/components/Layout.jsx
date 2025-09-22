import Header from "./others/Header";
import Footer from "./others/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Header />
      <main className="flex-1 container mx">
        {children}
      </main>
      <Footer />
    </div>
  );
}
