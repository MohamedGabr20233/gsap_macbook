import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import ProductViewer from "./components/ProductViewer";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import Showcase from "./components/Showcase";
import Performance from "./components/Performance";
import Highlight from "./components/Highlight";
import Features from "./components/Features";
import Footer from "./components/Footer";

// we have to make plugin our gsap manually to make it globally accessibly
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Highlight />
      <Features />
      <Footer />
    </main>
  );
};

export default App;
