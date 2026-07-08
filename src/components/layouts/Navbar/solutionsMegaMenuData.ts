export type SolutionMenuItem = {
  label: string;
  href?: string;
};

export type SolutionMenuColumn = {
  label: string;
  title: string;
  description: string;
  children: SolutionMenuItem[];
};

export const SOLUTIONS_MENU: SolutionMenuColumn[] = [
  {
    label: "Business Solutions",
    title: "Business Solutions",
    description: "Digital products, automation, and enterprise software for growth.",
    children: [
      {
        label: "Ticket Booking Solution",
        href: "/ticket-booking",
      },
      {
        label: "SMS Communication Solution",
        href: "/sms-communication",
      },
      {
        label: "WhatsApp Business Solution",
        href: "/messenger",
      },
    ],
  },
  {
    label: "Hardware Solutions",
    title: "Hardware Solutions",
    description: "Secure infrastructure, devices, and workplace technology systems.",
    children: [
      {
        label: "Security Surveillance",
        href: "/security-surveillance",
      },
      {
        label: "Fiber Optic Connectivity",
        href: "/hardware-solutions/fiber-optic-connectivity",
      },
      {
        label: "Local Area Network",
        href: "/hardware-solutions/local-area-network",
      },
      {
        label: "Control Room",
        href: "/hardware-solutions/control-room",
      },
      {
        label: "Networking",
        href: "/hardware-solutions/networking",
      },
      {
        label: "Server Solutions",
        href: "/hardware-solutions/server-solutions",
      },
      {
        label: "Wide Area Network",
        href: "/hardware-solutions/wide-area-network",
      },
      {
        label: "System Integration",
        href: "/hardware-solutions/system-integration",
      },
      {
        label: "IT Infrastructure",
        href: "/hardware-solutions/it-infrastructure",
      },
      {
        label: "GPS Solution",
        href: "/hardware-solutions/gps-solution",
      },
    ],
  },
];
