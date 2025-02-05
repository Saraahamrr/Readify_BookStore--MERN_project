import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'
import AboutUs from '../components/AboutUs/AboutUs'


export default function Home() {
  return (
    <div className="bg-red-500 text-black px-10 py-12">
       <Hero/>
       <RecentlyAdded/>
       <AboutUs/>
    </div>
  )
}
