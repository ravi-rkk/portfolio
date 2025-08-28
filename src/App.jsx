import { useEffect } from 'react'
import Aos from 'aos'
import './App.css'
import React from 'react'
import 'aos/dist/aos.css'
import Hero from './Components/hero/Hero'
import Projects from './Components/projects/Projects'
import Skills from './Components/skill/Skill'
import Contact from './Components/contact/Contact'
import Experience from './Components/experience/Experience'
// import Footer from './Components/footer/Footer'

export default function App() {
  useEffect(()=>{
    Aos.init({
      duration: 1000,
    });
  },[]);
   return (
    <main>
        <Hero/>
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        
        {/* <Footer />
         */}
    </main>
   )
  }