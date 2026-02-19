"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { testimonials as testimonialsData } from "@/lib/resume-data";

const testimonials = testimonialsData.map((t, index) => ({
  id: index + 1,
  name: t.author,
  title: `${t.role} ${t.company ? `• ${t.company}` : ""}`,
  avatar: t.author.split(" ").map((n) => n[0]).join(""),
  rating: 5,
  content: t.text,
}));

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
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-brand-green uppercase tracking-wide mb-2 dark:text-brand-yellow">
            Clients Testimonials
          </h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-4 dark:text-slate-100">
            The Impact of My Work: Client Testimonials
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-slate-300">
            Hear what my clients have to say about working with me on their projects.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`rounded-2xl bg-brand-cream p-8 shadow-lg transition-all duration-500 dark:bg-slate-900/60 dark:ring-1 dark:ring-white/10 ${
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
                <p className="text-gray-700 mb-6 leading-relaxed dark:text-slate-200">
                  &quot;{testimonial.content}&quot;
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-300">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <Button
            onClick={prevTestimonial}
            variant="icon"
            className="absolute left-0 top-1/2 z-10 h-12 w-12 -translate-x-4 -translate-y-1/2 rounded-full bg-white shadow-lg hover:bg-brand-cream dark:bg-slate-900 dark:hover:bg-slate-800"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
          </Button>
          
          <Button
            onClick={nextTestimonial}
            variant="icon"
            className="absolute right-0 top-1/2 z-10 h-12 w-12 translate-x-4 -translate-y-1/2 rounded-full bg-white shadow-lg hover:bg-brand-cream dark:bg-slate-900 dark:hover:bg-slate-800"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
          </Button>
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
            <div className="text-4xl font-extrabold text-brand-green mb-2 dark:text-brand-yellow">50+</div>
            <div className="text-gray-600 dark:text-slate-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2 dark:text-brand-yellow">5.0</div>
            <div className="text-gray-600 dark:text-slate-300">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-green mb-2 dark:text-brand-yellow">100%</div>
            <div className="text-gray-600 dark:text-slate-300">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
