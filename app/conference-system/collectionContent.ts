export type ConferenceCollectionInfoItem = {
  title: string;
  description: string;
};

export type ConferenceCollectionFaq = {
  q: string;
  a: string;
};

export type ConferenceCategoryPageContent = {
  heroTitle: string;
  intro: string;
  highlights: readonly ConferenceCollectionInfoItem[];
  buyerGuideTitle: string;
  buyerGuideIntro: string;
  buyerGuide: readonly ConferenceCollectionInfoItem[];
  relatedCategorySlugs: readonly string[];
  faqs: readonly ConferenceCollectionFaq[];
  emptyMessage?: string;
};

export type ConferenceBrandPageContent = {
  heroTitle: string;
  intro: string;
  highlights: readonly ConferenceCollectionInfoItem[];
  buyerGuideTitle: string;
  buyerGuideIntro: string;
  buyerGuide: readonly ConferenceCollectionInfoItem[];
  faqs: readonly ConferenceCollectionFaq[];
};

export const conferenceCategoryPageContent: Readonly<Record<string, ConferenceCategoryPageContent>> = {
  "audio-conference-system": {
    heroTitle: "Audio Conference System Price in Bangladesh",
    intro:
      "Audio conference systems organize speech pickup, meeting control, processing, and room sound so participants can communicate clearly. Sasha supports boardroom and conference-room planning with verified microphones, chairman and delegate units, controllers, DSP, amplifiers, and related equipment.",
    highlights: [
      { title: "Structured discussion", description: "Chairman, delegate, and microphone architecture helps organize who speaks and how meeting audio is managed." },
      { title: "Clearer room audio", description: "DSP, amplification, and speaker planning can improve speech distribution when selected for the room and system." },
      { title: "Project-ready planning", description: "Equipment selection should account for seating, participant workflow, room acoustics, cabling, and AV integration." },
    ],
    buyerGuideTitle: "How to Choose an Audio Conference System",
    buyerGuideIntro: "Start with the room and discussion workflow before selecting individual audio components.",
    buyerGuide: [
      { title: "Map the discussion positions", description: "Confirm participant seating and whether dedicated chairman and delegate positions are required." },
      { title: "Plan the audio chain", description: "Review microphone pickup, controller, DSP, amplifier, and speaker requirements as one connected system." },
      { title: "Check integration needs", description: "Consider recording, hybrid meeting, presentation, and wider PA integration without assuming every product supports every function." },
    ],
    relatedCategorySlugs: ["wired-conference-system", "wireless-conference-system", "chairman-unit", "delegate-unit", "control-unit", "conference-dsp", "conference-amplifier"],
    faqs: [
      { q: "What is included in an audio conference system?", a: "A project may include microphones, chairman and delegate units, a central controller, DSP, amplification, speakers, cabling, and installation services. The exact combination depends on the room and meeting workflow." },
      { q: "Does every meeting room need a DSP or amplifier?", a: "No. Processing and amplification depend on room acoustics, microphone quantity, speaker design, and integration requirements. They should be selected from the project needs rather than added automatically." },
      { q: "What affects audio conference system pricing?", a: "Pricing depends on product models, microphone quantity, controller requirements, processing, speakers, cabling, installation complexity, and commissioning scope." },
    ],
  },
  "video-conference-system": {
    heroTitle: "Video Conference System Price in Bangladesh",
    intro:
      "Video conference systems connect room presentation, camera or video processing, displays, and meeting audio for hybrid collaboration. Current verified products are shown without implying unsupported platform or camera compatibility.",
    highlights: [
      { title: "Room collaboration", description: "Video and presentation equipment should support the way in-room and remote participants share information." },
      { title: "AV signal planning", description: "Source switching, processing, scaling, display output, and audio integration need to be planned as one workflow." },
      { title: "Hybrid meeting readiness", description: "Camera framing, display visibility, speech pickup, and connection requirements should be reviewed for the actual room." },
    ],
    buyerGuideTitle: "How to Choose Video Conference Equipment",
    buyerGuideIntro: "Select equipment around room dimensions, presentation sources, display systems, and verified integration requirements.",
    buyerGuide: [
      { title: "Define the meeting workflow", description: "Confirm whether the room needs presentation switching, remote meetings, recording, or only local display processing." },
      { title: "Review inputs and outputs", description: "Match source devices and displays using verified ports, formats, and system-loading requirements." },
      { title: "Coordinate audio and video", description: "Plan microphones, speakers, processing, camera placement, and display viewing together for a usable room." },
    ],
    relatedCategorySlugs: ["audio-conference-system", "complete-package"],
    faqs: [
      { q: "What belongs in a video conference system?", a: "Depending on the project, it may include cameras, video processing, displays, presentation sources, meeting audio, control, and network connectivity. Only verified products are listed on this page." },
      { q: "Can video conference equipment support hybrid meetings?", a: "It can be planned for hybrid meetings when the selected camera, audio, processing, display, and connection workflow are mutually compatible." },
      { q: "What affects video conference system pricing?", a: "Room size, camera and display requirements, processing, source switching, meeting audio, installation, and integration scope all affect the final quotation." },
    ],
  },
  "wired-conference-system": {
    heroTitle: "Wired Conference System Price in Bangladesh",
    intro:
      "Wired conference systems are generally planned for permanent meeting rooms where structured physical connectivity and fixed seating are preferred. The current dedicated catalog has no safely verified wired products, so no products are inferred from titles or specifications.",
    highlights: [
      { title: "Permanent room planning", description: "Wired systems suit fixed boardrooms and formal meeting spaces where table and cable routes can be designed in advance." },
      { title: "Structured connectivity", description: "Controller location, table entry points, cable protection, and service access should be included in the installation plan." },
      { title: "Compatibility first", description: "Chairman, delegate, controller, and extension components must belong to a verified compatible ecosystem." },
    ],
    buyerGuideTitle: "How to Plan a Wired Conference System",
    buyerGuideIntro: "A wired project begins with seating, cable routes, controller capacity, and future maintenance access.",
    buyerGuide: [
      { title: "Confirm the permanent layout", description: "Map participant positions, furniture, floor boxes, and equipment locations before cabling begins." },
      { title: "Verify the system ecosystem", description: "Do not combine chairman, delegate, and controller products unless compatibility is documented." },
      { title: "Prepare the installation BOQ", description: "Include microphones, controller, extension cables, connectors, rack needs, testing, and handover requirements." },
    ],
    relatedCategorySlugs: ["audio-conference-system", "wireless-conference-system", "chairman-unit", "delegate-unit", "control-unit"],
    faqs: [
      { q: "When is a wired conference system suitable?", a: "It is generally suitable for permanent boardrooms, government-style meeting rooms, councils, and other spaces with fixed seating and planned cable routes." },
      { q: "Are wired products currently listed here?", a: "No safely verified wired products are currently classified in the dedicated Conference catalog. This page remains noindex until verified products are available." },
      { q: "What should a wired conference BOQ include?", a: "The BOQ should consider compatible microphones, controller, cables, connectors, table or floor routing, rack equipment, installation, testing, and future service access." },
    ],
    emptyMessage: "No dedicated products are currently verified as wired. Contact Sasha for project consultation and current availability without assuming catalog classification.",
  },
  "wireless-conference-system": {
    heroTitle: "Wireless Conference System Price in Bangladesh",
    intro:
      "Wireless conference systems reduce table cabling and support rooms where seating layouts change. Verified wireless delegate units, access equipment, charging products, and systems are listed directly from the normalized catalog.",
    highlights: [
      { title: "Flexible seating", description: "Wireless operation can support reconfigured tables, multipurpose rooms, and venues where fixed microphone cabling is impractical." },
      { title: "Cleaner tabletop layout", description: "Fewer table cables can simplify room presentation while charging and storage still require planning." },
      { title: "Ecosystem compatibility", description: "Wireless units, access points, controllers, batteries, and chargers must be selected as a compatible system." },
    ],
    buyerGuideTitle: "How to Choose a Wireless Conference System",
    buyerGuideIntro: "Review participant quantity, room coverage, charging workflow, and verified ecosystem compatibility.",
    buyerGuide: [
      { title: "Assess room and seating changes", description: "Confirm the maximum layout, participant positions, and how often furniture is reconfigured." },
      { title: "Plan access and charging", description: "Account for compatible access equipment, charging capacity, storage, and meeting turnaround time." },
      { title: "Verify system compatibility", description: "Match delegate or chairman units with the correct controller, access point, and charging ecosystem." },
    ],
    relatedCategorySlugs: ["audio-conference-system", "wired-conference-system", "chairman-unit", "delegate-unit", "control-unit"],
    faqs: [
      { q: "Why choose a wireless conference system?", a: "Wireless systems are useful when seating changes, tabletop cabling must be reduced, or a multipurpose room needs a more flexible discussion layout." },
      { q: "Do wireless conference units need charging equipment?", a: "Many wireless systems use rechargeable units, but charging requirements depend on the selected products. Verify charger capacity and compatibility before preparing the BOQ." },
      { q: "What affects wireless conference system price?", a: "Microphone quantity, controller and access equipment, charging workflow, room coverage, installation, configuration, and support scope affect pricing." },
    ],
  },
  "chairman-unit": {
    heroTitle: "Conference Chairman Unit Price in Bangladesh",
    intro:
      "A chairman unit is the meeting position intended for the chairperson or moderator. It forms part of a compatible conference ecosystem and may support meeting-control functions depending on the verified product and controller.",
    highlights: [
      { title: "Chairperson position", description: "The unit provides a dedicated speaking position for the person leading or moderating the meeting." },
      { title: "Meeting control concept", description: "Priority or moderation behavior is a category concept; exact functions must be confirmed for each product." },
      { title: "System compatibility", description: "A chairman unit should be matched with its verified controller, delegate units, cabling, or wireless ecosystem." },
    ],
    buyerGuideTitle: "How to Choose a Chairman Unit",
    buyerGuideIntro: "Start with the controller ecosystem and the meeting-control behavior required by the room.",
    buyerGuide: [
      { title: "Confirm controller compatibility", description: "Verify the supported system family before selecting a chairman unit." },
      { title: "Choose wired or wireless architecture", description: "Use only a connection type confirmed by the selected product and its compatible ecosystem." },
      { title: "Review moderation needs", description: "Clarify speaking priority and meeting-control requirements without assuming every unit offers identical functions." },
    ],
    relatedCategorySlugs: ["delegate-unit", "control-unit", "audio-conference-system", "wireless-conference-system"],
    faqs: [
      { q: "What is a conference chairman unit?", a: "It is a dedicated microphone or discussion position for the chairperson or moderator within a compatible conference system." },
      { q: "Can any chairman unit work with any controller?", a: "No. Controller, connection, protocol, and product-family compatibility must be verified before units are combined." },
      { q: "Does every chairman unit have a priority function?", a: "Priority control is common as a category concept, but exact controls vary. Confirm the verified product specifications and controller behavior." },
    ],
  },
  "delegate-unit": {
    heroTitle: "Conference Delegate Unit Price in Bangladesh",
    intro:
      "Delegate units give meeting participants individual speaking positions within a structured discussion system. Selection depends on controller compatibility, connection architecture, participant workflow, and room layout.",
    highlights: [
      { title: "Participant speech position", description: "Each verified delegate unit provides a defined place for participant speech pickup and meeting interaction." },
      { title: "Scalable room planning", description: "The required quantity follows the seating plan and the supported capacity of the chosen system." },
      { title: "Compatible ecosystem", description: "Delegate units must match the controller and any wired or wireless access and charging equipment." },
    ],
    buyerGuideTitle: "How to Choose Delegate Units",
    buyerGuideIntro: "Plan delegate quantity and compatibility from the complete meeting system rather than selecting units in isolation.",
    buyerGuide: [
      { title: "Count participant positions", description: "Map regular and maximum meeting attendance against the seating layout." },
      { title: "Verify the controller", description: "Confirm supported product family, connection, capacity, and required accessories." },
      { title: "Review user workflow", description: "Consider microphone operation and any verified interaction features required for the meeting format." },
    ],
    relatedCategorySlugs: ["chairman-unit", "control-unit", "audio-conference-system", "wireless-conference-system"],
    faqs: [
      { q: "What does a delegate unit do?", a: "It provides an individual participant position for speaking and taking part in a structured conference discussion." },
      { q: "How many delegate units are needed?", a: "The quantity depends on participant positions, shared-seat policy, room layout, and the verified capacity of the selected controller." },
      { q: "Are delegate units interchangeable between brands?", a: "They should not be assumed interchangeable. Verify controller, protocol, connection, and charging compatibility within the selected system." },
    ],
  },
  "control-unit": {
    heroTitle: "Conference Control Unit Price in Bangladesh",
    intro:
      "A conference control unit coordinates compatible microphone units and the system's discussion audio workflow. Controller selection should be based on the exact chairman, delegate, connection, and integration requirements.",
    highlights: [
      { title: "Central coordination", description: "The controller forms the management point for compatible discussion units and meeting audio operation." },
      { title: "Capacity planning", description: "Supported unit quantity and expansion should be verified for the selected controller and project." },
      { title: "Audio integration", description: "Connections to DSP, amplification, recording, or room audio must follow verified interfaces and system design." },
    ],
    buyerGuideTitle: "How to Choose a Conference Control Unit",
    buyerGuideIntro: "Match the controller to the microphone ecosystem, room scale, operating workflow, and integration plan.",
    buyerGuide: [
      { title: "Start with compatible units", description: "Identify the exact chairman and delegate family the controller is designed to manage." },
      { title: "Confirm capacity and expansion", description: "Review current participant quantity and realistic future growth using verified specifications." },
      { title: "Plan external audio connections", description: "Check requirements for DSP, speakers, recording, PA, or hybrid meeting integration." },
    ],
    relatedCategorySlugs: ["chairman-unit", "delegate-unit", "audio-conference-system", "conference-dsp", "conference-amplifier"],
    faqs: [
      { q: "What does a conference control unit manage?", a: "It coordinates compatible discussion units and meeting audio behavior. Exact capacity and operating modes depend on the selected model." },
      { q: "Can one controller operate any conference microphone?", a: "No. Product family, connection, protocol, power, and system compatibility must be verified." },
      { q: "Should the controller be selected before microphones?", a: "The controller and microphone units should be planned together because compatibility and supported capacity affect the complete system." },
    ],
  },
  "conference-dsp": {
    heroTitle: "Conference DSP Price in Bangladesh",
    intro:
      "Conference DSP equipment processes and routes room audio between microphones, sources, outputs, and supporting systems. Required processing depends on room acoustics, input and output needs, and verified integration requirements.",
    highlights: [
      { title: "Signal routing", description: "DSP can organize audio paths between microphone, source, amplifier, recording, and output equipment." },
      { title: "Room tuning", description: "EQ and level management are common processing concepts, while exact features vary by model." },
      { title: "Feedback and echo planning", description: "Management requirements depend on room design and product capability; not every DSP provides every function." },
    ],
    buyerGuideTitle: "How to Choose a Conference DSP",
    buyerGuideIntro: "Define the room's signal flow and required processing before comparing DSP products.",
    buyerGuide: [
      { title: "Count required inputs and outputs", description: "Map microphones, program sources, recording feeds, amplifiers, and other audio destinations." },
      { title: "Assess room complexity", description: "Larger or acoustically difficult rooms may need more routing and tuning than a compact meeting room." },
      { title: "Verify integration", description: "Confirm interfaces and control requirements for the conference system, amplifier, PA, or AV workflow." },
    ],
    relatedCategorySlugs: ["audio-conference-system", "conference-amplifier", "control-unit"],
    faqs: [
      { q: "What is a conference DSP used for?", a: "It is used for digital audio routing and processing between conference microphones, sources, amplifiers, recording feeds, and room outputs." },
      { q: "Does every conference room need a DSP?", a: "No. The requirement depends on microphone quantity, room acoustics, routing complexity, speaker design, and integration scope." },
      { q: "What should be checked before choosing a DSP?", a: "Check verified input and output capacity, processing needs, control workflow, interfaces, and compatibility with the wider room audio system." },
    ],
  },
  "conference-amplifier": {
    heroTitle: "Conference Amplifier Price in Bangladesh",
    intro:
      "Conference amplifiers increase audio signal power for suitable room speakers and may form part of a wider meeting-room audio system. Selection depends on the speaker design, room coverage, signal chain, and verified product capabilities.",
    highlights: [
      { title: "Speaker power", description: "The amplifier should be matched to the room's speaker load and coverage plan using verified ratings." },
      { title: "Conference audio integration", description: "Inputs and outputs should fit the controller, DSP, mixer, or other room-audio equipment." },
      { title: "Speech-focused planning", description: "Room acoustics, loudspeaker placement, and commissioning affect speech clarity as much as amplifier selection." },
    ],
    buyerGuideTitle: "How to Choose a Conference Amplifier",
    buyerGuideIntro: "Start with the speaker system and signal path, then verify amplifier power and connection requirements.",
    buyerGuide: [
      { title: "Calculate the speaker requirement", description: "Use the actual speaker quantity, impedance or line design, room zones, and suitable engineering margin." },
      { title: "Match the signal chain", description: "Confirm how audio reaches the amplifier from the controller, DSP, mixer, or source equipment." },
      { title: "Plan installation and protection", description: "Allow for rack space, ventilation, cabling, power, commissioning, and service access." },
    ],
    relatedCategorySlugs: ["audio-conference-system", "conference-dsp", "control-unit"],
    faqs: [
      { q: "Why is an amplifier used in a conference room?", a: "It provides suitable power for room speakers when the conference or processing equipment cannot directly drive the planned speaker system." },
      { q: "How is amplifier size selected?", a: "Selection should use verified speaker load, room zones, wiring design, output type, and suitable engineering margin." },
      { q: "Can a conference amplifier connect directly to microphones?", a: "That depends on the product's verified inputs and system design. Many projects route microphone audio through a controller, mixer, or DSP first." },
    ],
  },
  "complete-package": {
    heroTitle: "Complete Conference System Package in Bangladesh",
    intro:
      "A complete conference package combines the discussion, control, processing, amplification, speaker, cabling, and installation requirements for a specific room. No verified package products currently exist in the dedicated catalog, so this page does not display fabricated bundles.",
    highlights: [
      { title: "Complete signal chain", description: "A package may need chairman and delegate positions, controller, processing, amplification, speakers, and supporting accessories." },
      { title: "Room-size planning", description: "Participant count, seating, acoustics, and installation conditions determine the appropriate equipment mix." },
      { title: "BOQ-based scope", description: "A project BOQ documents verified products, quantities, cabling, installation, configuration, testing, and handover." },
    ],
    buyerGuideTitle: "How to Plan a Complete Conference Package",
    buyerGuideIntro: "Build the package from verified room requirements instead of selecting a generic bundle.",
    buyerGuide: [
      { title: "Survey the room", description: "Document seating, participant quantity, acoustics, furniture, display needs, and cable routes." },
      { title: "Define the system architecture", description: "Choose a compatible chairman, delegate, controller, processing, amplifier, and speaker workflow." },
      { title: "Prepare and verify the BOQ", description: "Confirm every model, quantity, accessory, installation item, testing step, and support requirement." },
    ],
    relatedCategorySlugs: ["audio-conference-system", "video-conference-system", "wired-conference-system", "wireless-conference-system", "control-unit"],
    faqs: [
      { q: "What is included in a complete conference package?", a: "The contents depend on the room, but may include compatible chairman and delegate units, controller, DSP, amplifier, speakers, cabling, accessories, installation, testing, and handover." },
      { q: "Are complete package products currently listed?", a: "No verified package products are currently present in the dedicated Conference catalog. This page remains noindex and does not show a fabricated bundle." },
      { q: "How is a conference-system BOQ prepared?", a: "It starts with room size, seating, participant workflow, audio and video needs, infrastructure, verified product compatibility, installation, and commissioning requirements." },
    ],
    emptyMessage: "No verified complete package is currently listed. Sasha can review the room and prepare a project-specific quotation using available verified equipment.",
  },
};

