import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Building2, Eye, EyeOff, AlertCircle } from 'lucide-react';

const LOCKOUT_DURATION = 30000; // 30 seconds in milliseconds
const MAX_ATTEMPTS = 3;

// Demo credentials
const DEMO_EMAIL = 'admin@ja.com';
const DEMO_PASSWORD = 'password123';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [error, setError] = useState('');

  // Check for existing lockout in localStorage
  useEffect(() => {
    const storedLockoutEnd = localStorage.getItem('lockoutEndTime');
    const storedAttempts = localStorage.getItem('loginAttempts');

    if (storedLockoutEnd) {
      const endTime = parseInt(storedLockoutEnd);
      const now = Date.now();

      if (now < endTime) {
        setIsLocked(true);
        setLockoutEndTime(endTime);
        setRemainingTime(Math.ceil((endTime - now) / 1000));
      } else {
        // Lockout expired
        localStorage.removeItem('lockoutEndTime');
        localStorage.removeItem('loginAttempts');
      }
    }

    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts));
    }
  }, []);

  // Countdown timer for lockout
  useEffect(() => {
    if (isLocked && lockoutEndTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.ceil((lockoutEndTime - now) / 1000);

        if (remaining <= 0) {
          setIsLocked(false);
          setLockoutEndTime(null);
          setAttempts(0);
          setError('');
          localStorage.removeItem('lockoutEndTime');
          localStorage.removeItem('loginAttempts');
          clearInterval(interval);
        } else {
          setRemainingTime(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLocked, lockoutEndTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      return;
    }

    setError('');

    // Check credentials
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      // Successful login
      localStorage.removeItem('lockoutEndTime');
      localStorage.removeItem('loginAttempts');
      onLogin();
    } else {
      // Failed login
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        // Lock the account
        const endTime = Date.now() + LOCKOUT_DURATION;
        setIsLocked(true);
        setLockoutEndTime(endTime);
        setRemainingTime(Math.ceil(LOCKOUT_DURATION / 1000));
        localStorage.setItem('lockoutEndTime', endTime.toString());
        setError(`Too many failed attempts. Account locked for ${LOCKOUT_DURATION / 1000} seconds.`);
      } else {
        setError(`Incorrect email or password. ${MAX_ATTEMPTS - newAttempts} attempt(s) remaining.`);
      }

      // Clear password field
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-primary p-2 sm:p-3 rounded-lg shadow-md">
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-lg sm:text-2xl">Welcome to Joyce Apartelle</CardTitle>
            <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-sm">
              Sign in to access your property management dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLocked}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <Alert variant={isLocked ? "destructive" : "default"} className="border-rose-200 bg-rose-50">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-rose-600" />
                <AlertDescription className="text-rose-800 text-xs sm:text-sm">
                  {isLocked ? (
                    <span>
                      Account locked. Please wait {remainingTime} second{remainingTime !== 1 ? 's' : ''} before trying again.
                    </span>
                  ) : (
                    error
                  )}
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLocked}>
              {isLocked ? `Locked (${remainingTime}s)` : 'Sign In'}
            </Button>

            <div className="pt-3 sm:pt-4 border-t">
              <p className="text-xs sm:text-sm text-muted-foreground text-center">Demo Credentials:</p>
              <p className="text-xs sm:text-sm text-foreground text-center mt-1">
                Email: <span className="font-mono bg-muted px-1.5 py-0.5 rounded">admin@ja.com</span>
              </p>
              <p className="text-xs sm:text-sm text-foreground text-center mt-1">
                Password: <span className="font-mono bg-muted px-1.5 py-0.5 rounded">password123</span>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
