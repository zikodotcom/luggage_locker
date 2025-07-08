import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MapPin,
  Star,
  Clock,
  CalendarIcon,
  CreditCard,
  Shield,
  Loader2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { format, differenceInDays, addDays } from "date-fns";
import Maps from "@/components/Maps";
import { axiosClient } from "@/helpers/axiosClient";

export default function Booking() {
  const [MOCK_LOCATION, setMOCK_LOCATIONS] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [selectedLocker, setSelectedLocker] = useState();
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const [pickupTime, setPickupTime] = useState("18:00");
  const [isProcessing, setIsProcessing] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  //   const locker = MOCK_LOCATION.lockerTypes.find((l) => l.id === selectedLocker);
  const numberOfDays =
    startDate && endDate
      ? Math.max(1, differenceInDays(endDate, startDate))
      : 1;
  const [subtotal, setSubTotal] = useState(0);

  const handleBooking = async () => {
    // Implement booking logic here
    console.log("Booking submitted");
  };
  const params = useParams();
  useEffect(() => {
    params.bookingId
      ? axiosClient
          .get(`/place/${params.bookingId}`)
          .then((response) => {
            setMOCK_LOCATIONS(response.data);
            setSelectedLocker(response.data.lockers[0].id);
          })
          .catch((error) => {
            console.error("Error fetching location:", error);
          })
      : "";
  }, []);

  useEffect(() => {
    let price = MOCK_LOCATION?.lockers?.find(
      (l) => l.id === selectedLocker
    )?.price;
    setSubTotal(numberOfDays * price || 0);
  }, [endDate, startDate, selectedLocker]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/map"
          className="text-blue-600 hover:underline flex items-center gap-1 mb-2"
        >
          {"←"} Back to map
        </Link>
        <h1 className="text-3xl font-bold">{MOCK_LOCATION.name}</h1>
        <div className="flex items-center gap-2 mt-1 text-gray-500">
          <MapPin className="h-4 w-4" />
          {MOCK_LOCATION.address}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{MOCK_LOCATION.rating}</span>
          </div>
          <span className="text-gray-500">
            ({MOCK_LOCATION.reviews} reviews)
          </span>
          <span className="text-gray-500">•</span>
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {MOCK_LOCATION.hours}
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            {/* Details tab */}
            <TabsContent value="details" className="p-4 border rounded-lg mt-2">
              <h3 className="font-medium text-lg mb-4">About this location</h3>
              <p className="text-gray-600 mb-6">{MOCK_LOCATION.description}</p>

              <h3 className="font-medium text-lg mb-2">Locker sizes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MOCK_LOCATION?.lockers?.map((l) => (
                  <Card key={l.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{l.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-500">
                        {l["length"]}x{l["width"]} cm
                      </p>
                      <p className="text-sm text-gray-500"></p>
                      <p className="text-sm font-medium mt-1">
                        ${l.price.toFixed(2)} / day
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="location"
              className="p-4 border rounded-lg mt-2"
            >
              <Maps loc={MOCK_LOCATION} />
            </TabsContent>

            <TabsContent value="reviews" className="p-4 border rounded-lg mt-2">
              <p className="text-gray-600">Review system coming soon…</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Card */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Complete Your Booking</CardTitle>
              <CardDescription>Select dates and payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Selection */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {startDate
                            ? format(startDate, "MMM dd")
                            : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {endDate ? format(endDate, "MMM dd") : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {startDate && endDate && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    Duration: {numberOfDays} day{numberOfDays > 1 ? "s" : ""}
                  </div>
                )}
              </div>

              <Separator />

              {/* Locker size */}
              <div className="space-y-2">
                <Label>Locker Size</Label>
                <RadioGroup
                  value={selectedLocker}
                  onValueChange={setSelectedLocker}
                  className="grid gap-2"
                >
                  {MOCK_LOCATION?.lockers?.map((l) => (
                    <div key={l.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={l.id} id={l.id} />
                      <Label
                        htmlFor={l.id}
                        className="flex justify-between w-full"
                      >
                        <span>
                          {l.name} ( {l["length"]}x{l["width"]} cm)
                        </span>
                        <span className="font-medium">
                          ${l.price.toFixed(2)}/day
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Price breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Locker rental ({numberOfDays} day
                    {numberOfDays > 1 ? "s" : ""})
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Security notice */}
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">
                  Your payment is secured with 256-bit SSL encryption
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleBooking}
                disabled={isProcessing || !agreeTerms}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Complete Booking - $${subtotal.toFixed(2)}`
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
