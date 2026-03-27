import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, Mail, MessageCircle, PhoneCall } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl space-y-6">
          <Badge variant="secondary">Support</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">How Can We Help?</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Reach out to our support team for onboarding help, technical issues, billing questions, or platform
            guidance.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              support@replicloneai.com
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-primary" />
                Phone Support
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              +1 (604) 512-1238, Monday to Friday, 9am to 6pm PST
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Available for Pro and Enterprise plans in the dashboard.
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <LifeBuoy className="h-5 w-5 text-primary" />
                Incident Response
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Critical issues are prioritized with first response within 1 hour for Enterprise plans.
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
