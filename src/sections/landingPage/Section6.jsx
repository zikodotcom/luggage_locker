import ContactForm from "@/components/Contact-form";
import { MessageCircle } from "lucide-react";
import React from "react";

export default function Section6() {
  return (
    <>
      <section id="contact" className="w-full py-20 bg-white">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get in Touch
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <p className="max-w-[900px] text-gray-600 text-lg">
              Have questions or need help? We're here to assist you 24/7 with
              all your luggage storage needs.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
