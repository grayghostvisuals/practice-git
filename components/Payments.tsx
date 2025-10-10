import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, DollarSign } from 'lucide-react';
import { usePropertyData } from './PropertyDataContext';
import { Badge } from './ui/badge';

export function Payments() {
  const { payments, tenants, addPayment } = usePropertyData();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    tenantId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'bank-transfer',
    status: 'paid',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addPayment({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    setIsAddDialogOpen(false);
    setFormData({
      tenantId: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      method: 'bank-transfer',
      status: 'paid',
    });
  };

  const getTenantName = (tenantId: string) => {
    const tenant = tenants.find(t => t.id === tenantId);
    return tenant?.name || 'Unknown Tenant';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl">Payments</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Track rent payments and transactions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={tenants.length === 0} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="tenantId">Tenant</Label>
                <select
                  id="tenantId"
                  value={formData.tenantId}
                  onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select a tenant</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="amount">Amount (₱)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Payment Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="method">Payment Method</Label>
                <select
                  id="method"
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="check">Check</option>
                  <option value="cash">Cash</option>
                  <option value="credit-card">Credit Card</option>
                </select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Record Payment</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {tenants.length === 0 ? (
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="py-8 sm:py-12 text-center">
            <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <h3 className="text-foreground mb-1 sm:mb-2 text-base sm:text-lg">No tenants available</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">Add tenants to start recording payments</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            {payments.length === 0 ? (
              <div className="py-8 sm:py-12 text-center">
                <h3 className="text-foreground mb-1 sm:mb-2 text-base sm:text-lg">No payments recorded</h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-4">Start tracking rent payments</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Tenant</TableHead>
                      <TableHead className="text-xs sm:text-sm">Amount</TableHead>
                      <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Date</TableHead>
                      <TableHead className="text-xs sm:text-sm hidden md:table-cell">Method</TableHead>
                      <TableHead className="text-xs sm:text-sm">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="text-xs sm:text-sm">{getTenantName(payment.tenantId)}</TableCell>
                        <TableCell className="text-xs sm:text-sm whitespace-nowrap">₱{payment.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{payment.date}</TableCell>
                        <TableCell className="text-xs sm:text-sm capitalize hidden md:table-cell">{payment.method.replace('-', ' ')}</TableCell>
                        <TableCell>
                          <Badge
                            className="text-xs"
                            variant={
                              payment.status === 'paid'
                                ? 'default'
                                : payment.status === 'pending'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
