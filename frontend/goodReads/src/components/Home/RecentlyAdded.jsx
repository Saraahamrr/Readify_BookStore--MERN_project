import React, { useState } from 'react'
import "./RecentlyAdded.css"
import axios from "axios"
import Card from '../BookCard/Card'
import { useEffect } from 'react'
export default function RecentlyAdded() {
    const[Data,setData]=useState() 
    useEffect(()=>{
      const fetch =async()=>{
       const response= await axios.get("http://localhost:3000/api/books")
       console.log(response)
       fetch()
      }

    },[])
  return (
    <div className='recent'>
      <h4 className='title'>Recently Added</h4>
      <Card/>
    </div>
  )
}
