import { Phone, Mail, MapPin } from 'lucide-react'
import ContactForm from '@/components/ui/ContactForm'

const info = [
  {
    icon: Phone,
    label: 'Phone',
    value: 'Not available',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@smarteam3d.com',
    href: 'mailto:contact@smarteam3d.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Baia Mare, Romania',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Get in Touch
          </h2>
          <div className="w-10 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-color)' }}>
              Have a project in mind or want to explore what&apos;s possible with 3D technology?
              Reach out — we&apos;d love to hear from you.
            </p>

            {info.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-0.5 text-primary">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm hover:text-primary transition-colors"
                      style={{ color: 'var(--heading-color)' }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm" style={{ color: 'var(--heading-color)' }}>
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            <div
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
