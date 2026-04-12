import { Routes, Route } from 'react-router-dom';
import TopBar from './components/Header/TopBar';
import MainNav from './components/Header/MainNav';
import HeroBanner from './components/Hero/HeroBanner';
import ProductCards from './components/QuickAccess/ProductCards';
import PromoBanner from './components/Promotions/PromoBanner';
import GuidanceCards from './components/Promotions/GuidanceCards';
import FargoSection from './components/Fargo/FargoSection';
import CommunitySection from './components/Community/CommunitySection';
import FooterHelp from './components/Footer/FooterHelp';
import FooterLinks from './components/Footer/FooterLinks';
import FooterDisclaimer from './components/Footer/FooterDisclaimer';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff' }}>
      <TopBar />
      <MainNav />
      <HeroBanner />
      <ProductCards />
      <PromoBanner />
      <GuidanceCards />
      <FargoSection />
      <CommunitySection />
      <FooterHelp />
      <FooterLinks />
      <FooterDisclaimer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/accounts" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
