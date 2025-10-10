import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';
import { 
  DoorOpen, 
  Calendar as CalendarIcon, 
  User, 
  ArrowLeft,
  Wifi,
  Tv,
  Coffee,
  Wind,
  UtensilsCrossed,
  Waves
} from 'lucide-react';
import { format } from 'date-fns';

type RoomStatus = 'vacant' | 'reserved' | 'occupied';

interface Room {
  id: string;
  number: string;
  type: string;
  status: RoomStatus;
  price: number;
  capacity: number;
}

interface Inclusion {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: number;
}

interface GuestProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  idType: string;
  idNumber: string;
}

type ViewState = 'rooms' | 'details' | 'profile';

const SAMPLE_ROOMS: Room[] = [
  { id: '1', number: '101', type: 'Standard Single', status: 'vacant', price: 2000, capacity: 1 },
  { id: '2', number: '102', type: 'Standard Double', status: 'vacant', price: 3000, capacity: 2 },
  { id: '3', number: '103', type: 'Deluxe Single', status: 'reserved', price: 2500, capacity: 1 },
  { id: '4', number: '104', type: 'Deluxe Double', status: 'occupied', price: 3500, capacity: 2 },
  { id: '5', number: '201', type: 'Standard Single', status: 'vacant', price: 2000, capacity: 1 },
  { id: '6', number: '202', type: 'Suite', status: 'vacant', price: 5000, capacity: 4 },
  { id: '7', number: '203', type: 'Standard Double', status: 'reserved', price: 3000, capacity: 2 },
  { id: '8', number: '204', type: 'Deluxe Double', status: 'occupied', price: 3500, capacity: 2 },
  { id: '9', number: '301', type: 'Standard Single', status: 'vacant', price: 2000, capacity: 1 },
  { id: '10', number: '302', type: 'Suite', status: 'reserved', price: 5000, capacity: 4 },
  { id: '11', number: '303', type: 'Deluxe Single', status: 'vacant', price: 2500, capacity: 1 },
  { id: '12', number: '304', type: 'Standard Double', status: 'vacant', price: 3000, capacity: 2 },
];

const AVAILABLE_INCLUSIONS: Inclusion[] = [
  { id: 'wifi', name: 'High-Speed WiFi', icon: <Wifi className="w-4 h-4" />, price: 250 },
  { id: 'tv', name: 'Premium TV Channels', icon: <Tv className="w-4 h-4" />, price: 350 },
  { id: 'breakfast', name: 'Breakfast', icon: <Coffee className="w-4 h-4" />, price: 500 },
  { id: 'ac', name: 'Air Conditioning', icon: <Wind className="w-4 h-4" />, price: 300 },
  { id: 'minibar', name: 'Mini Bar', icon: <UtensilsCrossed className="w-4 h-4" />, price: 600 },
  { id: 'pool', name: 'Pool Access', icon: <Waves className="w-4 h-4" />, price: 400 },
];

