export type ConferenceRepresentativeConfiguration = {
  title: string;
  cardTitle: string;
  application: string;
  brand: string;
  configuration: string;
  illustrativeScope: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const conferenceRepresentativeConfigurations: readonly ConferenceRepresentativeConfiguration[] = [
  {
    title: "Corporate Boardroom Conference System",
    cardTitle: "Corporate Boardroom",
    application: "Corporate boardroom",
    brand: "TOA Conference System",
    configuration: "Chairman Unit + Delegate Units",
    illustrativeScope: "Design, Supply, Installation, Configuration & Testing",
    description: "A sample conference configuration for clear communication and structured microphone control during corporate meetings.",
    image: "/images/conference_system_projects/project1.webp",
    imageAlt: "Conference microphones arranged around a modern boardroom table",
  },
  {
    title: "Meeting & Training Room Conference System",
    cardTitle: "Meeting & Training Room",
    application: "Meeting and training room",
    brand: "Bosch Conference System",
    configuration: "Chairman Unit + Delegate Units",
    illustrativeScope: "System Design, Supply, Installation & Commissioning",
    description: "A sample conference solution planned around room layout and participant capacity for meetings, presentations, and training sessions.",
    image: "/images/conference_system_projects/project2.webp",
    imageAlt: "Conference microphones and displays in a meeting and training room",
  },
  {
    title: "Conference Hall System Installation",
    cardTitle: "Conference Hall Installation",
    application: "Large conference hall",
    brand: "SPON Conference System",
    configuration: "Central Controller + Chairman & Delegate Units",
    illustrativeScope: "Supply, Installation, Audio Integration, Testing & Handover",
    description: "A sample scalable conference configuration for speech intelligibility and structured microphone control in larger meeting environments.",
    image: "/images/conference_system_projects/project3.webp",
    imageAlt: "Conference microphone equipment arranged in a large meeting hall",
  },
];
