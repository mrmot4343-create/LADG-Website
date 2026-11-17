import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FocusAreas } from "./components/FocusAreas";
import { Approach } from "./components/Approach";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <FocusAreas />
        <Approach />
      </main>
      <Footer />
    </div>
  );
}
