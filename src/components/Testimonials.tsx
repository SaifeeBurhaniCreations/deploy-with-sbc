
import React from 'react';

const testimonials = [
  {
    quote: "We deployed in 5 minutes — our client was impressed with the seamless experience.",
    author: "Jane Smith",
    position: "CTO, TechStartup",
  },
  {
    quote: "SBC-Deploy eliminated our DevOps overhead for client demos. Now we can focus on building features.",
    author: "Michael Johnson",
    position: "Lead Developer, Agency X",
  },
  {
    quote: "The subdomain feature is brilliant. We can now onboard clients in minutes instead of days.",
    author: "Sarah Williams",
    position: "Product Manager, SaaS Co.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-8 lg:px-20 bg-gradient-to-r from-gradient-start to-gradient-end text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Teams Are Saying</h2>
          <p className="max-w-2xl mx-auto opacity-80">
            Early access users are already seeing results with SBC-Deploy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <svg className="h-8 w-8 text-white/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <p className="mb-6 text-lg">{testimonial.quote}</p>
              
              <div>
                <h4 className="font-semibold">{testimonial.author}</h4>
                <p className="text-sm opacity-80">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
