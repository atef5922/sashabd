export const heroImage = "/assets/control-systems/digital-podium/digital-podium-hero.webp";

export const modelLabels = ["Standard", "Interactive Touch", "OEM / Multimedia", "Auditorium", "Custom / Tender", "Smart Classroom"] as const;

export const applications = [
  { icon: "school", title: "Classrooms & Lecture Halls", desc: "A dedicated teaching station for lessons, annotations and lecture content.", points: ["PC or laptop presentation workflow", "Projector / interactive panel connection", "Microphone and classroom audio planning"] },
  { icon: "users", title: "Training & Conference Rooms", desc: "Keep presentations, demonstrations and discussions running from one place.", points: ["Touch display options for live explanation", "Organized source and cable access", "Existing room AV integration"] },
  { icon: "headset", title: "Auditoriums & Institutional Events", desc: "Plan the presenter station around the stage, audience and technical team.", points: ["Venue PA and microphone routing", "Recording / broadcast options as required", "Custom finish and BOQ-led configuration"] },
] as const;

export const connections = [
  { icon: "screen", title: "Your Room Display", desc: "Connect to an LED wall, projector or interactive flat panel. Confirm ports, signal direction and cable distance.", href: "/interactive-flat-panel/", link: "Explore Interactive Panels" },
  { icon: "headset", title: "Your Audio System", desc: "Match the microphone, mixer and amplifier to the room. Recording outputs can be planned where needed.", href: "/pa-system/", link: "Explore PA Systems" },
  { icon: "cpu", title: "Your Presentation Workflow", desc: "Choose an internal PC or laptop connection. Touch, networking and document-camera options depend on the model.", href: "/contact/", link: "Discuss Compatibility" },
] as const;

export const features = [
  { icon: "pen", title: "Touch & Annotation", desc: "Explain ideas on a compatible touch display; confirm the monitor, pen and software in your configuration." },
  { icon: "cpu", title: "Flexible PC Options", desc: "Plan a built-in PC or laptop workflow around your presentation apps and software licensing." },
  { icon: "cast", title: "Organized AV Connections", desc: "Bring display, microphone and network connections into a clean, serviceable presenter station." },
  { icon: "shield", title: "Practical Cabinet Design", desc: "Select storage, access panels, finish and cable routing for daily use and easier maintenance." },
] as const;

export const selectionCards = [
  { icon: "pen", title: "Display & Touch", points: ["Choose the presenter’s screen size and comfortable working height.", "Test writing accuracy, touch response and annotation software.", "Confirm the separate audience display and viewing requirements."] },
  { icon: "cpu", title: "PC, Ports & Software", points: ["Specify Windows / PC or laptop use; verify any Android option.", "List HDMI, USB, LAN and source-switching requirements.", "Check PC access, ventilation, power and software licenses."] },
  { icon: "settings", title: "Audio, Body & Installation", points: ["Confirm microphone inputs and the connection to your PA system.", "Review lockable storage, finish and equipment access.", "Include cable routing, testing, user training and support scope."] },
] as const;

export const processSteps = [
  { icon: "clipboard", title: "Share Your Needs", desc: "Room type, display, audio and presenter workflow." },
  { icon: "screen", title: "Select Configuration", desc: "Choose the podium, PC, touch and AV options." },
  { icon: "pin", title: "Plan the Site", desc: "Check placement, power and cable distances." },
  { icon: "settings", title: "Install & Test", desc: "Verify presentation, display and sound together." },
  { icon: "school", title: "User Handover", desc: "Walk through startup, source switching and shutdown." },
  { icon: "headset", title: "Ongoing Support", desc: "Coordinate troubleshooting and agreed after-sales service." },
] as const;

export const planningCards = [
  { icon: "pin", title: "Room & Equipment", points: ["Venue location, room layout and podium position", "Existing display, PA system and cable distances", "Power, network and storage requirements"] },
  { icon: "clipboard", title: "Configuration & BOQ", points: ["Touch display, PC and required connection ports", "Microphones, accessories and finish preferences", "Tender drawings and compliance checklist, if applicable"] },
  { icon: "shield", title: "Delivery & Handover", points: ["Quantity, site access and target delivery date", "Installation, testing and user-training scope", "Written warranty, service and quotation inclusions"] },
] as const;

export const faqs = [
  { q: "What is a digital podium?", a: "A digital podium, smart podium or multimedia lectern is a presenter workstation that brings computer, display and AV connections together. A touch monitor, microphone, internal PC and other modules may be included depending on the selected configuration." },
  { q: "What affects digital podium price in Bangladesh?", a: "The cabinet, touch display, PC specification, microphone and audio modules, connectivity, finish and installation scope all affect the price. The listed catalog prices are indicative project budgets, not live offers. Request a written quotation for the exact configuration and inclusions." },
  { q: "Can it connect to an LED wall, projector or interactive flat panel?", a: "Yes, with a compatible display output and signal path. Confirm the podium and display ports, supported resolution, cable length and any extender or adapter requirements. Connecting video to an interactive flat panel does not automatically provide touch control back to the podium PC." },
  { q: "Does every digital podium include a PC and touch screen?", a: "No. Some configurations include a PC or touch monitor; others provide a chassis, connections and space for optional equipment. Check the model-specific specification and approved BOQ before ordering. Operating system and software licenses should also be confirmed." },
  { q: "Can a podium work with an existing PA or conference system?", a: "Often yes, after the microphone connections, mixer inputs and output routing are checked. Separate recording or streaming outputs and conference microphone integration can be planned where the selected equipment supports them." },
  { q: "Do you provide installation and presenter training?", a: "Sasha Corporation supports delivery planning, installation, cable management, configuration, testing and user handover. Confirm which services, accessories and site work are included in your written quotation." },
  { q: "Can you supply a custom podium for a tender or BOQ?", a: "Custom configurations can be proposed against your BOQ, drawings, finish and integration requirements. Share the compliance checklist so the scope, supported features and any exceptions can be reviewed before approval." },
  { q: "What should I send to request a quotation?", a: "Send your location, quantity, room type, main display, existing audio equipment and required PC, touch and microphone options. Include cable distances, drawings or tender documents where available, plus your installation and delivery requirements." },
] as const;
