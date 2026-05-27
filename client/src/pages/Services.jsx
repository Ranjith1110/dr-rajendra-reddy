import React, { useEffect } from 'react';
import SpineTreatmentsIntro from '../components/services/SpineTreatmentsIntro'
import ConditionsWeTreat from '../components/services/ConditionsWeTreat'
import AdvancedProcedures from '../components/services/AdvancedProcedures'
import NonSurgicalCare from '../components/services/NonSurgicalCare'
import ServicesExpertise from '../components/services/ServicesExpertise'

const Services = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

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