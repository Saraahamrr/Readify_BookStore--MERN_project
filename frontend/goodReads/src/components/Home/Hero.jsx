import React from 'react'
import "./Hero.css"
import hero from '../../assets/hero.png';
export default function Hero() {
  return (
    <div className='hero' >
      <div className='word'><h1>Discover Your Next Favorite Book! 📚✨</h1>
      
      <p className='para'>world of stories, knowledge, and adventure at our bookstore Start your journey today! </p>

      <a className='books-btn' href="#">Discover Books</a>
      </div>
      <div className='image'>
        <img src={hero} alt="hero image" />
      </div>
    </div>
  )
}
