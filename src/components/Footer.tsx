"use client";

import Link from "next/link";

import { useState, type FormEvent } from "react";
import { person } from "@/lib/resume-data";
import { 
  Facebook, 
  Youtube, 
  Twitter, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin,
  Send
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Skills", href: "/skills" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Connect Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Connect there</h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to start your next project? Let's discuss how I can help bring your ideas to life.
          </p>
          <Link href="/contact" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started
          </Link>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Social */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-500">Olivia</h3>
            <p className="text-gray-400 leading-relaxed">
              Full Stack Developer & Cloud Infrastructure Specialist, 
              building scalable web applications and real-time systems.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-400">{person.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-400">{person.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">{person.location}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Get the latest information about my projects and tech insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2024 {person.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                User Terms & Conditions
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
