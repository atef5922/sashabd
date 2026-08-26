export type ConferenceInstallationProject = {
  title: string;
  cardTitle: string;
  location: string;
  brand: string;
  configuration: string;
  scope: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const conferenceInstallationProjects: readonly ConferenceInstallationProject[] = [
  {
    title: "Corporate Boardroom Conference System",
    cardTitle: "Corporate Boardroom",
    location: "Dhaka, Bangladesh",
    brand: "TOA Conference System",
    configuration: "Chairman Unit + Delegate Units",
    scope: "Supply, Installation, Configuration & Testing",
    description: "A professionally configured conference system designed for clear communication and reliable microphone control during corporate meetings.",
    image: "/images/conference_system_projects/project1.webp",
    imageAlt: "Conference microphones arranged around a modern boardroom table",
  },
  {
    title: "Meeting & Training Room Conference System",
    cardTitle: "Meeting & Training Room",
    location: "Bangladesh",
    brand: "Bosch Conference System",
    configuration: "Chairman Unit + Delegate Units",
    scope: "System Design, Supply, Installation & Commissioning",
    description: "A complete conference solution designed around room layout and participant capacity for meetings, presentations, and training sessions.",
    image: "/images/conference_system_projects/project2.webp",
    imageAlt: "Conference microphones and displays in a meeting and training room",
  },
  {
    title: "Conference Hall System Installation",
    cardTitle: "Conference Hall Installation",
    location: "Bangladesh",
    brand: "SPON Conference System",
    configuration: "Central Controller + Chairman & Delegate Units",
    scope: "Supply, Installation, Audio Integration, Testing & Handover",
    description: "A scalable conference system installation designed for consistent speech intelligibility and structured microphone control in larger meeting environments.",
    image: "/images/conference_system_projects/project3.webp",
    imageAlt: "Conference microphone equipment arranged in a large meeting hall",
  },
];
