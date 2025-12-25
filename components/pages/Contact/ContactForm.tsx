'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section ref={ref} className="py-32 px-6 lg:px-8 bg-cream-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display text-brown-800 mb-8">
              Let's Start a Conversation
            </h2>
            <p className="text-brown-700 text-lg mb-12 leading-relaxed">
              Whether you're looking to transform your home or create an inspiring
              commercial space, we're here to help bring your vision to life.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-brown-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown-800 mb-1">Email</h3>
                  <a href="mailto:hello@studio54.com" className="text-brown-600 hover:text-brown-800">
                    hello@studio54.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-brown-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown-800 mb-1">Phone</h3>
                  <a href="tel:+919251004513" className="text-brown-600 hover:text-brown-800">
                    +91 9251004513
                  </a><br></br>
                   <a href="tel:+918619069462" className="text-brown-600 hover:text-brown-800">
                    +91 8619069462
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brown-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown-800 mb-1">Address</h3>
                  <p className="text-brown-600">
                    123 Design Street<br />
                    Creative City, CC 12345
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-brown-800 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-beige-100 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-brown-800"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-brown-800 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-beige-100 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-brown-800"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-brown-800 font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-beige-100 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-brown-800"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-brown-800 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-beige-100 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-brown-800 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-brown-800 text-cream-50 font-medium rounded-full hover:bg-brown-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                data-cursor-text="Send"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}




