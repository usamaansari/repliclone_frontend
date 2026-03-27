import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-6">
          <Badge variant="secondary">Privacy Policy</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Your Privacy Matters</h1>
          <p className="text-lg text-muted-foreground">
            This page outlines how ReplicloneAI collects, uses, and protects your personal and business data.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              We collect account details, usage analytics, support interactions, and configuration data required to
              operate your AI clones and improve the platform.
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>How We Use Information</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Data is used to provide core services, maintain security, personalize your experience, and deliver product
              updates. We do not sell your personal information.
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Data Security & Retention</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              We apply encryption, access controls, and monitoring safeguards. Data is retained only as long as needed
              for service delivery, legal requirements, or customer-requested workflows.
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              You can request access, correction, deletion, or export of your data by contacting
              privacy@replicloneai.com.
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
