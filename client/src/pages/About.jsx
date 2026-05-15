import React from 'react'
import AboutDoctor from '../components/about/AboutDoctor'
import ServicesTreatments from '../components/about/ServicesTreatments'
import AboutHero from '../components/about/AboutHero'
import EducationTraining from '../components/about/EducationTraining'

const About = () => {
    return (
        <>
            <AboutHero />
            <AboutDoctor />
            <ServicesTreatments />
            <EducationTraining />
        </>
    )
}

export default About