import { useState } from "react";
import { ArrowLeft, Fuel, MapPin, Calendar, CheckCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const GasCylinder = () => {
  const [provider, setProvider] = useState("");
  const [consumerId, setConsumerId] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const gasProviders = [
    { id: "indane", name: "Indane Gas", price: 900, delivery: "Same Day" },
    { id: "bharat", name: "Bharat Gas", price: 895, delivery: "Next Day" },
    { id: "hp", name: "HP Gas", price: 905, delivery: "Same Day" },
    { id: "reliance", name: "Reliance Gas", price: 885, delivery: "Same Day" },
  ];

  const cylinderTypes = [
    { id: "14.2kg", name: "14.2 KG Domestic", price: 900, popular: true },
    { id: "5kg", name: "5 KG Domestic", price: 450, popular: false },
    { id: "19kg", name: "19 KG Commercial", price: 1650, popular: false },
  ];

  const fetchBookingDetails = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setBookingData({
        consumerName: "John Doe",
        address: "123 Main Street, Koramangala, Bangalore - 560034",
        consumerId: consumerId,
        lastDelivery: "2023-12-15",
        totalBookings: 8,
        availableSubsidy: 2,
        cylinderType: "14.2kg",
        deliverySlots: [
          { id: 1, time: "9:00 AM - 12:00 PM", available: true },
          { id: 2, time: "12:00 PM - 3:00 PM", available: true },
          { id: 3, time: "3:00 PM - 6:00 PM", available: false },
          { id: 4, time: "6:00 PM - 9:00 PM", available: true },
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  const selectedProvider = gasProviders.find(p => p.id === provider);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCylinder, setSelectedCylinder] = useState("14.2kg");

  const getFinalPrice = () => {
    const basePrice = selectedProvider?.price || 0;
    const cylinderPrice = cylinderTypes.find(c => c.id === selectedCylinder)?.price || 0;
    return cylinderPrice;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Gas Cylinder Booking</h1>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10">
        {/* Cylinder Icon Illustration */}
        <div className="text-center mb-6 animate-slide-up">
          <div className="w-24 h-32 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary-light to-accent flex items-center justify-center relative">
            <Fuel className="h-16 w-10 text-primary animate-bounce" />
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-primary/50 rounded-full" />
          </div>
        </div>

        {/* Provider & Details Form */}
        <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <Fuel className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Select Gas Provider & Enter Details</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Gas Provider</label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gas provider" />
                </SelectTrigger>
                <SelectContent>
                  {gasProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{provider.name}</span>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-sm text-muted-foreground">₹{provider.price}</span>
                          <Badge variant="secondary" className="text-xs">{provider.delivery}</Badge>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Consumer ID</label>
              <Input
                type="text"
                placeholder="Enter your consumer ID"
                value={consumerId}
                onChange={(e) => setConsumerId(e.target.value)}
                className="text-center font-medium"
              />
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-primary border-0 hover:opacity-90"
              onClick={fetchBookingDetails}
              disabled={!provider || !consumerId || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Checking Details...
                </div>
              ) : (
                "Check Booking Details"
              )}
            </Button>
          </div>
        </Card>

        {/* Loading Shimmer */}
        {isLoading && (
          <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-6 border-0 animate-slide-up">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-lg animate-shimmer" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded animate-shimmer mb-2" />
                  <div className="h-3 bg-muted rounded animate-shimmer w-2/3" />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Booking Details */}
        {bookingData && !isLoading && (
          <>
            {/* Consumer Info */}
            <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-4 border-0 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <h2 className="font-semibold text-foreground mb-4">Consumer Details</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consumer Name</span>
                  <span className="font-medium">{bookingData.consumerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consumer ID</span>
                  <span className="font-medium">{bookingData.consumerId}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-muted-foreground">Delivery Address</span>
                  <span className="font-medium text-right text-sm max-w-[200px]">{bookingData.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Delivery</span>
                  <span className="font-medium">{new Date(bookingData.lastDelivery).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Subsidy</span>
                  <Badge variant="secondary">{bookingData.availableSubsidy} cylinders</Badge>
                </div>
              </div>
            </Card>

            {/* Cylinder Selection */}
            <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-4 border-0 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <h3 className="font-medium text-foreground mb-3">Select Cylinder Type</h3>
              <div className="space-y-2">
                {cylinderTypes.map((cylinder) => (
                  <div
                    key={cylinder.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedCylinder === cylinder.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCylinder(cylinder.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedCylinder === cylinder.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}>
                        {selectedCylinder === cylinder.id && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{cylinder.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-primary">₹{cylinder.price}</span>
                          {cylinder.popular && (
                            <Badge variant="secondary" className="text-xs">Popular</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Delivery Slot Selection */}
            <Card className="bg-white shadow-card rounded-mobile-lg p-4 mb-20 border-0 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center gap-2 mb-3">
                <Truck className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground">Select Delivery Slot</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {bookingData.deliverySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      !slot.available 
                        ? "border-muted bg-muted/30 cursor-not-allowed opacity-50" 
                        : selectedSlot === slot.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => slot.available && setSelectedSlot(slot.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedSlot === slot.id && slot.available
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}>
                        {selectedSlot === slot.id && slot.available && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                        )}
                      </div>
                      <p className="font-medium text-sm">{slot.time}</p>
                    </div>
                    {slot.available ? (
                      <Badge variant="outline" className="text-success border-success">Available</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">Not Available</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Book Button */}
            <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-border">
              <Button
                size="lg"
                className="w-full bg-gradient-primary border-0 hover:opacity-90 h-14 text-lg font-semibold"
                onClick={() => navigate('/payment', { 
                  state: { 
                    plan: { amount: getFinalPrice() }, 
                    mobileNumber: consumerId, 
                    operator: provider, 
                    type: 'gas-booking',
                    bookingData: { ...bookingData, selectedCylinder, selectedSlot }
                  } 
                })}
                disabled={!selectedSlot}
              >
                Book Cylinder - ₹{getFinalPrice()}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GasCylinder;