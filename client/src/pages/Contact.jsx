import React, { useEffect } from 'react';
import ContactSection from '../components/contact/ContactSection'

const Contact = () => {

  useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

  return (
    <>
        <ContactSection />
    </>
  )
}

export default Contact