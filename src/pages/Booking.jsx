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
import {
  MapPin,
  Star,
  Clock,
  CalendarIcon,
  CreditCard,
  Shield,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format, differenceInDays, addDays, set } from "date-fns";
import Maps from "@/components/Maps";
import { axiosClient } from "@/helpers/axiosClient";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IMaskInput } from "react-imask";

export default function Booking() {
  const { user } = useSelector((state) => state.user);
  const [MOCK_LOCATION, setMOCK_LOCATIONS] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [selectedLocker, setSelectedLocker] = useState("");
  const [subtotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const params = useParams();

  const numberOfDays =
    startDate && endDate
      ? Math.max(1, differenceInDays(endDate, startDate))
      : 1;

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      lockerId: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required("Card number is required")
        .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid card number"),
      expiryDate: Yup.string()
        .required("Expiry date is required")
        .matches(/^\d{2}\/\d{2}$/, "Invalid expiry date"),
      cvv: Yup.string()
        .required("CVV is required")
        .matches(/^\d{3}$/, "Invalid CVV"),
      cardName: Yup.string().required("Cardholder name is required"),
      lockerId: Yup.string().required("Locker selection is required"),
    }),
    onSubmit: async (values) => {
      if (!user || user.role !== "USER") {
        toast.error("You must be logged in to book a locker.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }

      try {
        await axiosClient.post("/booking", {
          ...values,
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
        });
        toast.success("Booking successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Booking failed. Please try again."
        );
      }
    },
  });

  useEffect(() => {
    if (params.bookingId) {
      axiosClient
        .get(`/place/${params.bookingId}`)
        .then((response) => {
          setMOCK_LOCATIONS(response.data);
          const defaultLocker = response.data.lockers[0]?.id;
          setSelectedLocker(defaultLocker);
          formik.setFieldValue("lockerId", defaultLocker);
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
        });
    }
  }, []);

  useEffect(() => {
    const price = MOCK_LOCATION?.lockers?.find(
      (l) => l.id === formik.values.lockerId
    )?.price;
    setSubTotal(numberOfDays * (price || 0));
  }, [startDate, endDate, formik.values.lockerId]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Link
          to="/map"
          className="text-blue-600 hover:underline flex items-center gap-1 mb-2"
        >
          ← Back to map
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

      <div className="grid md:grid-cols-3 gap-6">
        {/* Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

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
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        {l.length}x{l.width} cm
                      </p>
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
          <form onSubmit={formik.handleSubmit}>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Complete Your Booking</CardTitle>
                <CardDescription>
                  Select dates and payment method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full text-left">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {format(startDate, "MMM dd")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full text-left">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {format(endDate, "MMM dd")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                  Duration: {numberOfDays} day{numberOfDays > 1 ? "s" : ""}
                </div>

                {/* Locker Selection */}
                <div className="space-y-2">
                  <Label>Locker Size</Label>
                  <RadioGroup
                    value={formik.values.lockerId}
                    onValueChange={(val) => {
                      setSelectedLocker(val);
                      formik.setFieldValue("lockerId", val);
                    }}
                  >
                    {MOCK_LOCATION?.lockers?.map((l) => (
                      <div key={l.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={l.id} id={l.id} />
                        <Label
                          htmlFor={l.id}
                          className="flex justify-between w-full"
                        >
                          <span>
                            {l.name} ({l.length}x{l.width} cm)
                          </span>
                          <span className="font-medium">
                            ${l.price.toFixed(2)}/day
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {formik.touched.lockerId && formik.errors.lockerId && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.lockerId}
                    </p>
                  )}
                </div>

                {/* Payment Fields */}
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  <Label>Payment Method</Label>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <IMaskInput
                      mask="0000 0000 0000 0000"
                      name="cardNumber"
                      value={formik.values.cardNumber}
                      onAccept={(val) =>
                        formik.setFieldValue("cardNumber", val)
                      }
                      onBlur={formik.handleBlur}
                      placeholder="1234 5678 9012 3456"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {formik.touched.cardNumber && formik.errors.cardNumber && (
                      <p className="text-red-500 text-xs">
                        {formik.errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <IMaskInput
                        mask="00/00"
                        name="expiryDate"
                        value={formik.values.expiryDate}
                        onAccept={(val) =>
                          formik.setFieldValue("expiryDate", val)
                        }
                        onBlur={formik.handleBlur}
                        placeholder="MM/YY"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {formik.touched.expiryDate &&
                        formik.errors.expiryDate && (
                          <p className="text-red-500 text-xs">
                            {formik.errors.expiryDate}
                          </p>
                        )}
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        name="cvv"
                        value={formik.values.cvv}
                        onChange={formik.handleChange}
                        placeholder="123"
                      />
                      {formik.touched.cvv && formik.errors.cvv && (
                        <p className="text-red-500 text-xs">
                          {formik.errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      name="cardName"
                      value={formik.values.cardName}
                      onChange={formik.handleChange}
                      placeholder="John Doe"
                    />
                    {formik.touched.cardName && formik.errors.cardName && (
                      <p className="text-red-500 text-xs">
                        {formik.errors.cardName}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    Your payment is secured with 256-bit SSL encryption
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Complete Booking - ${subtotal.toFixed(2)}
                </Button>
              </CardFooter>
            </Card>
          </form>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
