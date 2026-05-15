import React from 'react'
import AboutDoctor from '../components/about/AboutDoctor'
import ServicesTreatments from '../components/about/ServicesTreatments'
import AboutHero from '../components/about/AboutHero'

const About = () => {
    return (
        <>
            <AboutHero />
            <AboutDoctor />
            <ServicesTreatments />
        </>
    )
}

export default About