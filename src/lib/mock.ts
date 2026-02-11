export type Service = { id: string; name: string; durationMin: number; price: number; description: string };
export type Barber = { id: string; name: string; specialty: string; rating: number; image: string };
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type Booking = {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  notes?: string;
  styleMemoryConsent?: boolean;
  status: BookingStatus;
  createdAt: string;
};
export type Customer = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  preferredStyle?: string;
  notes?: string;
  photos?: string[];
  visits: number;
};
export type InspirationItem = { id: string; title: string; category: "Fade" | "Beard" | "Classic" | "Modern"; image: string; description: string };
export type ShopSettings = {
  shopName: string;
  address: string;
  phone: string;
  openingHours: string;
  styleMemoryPromptEnabled: boolean;
};

export const services: Service[] = [
  { id: "svc-1", name: "Classic Haircut", durationMin: 30, price: 35, description: "Clean cut with scissor and clipper finish." },
  { id: "svc-2", name: "Skin Fade", durationMin: 45, price: 45, description: "Precision fade with razor detail." },
  { id: "svc-3", name: "Beard Trim", durationMin: 20, price: 20, description: "Shape, line-up, and conditioning." },
  { id: "svc-4", name: "Royal Package", durationMin: 60, price: 60, description: "Haircut + beard trim + hot towel." },
];

export const barbers: Barber[] = [
  { id: "barber-1", name: "Marco", specialty: "Skin fades", rating: 4.9, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80" },
  { id: "barber-2", name: "Andre", specialty: "Classic styles", rating: 4.8, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80" },
  { id: "barber-3", name: "Sam", specialty: "Beard grooming", rating: 4.7, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
];

export const customers: Customer[] = [
  { id: "cust-1", name: "Darius Cole", phone: "(555) 201-9921", email: "darius@example.com", preferredStyle: "Low taper fade", visits: 6, notes: "Likes matte finish products.", photos: [] },
  { id: "cust-2", name: "Noah Cruz", phone: "(555) 204-1188", email: "noah@example.com", preferredStyle: "Textured crop", visits: 3, notes: "Sensitive scalp.", photos: [] },
  { id: "cust-3", name: "Eli Parker", phone: "(555) 909-4432", visits: 1, notes: "First-time customer", photos: [] },
];

export const bookings: Booking[] = [
  { id: "bk-1", customerId: "cust-1", customerName: "Darius Cole", phone: "(555) 201-9921", serviceId: "svc-2", barberId: "barber-1", date: "2026-02-11", time: "11:00", status: "confirmed", createdAt: "2026-02-10T12:30:00.000Z", styleMemoryConsent: true },
  { id: "bk-2", customerId: "cust-2", customerName: "Noah Cruz", phone: "(555) 204-1188", serviceId: "svc-1", barberId: "barber-2", date: "2026-02-11", time: "13:30", status: "pending", createdAt: "2026-02-10T14:00:00.000Z", styleMemoryConsent: false },
];

export const inspirationCatalog: InspirationItem[] = [
  { id: "cat-1", title: "Textured Crop Fade", category: "Modern", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80", description: "Natural top texture with clean fade sides." },
  { id: "cat-2", title: "Classic Side Part", category: "Classic", image: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=800&q=80", description: "Sharp side part with polished finish." },
  { id: "cat-3", title: "High Skin Fade", category: "Fade", image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&q=80", description: "High fade with crisp edge-up." },
  { id: "cat-4", title: "Defined Beard Contour", category: "Beard", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80", description: "Balanced beard contour and linework." },
];

export const shopSettings: ShopSettings = {
  shopName: "Royal Cut",
  address: "123 King Street, Toronto, ON",
  phone: "(555) 222-9000",
  openingHours: "Mon-Sat 9:00 AM - 8:00 PM",
  styleMemoryPromptEnabled: true,
};
