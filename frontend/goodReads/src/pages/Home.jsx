import React from 'react'
import Hero from '../components/Home/Hero'
import AboutUs from '../components/AboutUs/AboutUs'
import Popular from '../components/Home/Popular'
import Recent from '../components/Recent'


export default function Home() {
  return (
    <div className="bg-red-500 text-black px-10 py-12">
       <Hero/>
       <Popular/>
       <Recent/>
       {/* <Authors /> */}
       <AboutUs/>
    </div>
  )
}
