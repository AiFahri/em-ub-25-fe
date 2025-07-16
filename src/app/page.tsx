import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import Berita from '../components/landingpage/Berita';
import Hero from '../components/landingpage/Hero';
import ProgramKerja from '../components/landingpage/ProgramKerja';
import TautanPintas from '../components/landingpage/TautanPintas';
import Welcome from '../components/landingpage/Welcome';

export default function Home() {
  return (
    <main className="pt-28 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Welcome />
      <TautanPintas />
      <Berita />
      <ProgramKerja />
      <Footer />
    </main>
  );
}