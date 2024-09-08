import React from 'react'
import Hero from '../HomeComps/Hero/Hero'
import About from '../HomeComps/About/About'
import Members from '../HomeComps/Members/Members'
import Kingdom from '../HomeComps/Kingdom/Kingdom'
import Footer from '../HomeComps/Footer/Footer'
import Title from '../HomeComps/Title/Title'

export default function MyHome() {
  return (
    <div>
        <Hero />
        <Title subtitle='Who we are' title='The Best place to start your life' />
        <About />
        <Title subtitle='Three pillars of Chalkboard LMS' title='The Golden Trio' />
        <Members />
        <Title subtitle='The Testamonials' title='Thoughts of Assets' />
        <Kingdom />
        <Footer />
    </div>
  )
}