export const conferenceBrandPageContent: Readonly<Record<string, ConferenceBrandPageContent>> = {
  spon: {
    heroTitle: "SPON Conference System Price in Bangladesh",
    intro:
      "The verified SPON Conference catalog currently covers chairman and delegate units, a control unit, DSP, amplification, microphones, wireless access equipment, and charging products. Product coverage and counts come directly from the normalized catalog.",
    highlights: [
      { title: "Discussion components", description: "Verified SPON chairman, delegate, microphone, and central-control products support structured meeting-system planning." },
      { title: "Audio processing and power", description: "The current catalog includes verified SPON DSP and amplifier products for wider room-audio integration." },
      { title: "Wireless workflow", description: "Verified wireless delegate, access-point, and charging products support flexible conference-system planning." },
    ],
    buyerGuideTitle: "Planning a SPON Conference System",
    buyerGuideIntro: "Select products as a verified ecosystem and confirm compatibility before preparing the final BOQ.",
    buyerGuide: [
      { title: "Choose the system architecture", description: "Define whether the project uses compatible digital or wireless discussion products and supporting equipment." },
      { title: "Match control and participant units", description: "Verify controller, chairman, delegate, access, and charging compatibility rather than relying on brand name alone." },
      { title: "Complete the room audio plan", description: "Review DSP, amplification, speakers, cabling, installation, and commissioning requirements." },
    ],
    faqs: [
      { q: "Which SPON Conference products are currently listed?", a: "The normalized catalog currently includes verified SPON microphones, chairman and delegate units, a control unit, DSP, amplifier, wireless access equipment, and a charger." },
      { q: "Can all SPON Conference products be combined automatically?", a: "No. Model family, controller, connection, charging, and accessory compatibility must still be verified for the intended system." },
      { q: "Can Sasha prepare a SPON Conference quotation?", a: "Yes. Sasha can review the room, participant layout, verified product requirements, installation scope, and BOQ before preparing a quotation." },
    ],
  },
  huidu: {
    heroTitle: "Huidu Conference Video Product Price in Bangladesh",
    intro:
      "The dedicated Conference catalog currently contains one verified Huidu video processor for presentation switching, scaling, and meeting-room display integration. This page intentionally reflects that limited verified scope.",
    highlights: [
      { title: "Verified video coverage", description: "Current Conference coverage is limited to one normalized video-processing product." },
      { title: "Presentation workflow", description: "The listed product is positioned for switching, scaling, and LED display output planning in meeting and presentation spaces." },
      { title: "Project-specific integration", description: "Inputs, outputs, screen loading, and wider AV compatibility must be checked for the actual project." },
    ],
    buyerGuideTitle: "Planning with the Current Huidu Product",
    buyerGuideIntro: "Treat the current page as a focused product collection rather than a complete Huidu conference-system range.",
    buyerGuide: [
      { title: "Define display requirements", description: "Confirm the LED wall or display resolution, source devices, and presentation workflow." },
      { title: "Verify signal compatibility", description: "Check documented inputs, outputs, scaling, and screen-loading requirements before selection." },
      { title: "Coordinate the wider AV system", description: "Plan audio, presentation control, cabling, installation, and commissioning around the complete room." },
    ],
    faqs: [
      { q: "How many Huidu Conference products are currently verified?", a: "The dedicated normalized Conference catalog currently contains one Huidu video processor." },
      { q: "Does this page represent a complete Huidu conference range?", a: "No. It reflects only the verified Huidu product currently present in the dedicated Conference catalog." },
      { q: "What should be checked before selecting the listed processor?", a: "Verify source inputs, display outputs, scaling, screen-loading requirements, cabling, and compatibility with the planned AV workflow." },
    ],
  },
};
