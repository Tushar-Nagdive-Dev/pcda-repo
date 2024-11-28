import React from 'react'
import Breadcrumbs from '../components/common/Breadcrumbs'
import ContactUsSection from '../components/common/ContactUs/ContactUsSection'

function ContactUs() {
  return (
    <div className="space-y-10 pb-20">
      <Breadcrumbs title="Contact Us" />
      <ContactUsSection />
    </div>
  )
}

export default ContactUs