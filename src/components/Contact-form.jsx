"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      message: Yup.string().required("Message is required"),
      inquiryType: Yup.string().required("Inquiry type is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const existing = JSON.parse(
          localStorage.getItem("contact-submissions") || "[]"
        );
        existing.push({
          ...values,
          id: Date.now().toString(),
          submittedAt: new Date().toISOString(),
          status: "new",
        });
        localStorage.setItem("contact-submissions", JSON.stringify(existing));

        toast({
          title: "Message Sent Successfully!",
          description:
            "Thank you for contacting us. We'll get back to you within 24 hours.",
        });

        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          resetForm();
        }, 3000);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for reaching out. We'll respond within 24 hours.
        </p>
        <div className="text-sm text-gray-500">Redirecting back to form...</div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      {/* Contact Info (same as before) */}
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
              <p className="text-gray-600">support@luggagelock.com</p>
              <p className="text-sm text-gray-500">
                We'll respond within 2 hours
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
              <p className="text-gray-600">06 55 55 88 11</p>
              <p className="text-sm text-gray-500">
                Available 24/7 for urgent matters
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Visit Us</h4>
              <p className="text-gray-600">123 Mohammed 5 Street</p>
              <p className="text-gray-600">Casablanca</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Business Hours
              </h4>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM
              </p>
              <p className="text-gray-600">Weekend: 10:00 AM - 4:00 PM</p>
              <p className="text-sm text-gray-500">
                Emergency support available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Send us a Message
          </CardTitle>
          <CardDescription>
            Fill out the form below and we'll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="h-12 border-2"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="h-12 border-2"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className="h-12 border-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inquiryType">
                  Inquiry Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formik.values.inquiryType}
                  onValueChange={(val) =>
                    formik.setFieldValue("inquiryType", val)
                  }
                >
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Question</SelectItem>
                    <SelectItem value="booking">Booking Support</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.inquiryType && formik.errors.inquiryType && (
                  <p className="text-sm text-red-500">
                    {formik.errors.inquiryType}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Brief description"
                value={formik.values.subject}
                onChange={formik.handleChange}
                className="h-12 border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Please provide details..."
                value={formik.values.message}
                onChange={formik.handleChange}
                className="min-h-[120px] border-2 resize-none"
              />
              <div className="text-xs text-gray-500 text-right">
                {formik.values.message.length}/500
              </div>
              {formik.touched.message && formik.errors.message && (
                <p className="text-sm text-red-500">{formik.errors.message}</p>
              )}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-800">
              <strong>Privacy Notice:</strong> Your information is secure. We
              never share your data with third parties.
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster position="top-right" />
    </div>
  );
}
