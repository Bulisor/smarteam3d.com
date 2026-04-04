import { Mail, MapPin, Phone } from 'lucide-react'
import ContactForm from '@/components/ui/ContactForm'

export default function CVContact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap gap-0">
          <div className="w-full md:w-1/2 p-3">
            <h1
              className="text-3xl font-bold text-headings mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Let&apos;s talk business
            </h1>
            <p className="text-justify text-sm">
              Now that you know a lot about me, let me know if you are interested to work with me,
              or if there&apos;s any way I can assist you.
            </p>

            <div className="flex items-center mt-6 gap-3">
              <Mail size={20} className="text-primary flex-shrink-0" />
              <span className="text-sm">contact@smarteam3d.com</span>
            </div>
            <div className="flex items-center mt-4 gap-3">
              <MapPin size={20} className="text-primary flex-shrink-0" />
              <span className="text-sm">Baia Mare, Romania</span>
            </div>
            <div className="flex items-center mt-4 gap-3">
              <Phone size={20} className="text-primary flex-shrink-0" />
              <span className="text-sm text-body">Not available</span>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
