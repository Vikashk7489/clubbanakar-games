
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Play, Star, Trophy, Users, Image } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();

  const handlePlayNow = () => {
    toast({
      title: "Coming Soon!",
      description: "The game will be available shortly.",
    });
  };

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multiplayer Games",
      description: "Play with friends and compete globally",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Tournaments",
      description: "Join daily tournaments and win prizes",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Experience",
      description: "Enjoy high-quality gaming experience",
    },
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/95 z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Welcome to Image Converter
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Convert your images to different formats easily
            </p>
            <Link to="/convert">
              <Button
                size="lg"
                className="animate-slide-up delay-100"
              >
                <Image className="mr-2 h-4 w-4" /> Convert Images
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Premium Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 glass hover:scale-105 transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Convert?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start converting your images to different formats today
            </p>
            <Link to="/convert">
              <Button size="lg" variant="outline">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
