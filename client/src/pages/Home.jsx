import React from 'react'
import Navbar from '../components/Navbar'
import IndexHome from '../components/home/IndexHome'
import AboutDoctor from '../components/home/AboutDoctor'
import ServicesTreatments from '../components/home/ServicesTreatments'
import EventParticipation from '../components/home/EventParticipation'

const Home = () => {
    return (
        <>
            <Navbar />
            <IndexHome />
            <AboutDoctor />
            <ServicesTreatments />
            <EventParticipation />
        </>
    )
}

export default Home