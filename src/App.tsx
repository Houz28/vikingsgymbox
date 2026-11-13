import { CtaFinal } from "./components/CtaFinal";
import { Disciplinas } from "./components/Disciplinas";
import { ElBox } from "./components/ElBox";
import { Footer } from "./components/Footer";
import { Galeria } from "./components/Galeria";
import { Hero } from "./components/Hero";
import { Horarios } from "./components/Horarios";
import { Navbar } from "./components/Navbar";
import { Opiniones } from "./components/Opiniones";
import { Planes } from "./components/Planes";
import { Ubicacion } from "./components/Ubicacion";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

export default function App() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Disciplinas />
        <ElBox />
        <Planes />
        <Horarios />
        <Galeria />
        <Opiniones />
        <CtaFinal />
        <Ubicacion />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
