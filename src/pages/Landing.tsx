import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight } from 'lucide-react';
import { SignInButton, SignUpButton, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/planner');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-subtle flex flex-col">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Weekendly
              </span>
            </div>
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="bg-gradient-secondary text-black border-0 hover:opacity-90">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </nav>

      <section className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Your Perfect Weekend
            <span className="block bg-gradient-primary bg-clip-text text-black">
              Starts Here
            </span>
          </h1>
          
          <SignUpButton mode="modal">
            <Button size="lg" className="bg-gradient-primary text-black border hover:opacity-90 group">
              Go to Weekend Planner
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}