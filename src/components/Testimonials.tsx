'use client';

import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/FadeIn';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials as testimonialsData } from '@/lib/resume-data';

const testimonials = testimonialsData.map((t, index) => ({
  id: index + 1,
  name: t.author,
  title: `${t.role} ${t.company ? `\u2022 ${t.company}` : ''}`,
  avatar: t.author
    .split(' ')
    .map((n) => n[0])
    .join(''),
  rating: 5,
  content: t.text,
}));

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section
      className="section-padding bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full bg-brand-green/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="text-center mb-14">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-brand-green/20 dark:bg-emerald-500/20" />
            <span className="text-brand-green dark:text-emerald-400">
              Testimonials
            </span>
            <span className="h-px w-8 bg-brand-green/20 dark:bg-emerald-500/20" />
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            What Clients Say
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Real stories from clients who trusted me with their projects
          </p>
        </FadeIn>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`relative card-premium p-6 sm:p-8 transition-all duration-300 ${
                    index === 1
                      ? 'ring-2 ring-brand-green/20 dark:ring-emerald-500/30 md:scale-105 md:shadow-elevated'
                      : ''
                  }`}
                >
                  <div className="absolute -top-3 left-6 w-9 h-9 bg-brand-green dark:bg-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                    <Quote className="w-4 h-4 text-white" />
                  </div>

                  <div
                    className="flex gap-0.5 mb-4 mt-2"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-sm line-clamp-5">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                    <div className="w-11 h-11 bg-gradient-to-br from-brand-green to-brand-greenDark dark:from-emerald-500 dark:to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-xs">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button
            onClick={prevTestimonial}
            variant="icon"
            className="absolute left-0 top-1/2 z-10 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-slate-800 shadow-elevated hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hidden md:flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-brand-green dark:text-emerald-400" />
          </Button>

          <Button
            onClick={nextTestimonial}
            variant="icon"
            className="absolute right-0 top-1/2 z-10 h-11 w-11 translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-slate-800 shadow-elevated hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hidden md:flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-brand-green dark:text-emerald-400" />
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${
                index === currentIndex
                  ? 'w-8 bg-brand-green dark:bg-emerald-500'
                  : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { to: 50, suffix: '+', label: 'Happy Clients' },
            { to: 5.0, decimals: 1, label: 'Average Rating' },
            { to: 100, suffix: '%', label: 'Satisfaction' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 sm:p-6 card-premium group"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-green dark:text-brand-greenLight mb-1 transition-transform duration-300 group-hover:scale-105">
                <AnimatedCounter
                  to={stat.to}
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix || ''}
                />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
