import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Dashboard } from './components/Dashboard';
import { Payments } from './components/Payments';
import { RoomReservations } from './components/RoomReservations';
import { PropertyDataProvider } from './components/PropertyDataContext';
import { Login } from './components/Login';
import { Building2, LogOut } from 'lucide-react';
import { Button } from './components/ui/button';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <PropertyDataProvider>
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-base sm:text-xl truncate">Joyce Apartelle</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Property Management System</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-1 sm:gap-2 flex-shrink-0" size="sm">
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8">
              <TabsList className="inline-flex w-auto">
                <TabsTrigger value="dashboard" className="text-xs sm:text-sm">Dashboard</TabsTrigger>
                <TabsTrigger value="reservations" className="text-xs sm:text-sm whitespace-nowrap">Reservations</TabsTrigger>
                <TabsTrigger value="payments" className="text-xs sm:text-sm">Payments</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>

            <TabsContent value="reservations">
              <RoomReservations />
            </TabsContent>

            <TabsContent value="payments">
              <Payments />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </PropertyDataProvider>
  );
}
