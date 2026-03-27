import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessagesSquare, CalendarClock } from "lucide-react";

const channels = [
  {
    icon: Users,
    title: "User Community",
    description: "Connect with other builders, share implementation ideas, and discover best practices.",
  },
  {
    icon: MessagesSquare,
    title: "Discussion Forum",
    description: "Ask technical questions and get answers from the team and experienced community members.",
  },
  {
    icon: CalendarClock,
    title: "Events & Workshops",
    description: "Join monthly sessions on automation, clone optimization, and advanced platform workflows.",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl space-y-6">
          <Badge variant="secondary">Community</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Grow With Other Builders</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Learn from real-world use cases, share insights, and collaborate with teams using ReplicloneAI.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <Card key={channel.title} className="border-2">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{channel.title}</CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  New activity updates are published weekly.
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
