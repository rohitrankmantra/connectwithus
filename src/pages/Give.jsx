import React from 'react'
import GiveHero from '../components/GiveHero'
import GiveMinistries from '../components/GiveMinistries'
import GiveDonationForm from '../components/GiveDonationForm'

const Give = () => {
  return (
    <div>
      <GiveHero />
      <GiveMinistries />
      <GiveDonationForm/>
    </div>
  )
}

export default Give