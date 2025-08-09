"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  Shield,
  CreditCard,
  Package,
  MapPin,
  Phone,
  MessageCircle,
  BookOpen,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const FAQ_DATA = [
  {
    id: "payment",
    category: "Payments",
    icon: CreditCard,
    color: "from-green-400 to-green-600",
    items: [
      {
        question: "How can I pay for the service?",
        answer:
          "You can pay using all major credit cards and online payment gateways.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, we use industry-standard encryption to keep your information safe.",
      },
    ],
  },
  {
    id: "security",
    category: "Security",
    icon: Shield,
    color: "from-red-400 to-pink-600",
    items: [
      {
        question: "Are my belongings safe?",
        answer:
          "Yes, we partner only with verified locations that ensure high-security standards.",
      },
    ],
  },
  {
    id: "locations",
    category: "Locations",
    icon: MapPin,
    color: "from-blue-400 to-purple-600",
    items: [
      {
        question: "Where are you located?",
        answer: "We have storage locations in major cities around the world.",
      },
    ],
  },
  {
    id: "packages",
    category: "Packages",
    icon: Package,
    color: "from-yellow-400 to-yellow-600",
    items: [
      {
        question: "Do you offer long-term storage packages?",
        answer:
          "Yes, we offer both short-term and long-term storage solutions.",
      },
    ],
  },
];

const POPULAR_TOPICS = [
  { title: "How to make a payment", category: "Payments", views: "1200 views" },
  {
    title: "Storage security details",
    category: "Security",
    views: "980 views",
  },
  {
    title: "Finding nearby lockers",
    category: "Locations",
    views: "830 views",
  },
  {
    title: "Long-term packages info",
    category: "Packages",
    views: "760 views",
  },
];

export default function Section7() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategoryIcon = (IconComponent, color) => (
    <div
      className={`w-10 h-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center flex-shrink-0`}
    >
      <IconComponent className="h-5 w-5 text-white" />
    </div>
  );

  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200">
            <HelpCircle className="w-4 h-4 mr-2" />
            Quick Help
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[900px] text-gray-600 text-lg">
            Find instant answers to common questions about our luggage storage
            service
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Formik
              initialValues={{ searchQuery: "" }}
              onSubmit={(values) => {
                console.log("Search submitted:", values);
              }}
            >
              {({ handleChange }) => (
                <Form>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-2">
                    <CardContent className="p-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Field
                          name="searchQuery"
                          as={Input}
                          placeholder="Search FAQs..."
                          className="pl-10 border-2 focus:border-purple-500"
                          onChange={handleChange}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button
                        variant={
                          selectedCategory === null ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(null)}
                        type="button"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        All Topics
                      </Button>
                      {FAQ_DATA.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <Button
                            key={category.id}
                            variant={
                              selectedCategory === category.id
                                ? "default"
                                : "ghost"
                            }
                            className="w-full justify-start"
                            onClick={() => setSelectedCategory(category.id)}
                            type="button"
                          >
                            <IconComponent className="h-4 w-4 mr-2" />
                            {category.category}
                          </Button>
                        );
                      })}
                    </CardContent>
                  </Card>
                </Form>
              )}
            </Formik>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {FAQ_DATA.filter(
              (faq) => !selectedCategory || faq.id === selectedCategory
            ).map((faq) => (
              <Card
                key={faq.id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {getCategoryIcon(faq.icon, faq.color)}
                    <CardTitle>{faq.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faq.items.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
