import {
  barbers,
  bookings,
  customers,
  services,
  shopSettings,
  type Barber,
  type Booking,
  type BookingStatus,
  type Customer,
  type Service,
  type ShopSettings,
} from "@/lib/mock";

const KEYS = {
  services: "royalcut_services",
  barbers: "royalcut_barbers",
  customers: "royalcut_customers",
  bookings: "royalcut_bookings",
  settings: "royalcut_settings",
  role: "royalcut_role",
};

const isClient = () => typeof window !== "undefined";

function getParsed<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

function setParsed<T>(key: string, value: T) {
  if (!isClient()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function initData() {
  if (!isClient()) return;
  if (!localStorage.getItem(KEYS.services)) setParsed(KEYS.services, services);
  if (!localStorage.getItem(KEYS.barbers)) setParsed(KEYS.barbers, barbers);
  if (!localStorage.getItem(KEYS.customers)) setParsed(KEYS.customers, customers);
  if (!localStorage.getItem(KEYS.bookings)) setParsed(KEYS.bookings, bookings);
  if (!localStorage.getItem(KEYS.settings)) setParsed(KEYS.settings, shopSettings);
}

export const loadServices = (): Service[] => getParsed(KEYS.services, services);
export const loadBarbers = (): Barber[] => getParsed(KEYS.barbers, barbers);
export const loadCustomers = (): Customer[] => getParsed(KEYS.customers, customers);
export const loadBookings = (): Booking[] => getParsed(KEYS.bookings, bookings);
export const loadSettings = (): ShopSettings => getParsed(KEYS.settings, shopSettings);

export const saveCustomers = (items: Customer[]) => setParsed(KEYS.customers, items);
export const saveBookings = (items: Booking[]) => setParsed(KEYS.bookings, items);
export const saveSettings = (item: ShopSettings) => setParsed(KEYS.settings, item);

export function addBooking(input: Omit<Booking, "id" | "createdAt" | "status"> & { status?: BookingStatus }) {
  const current = loadBookings();
  const newBooking: Booking = {
    ...input,
    id: `bk-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: input.status ?? "pending",
  };
  saveBookings([newBooking, ...current]);
  return newBooking;
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  const updated = loadBookings().map((b) => (b.id === id ? { ...b, status } : b));
  saveBookings(updated);
  return updated;
}

export function upsertCustomer(customer: Customer) {
  const all = loadCustomers();
  const idx = all.findIndex((c) => c.id === customer.id);
  if (idx >= 0) all[idx] = customer;
  else all.unshift(customer);
  saveCustomers(all);
  return all;
}

export function appendCustomerPhoto(customerId: string, photoData: string) {
  const all = loadCustomers().map((c) =>
    c.id === customerId ? { ...c, photos: [photoData, ...(c.photos ?? [])] } : c,
  );
  saveCustomers(all);
  return all;
}

export const setRole = (role: "admin" | "staff") => {
  if (!isClient()) return;
  localStorage.setItem(KEYS.role, role);
};

export const getRole = (): "admin" | "staff" | null => {
  if (!isClient()) return null;
  const role = localStorage.getItem(KEYS.role);
  return role === "admin" || role === "staff" ? role : null;
};
