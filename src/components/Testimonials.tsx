'use client';

import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { testimonials as testimonialsData } from '@/lib/resume-data';

const testimonials = testimonialsData.map((t, index) => ({
  id: index + 1,
  name: t.author,
  title: `${t.role} ${t.company ? `• ${t.company}` : ''}`,
  avatar: t.author
    .split(' ')
    .map((n) => n[0])
    .join(''),
  rating: 5,
  content: t.text,
}));

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-to-br from-brand-green/10 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-gradient-to-tl from-brand-yellow/10 to-transparent blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green dark:text-brand-yellow dark:bg-brand-yellow/10 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Client Feedback
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 dark:text-slate-100">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-slate-300">
            Real stories from clients who trusted me with their projects
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`relative rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-xl border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                  index === 1
                    ? 'ring-2 ring-brand-yellow/50 dark:ring-brand-yellow/30 scale-105'
                    : ''
                }`}
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-6 w-10 h-10 bg-brand-yellow dark:bg-brand-yellow/80 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-5 h-5 text-white dark:text-slate-900" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-brand-yellow text-brand-yellow"
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="text-gray-700 mb-6 leading-relaxed dark:text-slate-200 line-clamp-5">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-brand-yellow rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-slate-100">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
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
            className="absolute left-0 top-1/2 z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white dark:bg-slate-800 shadow-xl hover:bg-brand-cream dark:hover:bg-slate-700 transition-all hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
          </Button>

          <Button
            onClick={nextTestimonial}
            variant="icon"
            className="absolute right-0 top-1/2 z-10 h-12 w-12 translate-x-1/2 -translate-y-1/2 rounded-full bg-white dark:bg-slate-800 shadow-xl hover:bg-brand-cream dark:hover:bg-slate-700 transition-all hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-brand-green dark:text-brand-yellow" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-brand-green dark:bg-brand-yellow'
                  : 'w-2 bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-20 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-gray-100 dark:border-white/5">
            <div className="text-3xl md:text-4xl font-extrabold text-brand-green mb-1 dark:text-brand-yellow">
              50+
            </div>
            <div className="text-sm text-gray-600 dark:text-slate-400 font-medium">
              Happy Clients
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-gray-100 dark:border-white/5">
            <div className="text-3xl md:text-4xl font-extrabold text-brand-green mb-1 dark:text-brand-yellow">
              5.0
            </div>
            <div className="text-sm text-gray-600 dark:text-slate-400 font-medium">
              Average Rating
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-gray-100 dark:border-white/5">
            <div className="text-3xl md:text-4xl font-extrabold text-brand-green mb-1 dark:text-brand-yellow">
              100%
            </div>
            <div className="text-sm text-gray-600 dark:text-slate-400 font-medium">
              Satisfaction
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
