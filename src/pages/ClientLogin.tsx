
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast";

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate client authentication
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo client login
      if (email === 'client@example.com' && password === 'client123') {
        toast({
          title: "Login successful",
          description: "Welcome to your client dashboard",
        });
        navigate('/client-dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Reset email sent",
        description: "Check your email for password reset instructions",
      });
      setShowForgotPassword(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            <span className="gradient-text">SBC</span>-Deploy Client Portal
          </h1>
          <p className="text-slate-600">Access your infrastructure dashboard</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{showForgotPassword ? 'Reset Password' : 'Client Sign In'}</CardTitle>
            <CardDescription>
              {showForgotPassword 
                ? 'Enter your email to receive reset instructions'
                : 'Enter your credentials to access your dashboard'
              }
            </CardDescription>
          </CardHeader>
          <form onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="client@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {!showForgotPassword && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm">Remember me</Label>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : showForgotPassword ? "Send Reset Email" : "Sign In"}
              </Button>
              <div className="text-center text-sm space-y-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(!showForgotPassword)}
                  className="text-tech-blue hover:underline"
                >
                  {showForgotPassword ? 'Back to Sign In' : 'Forgot password?'}
                </button>
                {!showForgotPassword && (
                  <div className="text-slate-600">
                    Admin? <a href="/login" className="text-tech-blue hover:underline">Admin Login</a>
                  </div>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center mt-6 text-sm text-slate-600">
          Need help? <a href="#" className="text-tech-blue hover:underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
