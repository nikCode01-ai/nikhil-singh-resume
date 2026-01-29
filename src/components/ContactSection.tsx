"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { person } from "@/lib/resume-data";
import { Phone, Mail, MapPin, Send, Linkedin, Gitlab } from "lucide-react";
import { Button } from "@/components/Button";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    budget: "",
    country: "",
    message: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section className="bg-brand-cream py-20 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="h-px w-5 bg-brand-yellow" />
            <span className="text-brand-green dark:text-brand-yellow">Contact</span>
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Let’s Talk
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300">
            Have a project in mind? I’d love to hear about it. Fill out the form below and I’ll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-brand-green mb-6 dark:text-brand-yellow">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center ring-1 ring-brand-green/10 dark:bg-slate-900 dark:ring-white/10">
                    <Phone className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">Phone</p>
                    <p className="text-gray-600 dark:text-slate-300">{person.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center ring-1 ring-brand-green/10 dark:bg-slate-900 dark:ring-white/10">
                    <Mail className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">Email</p>
                    <p className="text-gray-600 dark:text-slate-300">{person.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center ring-1 ring-brand-green/10 dark:bg-slate-900 dark:ring-white/10">
                    <Linkedin className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">LinkedIn</p>
                    <a className="text-gray-600 hover:text-brand-green transition-colors dark:text-slate-300 dark:hover:text-brand-yellow" href={person.linkedinUrl}>
                      {person.linkedinUrl}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center ring-1 ring-brand-green/10 dark:bg-slate-900 dark:ring-white/10">
                    <Gitlab className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">GitLab</p>
                    <a className="text-gray-600 hover:text-brand-green transition-colors dark:text-slate-300 dark:hover:text-brand-yellow" href={person.gitlabUrl}>
                      {person.gitlabHandle}
                    </a>
                  </div>
                </div>

                {person.location ? (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center ring-1 ring-brand-green/10 dark:bg-slate-900 dark:ring-white/10">
                      <MapPin className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-slate-100">Address</p>
                      <p className="text-gray-600 dark:text-slate-300">{person.location}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            
            {/* Response Time */}
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-900/5 dark:bg-slate-900/60 dark:ring-white/10">
              <h4 className="font-bold text-gray-900 mb-2 dark:text-slate-100">Response Time</h4>
              <p className="text-gray-700 dark:text-slate-300">
                I typically respond to inquiries within 24 hours. For urgent projects, 
                please mention it in your message.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 ring-1 ring-slate-900/5 dark:bg-slate-900/60 dark:ring-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-200">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-brand-yellow dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-200">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-brand-yellow dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-200">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-brand-yellow dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-200">
                    I&apos;m Interested in *
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-brand-yellow dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="cloud-services">Cloud Services</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-200">
                    Budget Range (USD) *
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-brand-yellow dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="">Select budget range</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000-25000">$10,000 - $25,000</option>
                    <option value="25000-50000">$25,000 - $50,000</option>
                    <option value="50000+">$50,000+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-200">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-brand-yellow dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="">Select country</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                    <option value="au">Australia</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-200">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-brand-yellow dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <Button type="submit" variant="primary" size="lg" fullWidth>
                <Send className="h-4 w-4" aria-hidden="true" />
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
