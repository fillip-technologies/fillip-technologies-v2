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
      },
      {
        label: "Local Area Network",
      },
      {
        label: "Control Room",
      },
      {
        label: "Networking",
      },
      {
        label: "Server Solutions",
      },
      {
        label: "Wide Area Network",
      },
      {
        label: "System Integration",
      },
      {
        label: "IT Infrastructure",
      },
      {
        label: "",
      },
      {
        label: "GPS Solution",
      },
    ],
  },
];