export function RoomReservations() {
  const [currentView, setCurrentView] = useState<ViewState>('rooms');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [selectedInclusions, setSelectedInclusions] = useState<string[]>([]);
  const [guestProfile, setGuestProfile] = useState<GuestProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    idType: '',
    idNumber: '',
  });

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case 'vacant':
        return 'bg-green-50 border-green-200 hover:border-green-300 hover:shadow-md';
      case 'reserved':
        return 'bg-yellow-50 border-yellow-200 hover:border-yellow-300 hover:shadow-md';
      case 'occupied':
        return 'bg-rose-50 border-rose-200 cursor-not-allowed opacity-75';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status: RoomStatus) => {
    switch (status) {
      case 'vacant':
        return 'bg-green-200 text-green-800';
      case 'reserved':
        return 'bg-yellow-200 text-yellow-800';
      case 'occupied':
        return 'bg-rose-200 text-rose-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const handleRoomSelect = (room: Room) => {
    if (room.status === 'occupied') return;
    setSelectedRoom(room);
    setCurrentView('details');
  };

  const handleInclusionToggle = (inclusionId: string) => {
    setSelectedInclusions(prev => 
      prev.includes(inclusionId) 
        ? prev.filter(id => id !== inclusionId)
        : [...prev, inclusionId]
    );
  };

  const handleCancel = () => {
    if (currentView === 'details') {
      setCurrentView('rooms');
      setSelectedRoom(null);
      setCheckInDate(undefined);
      setCheckOutDate(undefined);
      setSelectedInclusions([]);
    } else if (currentView === 'profile') {
      setCurrentView('details');
    }
  };

  const handleAvail = () => {
    if (currentView === 'details') {
      setCurrentView('profile');
    } else if (currentView === 'profile') {
      // Handle final reservation submission
      alert('Reservation completed successfully!');
      // Reset to rooms view
      setCurrentView('rooms');
      setSelectedRoom(null);
      setCheckInDate(undefined);
      setCheckOutDate(undefined);
      setSelectedInclusions([]);
      setGuestProfile({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        idType: '',
        idNumber: '',
      });
    }
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const inclusionsTotal = selectedInclusions.reduce((sum, id) => {
      const inclusion = AVAILABLE_INCLUSIONS.find(inc => inc.id === id);
      return sum + (inclusion?.price || 0);
    }, 0);
    return selectedRoom.price + inclusionsTotal;
  };

  const handleGuestProfileChange = (field: keyof GuestProfile, value: string) => {
    setGuestProfile(prev => ({ ...prev, [field]: value }));
  };

  // Rooms List View
  if (currentView === 'rooms') {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl">Room Reservations</h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Select a room to make a reservation</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-200 rounded border border-green-300"></div>
              <span className="text-xs sm:text-sm">Vacant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-200 rounded border border-yellow-300"></div>
              <span className="text-xs sm:text-sm">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-rose-200 rounded border border-rose-300"></div>
              <span className="text-xs sm:text-sm">Occupied</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {SAMPLE_ROOMS.map(room => (
            <Card
              key={room.id}
              className={`cursor-pointer transition-all ${getStatusColor(room.status)}`}
              onClick={() => handleRoomSelect(room)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg">Room {room.number}</CardTitle>
                    <CardDescription className="mt-1 text-xs sm:text-sm truncate">{room.type}</CardDescription>
                  </div>
                  <Badge className={`${getStatusBadgeColor(room.status)} capitalize text-xs flex-shrink-0`}>
                    {room.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Up to {room.capacity}</span>
                  </div>
                  <p className="text-sm sm:text-base whitespace-nowrap">₱{room.price}/night</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Room Details View
  if (currentView === 'details' && selectedRoom) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <Button variant="ghost" onClick={handleCancel} className="mb-2 sm:mb-4" size="sm">
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Back to Rooms
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-2xl">Room {selectedRoom.number}</CardTitle>
                    <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-sm">{selectedRoom.type}</CardDescription>
                  </div>
                  <Badge className={`${getStatusBadgeColor(selectedRoom.status)} capitalize text-xs flex-shrink-0`}>
                    {selectedRoom.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DoorOpen className="w-5 h-5" />
                      <span>Capacity</span>
                    </div>
                    <span>Up to {selectedRoom.capacity} guest(s)</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span>Base Price</span>
                    <span className="text-base sm:text-lg">₱{selectedRoom.price}/night</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Select Check-in and Check-out Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          initialFocus
                          disabled={(date) => date < (checkInDate || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Room Inclusions</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Select additional amenities for your stay</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {AVAILABLE_INCLUSIONS.map(inclusion => (
                    <div
                      key={inclusion.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={inclusion.id}
                          checked={selectedInclusions.includes(inclusion.id)}
                          onCheckedChange={() => handleInclusionToggle(inclusion.id)}
                        />
                        <Label htmlFor={inclusion.id} className="flex items-center gap-2 cursor-pointer">
                          {inclusion.icon}
                          <span>{inclusion.name}</span>
                        </Label>
                      </div>
                      <span className="text-muted-foreground text-sm sm:text-base">+₱{inclusion.price}/night</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Room</span>
                    <span>{selectedRoom.number}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type</span>
                    <span>{selectedRoom.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Price</span>
                    <span>₱{selectedRoom.price}/night</span>
                  </div>
                  {selectedInclusions.length > 0 && (
                    <>
                      <div className="border-t pt-2 mt-2">
                        <p className="text-sm text-gray-600 mb-2">Inclusions:</p>
                        {selectedInclusions.map(id => {
                          const inclusion = AVAILABLE_INCLUSIONS.find(inc => inc.id === id);
                          return (
                            <div key={id} className="flex justify-between text-sm pl-2 mb-1">
                              <span className="text-gray-600">{inclusion?.name}</span>
                              <span>+₱{inclusion?.price}/night</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Total per night</span>
                    <span className="text-xl">₱{calculateTotal()}</span>
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <Button 
                    className="w-full" 
                    onClick={handleAvail}
                    disabled={!checkInDate || !checkOutDate}
                  >
                    Proceed to Guest Profile
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Guest Profile View
  if (currentView === 'profile' && selectedRoom) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={handleCancel} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Room Details
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Guest Profile</CardTitle>
                <CardDescription>Please provide your information to complete the reservation</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={guestProfile.firstName}
                          onChange={(e) => handleGuestProfileChange('firstName', e.target.value)}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={guestProfile.lastName}
                          onChange={(e) => handleGuestProfileChange('lastName', e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={guestProfile.email}
                          onChange={(e) => handleGuestProfileChange('email', e.target.value)}
                          placeholder="john.doe@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={guestProfile.phone}
                          onChange={(e) => handleGuestProfileChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t pt-6">
                    <h3 className="text-lg">Address</h3>
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={guestProfile.address}
                        onChange={(e) => handleGuestProfileChange('address', e.target.value)}
                        placeholder="123 Main Street"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={guestProfile.city}
                          onChange={(e) => handleGuestProfileChange('city', e.target.value)}
                          placeholder="New York"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={guestProfile.state}
                          onChange={(e) => handleGuestProfileChange('state', e.target.value)}
                          placeholder="NY"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={guestProfile.zipCode}
                          onChange={(e) => handleGuestProfileChange('zipCode', e.target.value)}
                          placeholder="10001"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t pt-6">
                    <h3 className="text-lg">Identification</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="idType">ID Type *</Label>
                        <Input
                          id="idType"
                          value={guestProfile.idType}
                          onChange={(e) => handleGuestProfileChange('idType', e.target.value)}
                          placeholder="Driver's License, Passport, etc."
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="idNumber">ID Number *</Label>
                        <Input
                          id="idNumber"
                          value={guestProfile.idNumber}
                          onChange={(e) => handleGuestProfileChange('idNumber', e.target.value)}
                          placeholder="ID123456789"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Reservation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Room</span>
                    <span>{selectedRoom.number} - {selectedRoom.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Check-in</span>
                    <span>{checkInDate ? format(checkInDate, 'PP') : 'Not set'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Check-out</span>
                    <span>{checkOutDate ? format(checkOutDate, 'PP') : 'Not set'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span>
                      {checkInDate && checkOutDate
                        ? `${Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} night(s)`
                        : 'N/A'}
                    </span>
                  </div>
                  {selectedInclusions.length > 0 && (
                    <>
                      <div className="border-t pt-2 mt-2">
                        <p className="text-sm text-gray-600 mb-2">Inclusions:</p>
                        {selectedInclusions.map(id => {
                          const inclusion = AVAILABLE_INCLUSIONS.find(inc => inc.id === id);
                          return (
                            <div key={id} className="flex items-center gap-2 text-sm pl-2 mb-1">
                              {inclusion?.icon}
                              <span className="text-gray-600">{inclusion?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Rate per night</span>
                    <span>₱{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount</span>
                    <span className="text-xl">
                      ₱{checkInDate && checkOutDate
                        ? calculateTotal() * Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
                        : calculateTotal()}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <Button 
                    className="w-full" 
                    onClick={handleAvail}
                    disabled={!guestProfile.firstName || !guestProfile.lastName || !guestProfile.email || !guestProfile.phone}
                  >
                    Complete Reservation
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleCancel}>
                    Back to Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
