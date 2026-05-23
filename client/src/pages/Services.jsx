import React from 'react'
import SpineTreatmentsIntro from '../components/services/SpineTreatmentsIntro'
import ConditionsWeTreat from '../components/services/ConditionsWeTreat'
import AdvancedProcedures from '../components/services/AdvancedProcedures'
import NonSurgicalCare from '../components/services/NonSurgicalCare'
import ServicesExpertise from '../components/services/ServicesExpertise'

const Services = () => {
    return (
        <>
            <SpineTreatmentsIntro />
            <ServicesExpertise />
            <ConditionsWeTreat />
            <AdvancedProcedures />
            <NonSurgicalCare />
        </>
    )
}

export default Services