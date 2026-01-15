"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "CEO, TechStart Inc.",
    avatar: "SJ",
    rating: 5,
    content: "Nikhil delivered an exceptional airline booking system that reduced our processing time by 80%. His expertise in NDC APIs and real-time systems is unmatched. Highly recommended for complex travel technology projects."
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "CTO, TravelHub",
    avatar: "MC",
    rating: 5,
    content: "Working with Nikhil was a game-changer for our platform. He built a scalable architecture that handles 1000+ daily bookings with 99.9% uptime. His full-stack skills and problem-solving abilities are outstanding."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Product Manager, AeroConnect",
    avatar: "ER",
    rating: 5,
    content: "Nikhil's expertise in React and Node.js helped us launch our product 3 months ahead of schedule. The real-time features he implemented using WebSockets have significantly improved user experience."
  },
  {
    id: 4,
    name: "David Kim",
    title: "Founder, Kosher Fest",
    avatar: "DK",
    rating: 5,
    content: "The event platform Nikhil built for us integrated seamlessly with multiple airline APIs. His attention to detail and ability to handle complex integrations made our international event a huge success."
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "VP Engineering, CloudTech",
    avatar: "LT",
    rating: 5,
    content: "Nikhil's cloud infrastructure expertise helped us optimize our server management and reduce costs by 40%. His DevOps skills and proactive approach to system monitoring are invaluable."
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Director, E-commerce Solutions",
    avatar: "JW",
    rating: 5,
    content: "The e-commerce platform Nikhil developed exceeded our expectations. His performance optimization techniques improved our load times by 50%, resulting in better conversion rates."
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-brand-green uppercase tracking-wide mb-2">
            Clients Testimonials
          </h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            The Impact of My Work: Client Testimonials
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what my clients have to say about working with me on their projects.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`rounded-2xl bg-brand-cream p-8 shadow-lg transition-all duration-500 ${
                  index === 1 ? 'ring-2 ring-brand-yellow scale-105' : ''
                }`}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>
                
                {/* Testimonial Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-cream transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-brand-green" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-cream transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-brand-green" />
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-brand-yellow'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2">50+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2">5.0</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2">100%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
