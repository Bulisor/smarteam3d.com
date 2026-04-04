import { Phone, Mail, MapPin } from 'lucide-react'
import ContactForm from '@/components/ui/ContactForm'

const info = [
  { icon: Phone, label: 'Phone', value: 'Not available' },
  { icon: Mail, label: 'Email', value: 'contact@smarteam3d.com' },
  { icon: MapPin, label: 'Address', value: 'Baia Mare, Romania' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-grey">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
            Get in touch
          </h2>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {info.map((item) => (
            <div key={item.label} className="text-center py-6">
              <item.icon size={32} className="mx-auto text-primary mb-3" />
              <h3 className="font-bold text-headings mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {item.label}
              </h3>
              <p className="text-body text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
