'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              Get in Touch
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Contact
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                ReplicloneAI
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Email Card */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>
                  Send us an email anytime
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href="mailto:steven@replicloneai.com" 
                  className="text-lg font-semibold text-primary hover:underline transition-colors"
                >
                  steven@replicloneai.com
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  We'll respond within 24 hours
                </p>
              </CardContent>
            </Card>

            {/* Phone Card */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>
                  Speak with our team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href="tel:+1-604-512-1238" 
                  className="text-lg font-semibold text-primary hover:underline transition-colors"
                >
                  +1 (604) 512-1238
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Mon-Fri 9am-6pm PST
                </p>
              </CardContent>
            </Card>

            {/* Address Card */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Visit Us</CardTitle>
                <CardDescription>
                  Our office location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <address className="text-lg font-semibold not-italic">
                  Kelowna, BC<br />
                  Canada
                </address>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <Badge variant="outline">Send a Message</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible. 
                Whether you're interested in our services, have questions, or just want to learn more, 
                we're here to help.
              </p>
              <div className="flex items-center gap-3 pt-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Quick Response</p>
                  <p className="text-sm text-muted-foreground">Average response time: 2-4 hours</p>
                </div>
              </div>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}