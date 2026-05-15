import React from 'react'
import SpineTreatmentsIntro from '../components/services/SpineTreatmentsIntro'
import ConditionsWeTreat from '../components/services/ConditionsWeTreat'
import AdvancedProcedures from '../components/services/AdvancedProcedures'
import NonSurgicalCare from '../components/services/NonSurgicalCare'

const Services = () => {
    return (
        <>
            <SpineTreatmentsIntro />
            <ConditionsWeTreat />
            <AdvancedProcedures />
            <NonSurgicalCare />
        </>
    )
}

export default Services