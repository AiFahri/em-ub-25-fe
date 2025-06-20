import Footer from './Components/common/Footer';
import Navbar from './Components/common/Navbar';
import Berita from './Components/LandingPage/Berita';
import Hero from './Components/LandingPage/Hero';
import ProgramKerja from './Components/LandingPage/ProgramKerja';
import TautanPintas from './Components/LandingPage/TautanPintas';
import Welcome from './Components/LandingPage/Welcome';
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Welcome />
      <Berita />
      <ProgramKerja />
      <TautanPintas />
      <Footer />
    </main>
  );
}
