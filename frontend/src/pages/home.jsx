import Header from '../components/Header'
import Hero from '../components/hero'
import OurStory from '../components/OurStory'
import ProjectsSection from '../components/ProjectSection'
import WhyUs from '../components/WhyUs'
import BuildCTA from '../components/BuildCta'
import Footer from '../components/Footer'

const home = () => {
  return (
    <div className="w-full">
      < Header/>
      < Hero />
      < OurStory />
      < ProjectsSection />
      < WhyUs />
      < BuildCTA />
      < Footer />
    </div>
  )
}

export default home
