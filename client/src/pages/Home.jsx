import React from 'react'
import Navbar from '../components/Navbar'
import IndexHome from '../components/home/IndexHome'
import AboutDoctor from '../components/home/AboutDoctor'
import ServicesTreatments from '../components/home/ServicesTreatments'

const Home = () => {
    return (
        <>
            <Navbar />
            <IndexHome />
            <AboutDoctor />
            <ServicesTreatments />
        </>
    )
}

export default Home