import SEO from "../components/SEO";
import { useEffect } from 'react';
import BackgroundGlow from '../components/BackgroundGlow';
import GlassNav from '../components/GlassNav';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Collection from '../components/Collection';
import About from '../components/About';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <BackgroundGlow />
      <GlassNav />
      <Hero />
      <Marquee />
      <Collection />
      <About />
      <Reviews />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
