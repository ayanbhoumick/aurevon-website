export type ProductSpec = Record<string, string>;

export type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number | null;
  stock: number;
  color: string;
  images: string[];
  specs: ProductSpec;
  isUpcoming: boolean;
};

export const products: Product[] = [
  {
    id: "harmion-dmd65",
    name: "HARMION",
    slug: "harmion",
    tagline: "Pure Musical Performance. Engineered for Clarity.",
    description:
      "A high-performance 2.1 channel integrated amplifier designed for immersive, musical sound reproduction. Built with precision components and a dual-mono architecture, HARMION delivers exceptional clarity, depth, and control.",
    price: null,
    stock: 10,
    color: "White / Silver",
    images: [
      "/images/products/harmion/20260524-ABH_7232.jpg",
      "/images/products/harmion/20260416-ABH_6863-Edit.jpg",
      "/images/products/harmion/20260416-ABH_6866-Edit.jpg",
      "/images/products/harmion/20260416-ABH_6877-Edit.jpg",
      "/images/products/harmion/20260416-ABH_6879-Edit.jpg",
      "/images/products/harmion/20260416-ABH_6880-Edit.jpg",
    ],
    specs: {
      Model: "DMD65",
      Configuration: "2.1 Channel",
      "Amplifier Class": "Class D",
      "Pre-Amplification": "Burr-Brown Audio ICs",
      Architecture: "Dual Mono",
      "Power Supply": "Toroidal Transformer (Linear)",
      "Speaker Protection": "Startup, DC fault, overload",
      Connectivity: "Passive stereo speakers + active subwoofer",
      Finish: "White / Silver",
    },
    isUpcoming: false,
  },
  {
    id: "dynavion-sd150",
    name: "DYNAVION",
    slug: "dynavion",
    tagline: "Modern Connectivity. Pure Musical Power.",
    description:
      "A versatile high-performance 2.0 channel amplifier designed for modern listening. Powerful Class D amplification combined with built-in Bluetooth 5.3, USB playback, and AUX input.",
    price: null,
    stock: 10,
    color: "Red",
    images: [
      "/images/products/dynavion/20260524-ABH_7233.jpg",
      "/images/products/dynavion/20260524-ABH_7239-Edit.jpg",
      "/images/products/dynavion/20260524-ABH_7244-Edit.jpg",
      "/images/products/dynavion/20260418-ABH_6904.jpg",
      "/images/products/dynavion/20260418-ABH_6905.jpg",
      "/images/products/dynavion/20260418-ABH_6907.jpg",
      "/images/products/dynavion/20260418-ABH_6910.jpg",
      "/images/products/dynavion/20260507-ABH_7213.jpg",
      "/images/products/dynavion/20260507-ABH_7228.jpg",
    ],
    specs: {
      Model: "SD150",
      Configuration: "2.0 Channel (Stereo)",
      "Amplifier Class": "Class D (TPA3255)",
      "Output Power": "150W + 150W",
      Bluetooth: "5.3",
      "USB Playback": "Yes",
      "AUX Input": "Yes",
      "Power Supply": "Toroidal Transformer (Linear)",
      "Speaker Protection": "Built-in",
      Finish: "Red",
    },
    isUpcoming: false,
  },
  {
    id: "fidelion-sd250",
    name: "FIDELION",
    slug: "fidelion",
    tagline: "Pure Power. Precision Sound.",
    description:
      "A high-output 2.1 channel audiophile amplifier engineered for powerful, clean, and dynamic sound reproduction. Advanced Class D amplification with premium Burr-Brown pre-amplification — built for no-compromise listening.",
    price: null,
    stock: 10,
    color: "TBD",
    images: ["/images/products/fidelion/placeholder.jpg"],
    specs: {
      Model: "SD250",
      Configuration: "2.1 Channel",
      "Amplifier Class": "Class D (TPA3255)",
      "Output Power": "300W + 300W (peak)",
      "Pre-Amplification": "Burr-Brown Audio ICs",
      Architecture: "Dual-stage (preamp + power amp)",
      "Power Supply": "Toroidal Transformer (Linear)",
      "Drive Capability": "High current, low-impedance loads",
      "Speaker Protection": "Startup, overload, fault",
    },
    isUpcoming: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getShopProducts(): Product[] {
  return products.filter((p) => !p.isUpcoming);
}

export function getUpcomingProducts(): Product[] {
  return products.filter((p) => p.isUpcoming);
}
