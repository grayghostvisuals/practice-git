import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Building2, Users, FileText, DollarSign, Wrench, TrendingUp } from 'lucide-react';
import { usePropertyData } from './PropertyDataContext';

export function Dashboard() {
  const { properties, tenants, leases, payments, maintenanceRequests } = usePropertyData();

  const totalProperties = properties.length;
  const totalTenants = tenants.length;
  const activeLeases = leases.filter(l => l.status === 'active').length;
  const totalRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingMaintenance = maintenanceRequests.filter(m => m.status === 'pending').length;
  const occupancyRate = properties.length > 0 
    ? ((activeLeases / properties.length) * 100).toFixed(1) 
    : 0;

  const stats = [
    {
      title: 'Total Properties',
      value: totalProperties,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Revenue',
      value: `₱${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Occupancy Rate',
      value: `${occupancyRate}%`,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  const recentPayments = payments.slice(0, 5);
  const recentMaintenance = maintenanceRequests.slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl">Dashboard Overview</h2>
        <p className="text-muted-foreground text-sm sm:text-base">Key metrics and recent activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs sm:text-sm">{stat.title}</CardTitle>
                <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentPayments.length === 0 ? (
                <p className="text-muted-foreground text-xs sm:text-sm">No payments recorded</p>
              ) : (
                recentPayments.map((payment) => {
                  const tenant = tenants.find(t => t.id === payment.tenantId);
                  return (
                    <div key={payment.id} className="flex items-center justify-between pb-3 sm:pb-4 border-b last:border-0 gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm sm:text-base truncate">{tenant?.name || 'Unknown Tenant'}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm sm:text-base whitespace-nowrap">₱{payment.amount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 sm:py-1 rounded-full inline-block ${
                          payment.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Recent Maintenance Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentMaintenance.length === 0 ? (
                <p className="text-muted-foreground text-xs sm:text-sm">No maintenance requests</p>
              ) : (
                recentMaintenance.map((request) => {
                  const property = properties.find(p => p.id === request.propertyId);
                  return (
                    <div key={request.id} className="pb-3 sm:pb-4 border-b last:border-0">
                      <div className="flex items-start justify-between mb-1 gap-2">
                        <p className="text-sm sm:text-base flex-1 min-w-0">{request.title}</p>
                        <span className={`text-xs px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0 ${
                          request.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : request.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{property?.address || 'Unknown Property'}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground/70">{request.date}</p>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
