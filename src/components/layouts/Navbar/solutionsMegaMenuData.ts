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
        label: "Ticket Booking Integration",
        href: "/ticket-booking",
      },
      {
        label: "SMS Communication Solution",
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
        label: "CCTV Solutions",
      },
      {
        label: "Biometric Systems",
      },
      {
        label: "Access Control",
      },
      {
        label: "Attendance Systems",
      },
      {
        label: "Networking",
      },
      {
        label: "Server Solutions",
      },
      {
        label: "Firewall & Security",
      },
      {
        label: "Smart Office",
      },
      {
        label: "IT Infrastructure",
      },
      {
        label: "Data Center",
      },
      {
        label: "Video Conferencing",
      },
    ],
  },
];
