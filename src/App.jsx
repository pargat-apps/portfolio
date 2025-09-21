import { Provider } from 'react-redux'
import { store } from './store/store'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import LeetCode from './components/LeetCode'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background text-accent-foreground">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <LeetCode />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </Provider>
  )
}

export default App