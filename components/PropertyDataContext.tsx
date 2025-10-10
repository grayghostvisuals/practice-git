import { createContext, useContext, useState, ReactNode } from 'react';

interface Property {
  id: string;
  address: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: string;
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Lease {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: string;
}

interface Payment {
  id: string;
  tenantId: string;
  amount: number;
  date: string;
  method: string;
  status: string;
}

interface MaintenanceRequest {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  date: string;
}

interface PropertyDataContextType {
  properties: Property[];
  tenants: Tenant[];
  leases: Lease[];
  payments: Payment[];
  maintenanceRequests: MaintenanceRequest[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  addTenant: (tenant: Omit<Tenant, 'id'>) => void;
  updateTenant: (id: string, tenant: Partial<Tenant>) => void;
  addLease: (lease: Omit<Lease, 'id'>) => void;
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  addMaintenanceRequest: (request: Omit<MaintenanceRequest, 'id'>) => void;
  updateMaintenanceRequest: (id: string, request: Partial<MaintenanceRequest>) => void;
}

const PropertyDataContext = createContext<PropertyDataContextType | undefined>(undefined);

export function PropertyDataProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      address: '123 Main St, Apt 4B',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 1,
      rent: 1500,
      status: 'occupied',
    },
    {
      id: '2',
      address: '456 Oak Avenue',
      type: 'House',
      bedrooms: 3,
      bathrooms: 2.5,
      rent: 2200,
      status: 'available',
    },
    {
      id: '3',
      address: '789 Pine Street, Unit 12',
      type: 'Condo',
      bedrooms: 1,
      bathrooms: 1,
      rent: 1200,
      status: 'occupied',
    },
  ]);

  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 234-5678',
    },
  ]);

  const [leases, setLeases] = useState<Lease[]>([
    {
      id: '1',
      propertyId: '1',
      tenantId: '1',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      monthlyRent: 1500,
      deposit: 3000,
      status: 'active',
    },
    {
      id: '2',
      propertyId: '3',
      tenantId: '2',
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      monthlyRent: 1200,
      deposit: 2400,
      status: 'active',
    },
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      tenantId: '1',
      amount: 1500,
      date: '2024-10-01',
      method: 'bank-transfer',
      status: 'paid',
    },
    {
      id: '2',
      tenantId: '2',
      amount: 1200,
      date: '2024-10-01',
      method: 'check',
      status: 'paid',
    },
    {
      id: '3',
      tenantId: '1',
      amount: 1500,
      date: '2024-09-01',
      method: 'bank-transfer',
      status: 'paid',
    },
    {
      id: '4',
      tenantId: '2',
      amount: 1200,
      date: '2024-09-03',
      method: 'bank-transfer',
      status: 'paid',
    },
    {
      id: '5',
      tenantId: '1',
      amount: 1500,
      date: '2024-11-01',
      method: 'bank-transfer',
      status: 'pending',
    },
  ]);

  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      propertyId: '1',
      title: 'Leaking faucet in kitchen',
      description: 'Kitchen sink faucet is dripping constantly',
      priority: 'medium',
      status: 'pending',
      date: '2024-10-05',
    },
    {
      id: '2',
      propertyId: '3',
      title: 'Heating not working',
      description: 'Central heating system not turning on',
      priority: 'urgent',
      status: 'in-progress',
      date: '2024-10-07',
    },
    {
      id: '3',
      propertyId: '1',
      title: 'Light fixture replacement',
      description: 'Bedroom light fixture needs replacement',
      priority: 'low',
      status: 'completed',
      date: '2024-09-28',
    },
  ]);

  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty = { ...property, id: Date.now().toString() };
    setProperties([...properties, newProperty]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(properties.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addTenant = (tenant: Omit<Tenant, 'id'>) => {
    const newTenant = { ...tenant, id: Date.now().toString() };
    setTenants([...tenants, newTenant]);
  };

  const updateTenant = (id: string, updates: Partial<Tenant>) => {
    setTenants(tenants.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const addLease = (lease: Omit<Lease, 'id'>) => {
    const newLease = { ...lease, id: Date.now().toString() };
    setLeases([...leases, newLease]);
  };

  const addPayment = (payment: Omit<Payment, 'id'>) => {
    const newPayment = { ...payment, id: Date.now().toString() };
    setPayments([newPayment, ...payments]);
  };

  const addMaintenanceRequest = (request: Omit<MaintenanceRequest, 'id'>) => {
    const newRequest = { ...request, id: Date.now().toString() };
    setMaintenanceRequests([newRequest, ...maintenanceRequests]);
  };

  const updateMaintenanceRequest = (id: string, updates: Partial<MaintenanceRequest>) => {
    setMaintenanceRequests(maintenanceRequests.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  return (
    <PropertyDataContext.Provider
      value={{
        properties,
        tenants,
        leases,
        payments,
        maintenanceRequests,
        addProperty,
        updateProperty,
        addTenant,
        updateTenant,
        addLease,
        addPayment,
        addMaintenanceRequest,
        updateMaintenanceRequest,
      }}
    >
      {children}
    </PropertyDataContext.Provider>
  );
}

export function usePropertyData() {
  const context = useContext(PropertyDataContext);
  if (context === undefined) {
    throw new Error('usePropertyData must be used within a PropertyDataProvider');
  }
  return context;
}
