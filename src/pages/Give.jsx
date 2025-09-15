import React from 'react'
import GiveHero from '../components/GiveHero'
import GiveMinistries from '../components/GiveMinistries'
import Donation from './Donation';

const Give = () => {
  return (
    <div>
      <GiveHero />
      <GiveMinistries />
      <Donation/>
    </div>
  )
}

export default Give