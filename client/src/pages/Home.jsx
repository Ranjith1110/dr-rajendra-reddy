import React from 'react'
import IndexHome from '../components/home/IndexHome'
import EventParticipation from '../components/home/EventParticipation'
import ProfessionalExperience from '../components/home/ProfessionalExperience'
import StatsMarquee from '../components/home/StatsMarquee'
import ConditionsTreat from '../components/home/ConditionsTreat'
import OurApproach from '../components/home/OurApproach'
import InsidePractice from '../components/home/InsidePractice'
import InternationalTraining from '../components/home/InternationalTraining'

const Home = () => {
    return (
        <>
            <IndexHome />
            <StatsMarquee />
            <ConditionsTreat />
            <OurApproach />
            <InsidePractice />
            <InternationalTraining />
            <EventParticipation />
            <ProfessionalExperience />
        </>
    )
}

export default Home