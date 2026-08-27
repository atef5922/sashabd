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
      "Audio conference systems organize speech pickup, meeting control, processing, and room sound so participants can communicate clearly. Sasha supports boardroom and conference-room planning with microphones, chairman and delegate units, controllers, DSP, amplifiers, and related equipment.",
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
      "Video conference systems connect room presentation, camera or video processing, displays, and meeting audio for hybrid collaboration. Current products are shown without implying unsupported platform or camera compatibility.",
    highlights: [
      { title: "Room collaboration", description: "Video and presentation equipment should support the way in-room and remote participants share information." },
      { title: "AV signal planning", description: "Source switching, processing, scaling, display output, and audio integration need to be planned as one workflow." },
      { title: "Hybrid meeting readiness", description: "Camera framing, display visibility, speech pickup, and connection requirements should be reviewed for the actual room." },
    ],
    buyerGuideTitle: "How to Choose Video Conference Equipment",
    buyerGuideIntro: "Select equipment around room dimensions, presentation sources, display systems, and confirmed integration requirements.",
    buyerGuide: [
      { title: "Define the meeting workflow", description: "Confirm whether the room needs presentation switching, remote meetings, recording, or only local display processing." },
      { title: "Review inputs and outputs", description: "Match source devices and displays using published ports, formats, and system-loading requirements." },
      { title: "Coordinate audio and video", description: "Plan microphones, speakers, processing, camera placement, and display viewing together for a usable room." },
    ],
    relatedCategorySlugs: ["audio-conference-system", "complete-package"],
    faqs: [
      { q: "What belongs in a video conference system?", a: "Depending on the project, it may include cameras, video processing, displays, presentation sources, meeting audio, control, and network connectivity. The current matching products are listed on this page." },
      { q: "Can video conference equipment support hybrid meetings?", a: "It can be planned for hybrid meetings when the selected camera, audio, processing, display, and connection workflow are mutually compatible." },
      { q: "What affects video conference system pricing?", a: "Room size, camera and display requirements, processing, source switching, meeting audio, installation, and integration scope all affect the final quotation." },
    ],
  },
  "wired-conference-system": {
    heroTitle: "Wired Conference System Price in Bangladesh",
    intro:
      "Wired conference systems are generally planned for permanent meeting rooms where structured physical connectivity and fixed seating are preferred. Current wired conference products, including chairman units, delegate units, and control units, are listed below.",
    highlights: [
      { title: "Permanent room planning", description: "Wired systems suit fixed boardrooms and formal meeting spaces where table and cable routes can be designed in advance." },
      { title: "Structured connectivity", description: "Controller location, table entry points, cable protection, and service access should be included in the installation plan." },
      { title: "Compatibility first", description: "Chairman, delegate, controller, and extension components must belong to a compatible product ecosystem." },
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
      { q: "Are wired products currently listed here?", a: "Yes. Wired conference products, including chairman units, delegate units, and control units, are listed directly on this page." },
      { q: "What should a wired conference BOQ include?", a: "The BOQ should consider compatible microphones, controller, cables, connectors, table or floor routing, rack equipment, installation, testing, and future service access." },
    ],
    emptyMessage: "No dedicated wired products are currently listed. Contact Sasha for project consultation and current availability.",
  },
  "wireless-conference-system": {
    heroTitle: "Wireless Conference System Price in Bangladesh",
    intro:
      "Wireless conference systems reduce table cabling and support rooms where seating layouts change. Current wireless delegate units, access equipment, charging products, and systems are listed directly below.",
    highlights: [
      { title: "Flexible seating", description: "Wireless operation can support reconfigured tables, multipurpose rooms, and venues where fixed microphone cabling is impractical." },
      { title: "Cleaner tabletop layout", description: "Fewer table cables can simplify room presentation while charging and storage still require planning." },
      { title: "Ecosystem compatibility", description: "Wireless units, access points, controllers, batteries, and chargers must be selected as a compatible system." },
    ],
    buyerGuideTitle: "How to Choose a Wireless Conference System",
    buyerGuideIntro: "Review participant quantity, room coverage, charging workflow, and product-family compatibility.",
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
      "A chairman unit is the meeting position intended for the chairperson or moderator. It forms part of a compatible conference ecosystem and may support meeting-control functions depending on the selected product and controller.",
    highlights: [
      { title: "Chairperson position", description: "The unit provides a dedicated speaking position for the person leading or moderating the meeting." },
      { title: "Meeting control concept", description: "Priority or moderation behavior is a category concept; exact functions must be confirmed for each product." },
      { title: "System compatibility", description: "A chairman unit should be matched with its compatible controller, delegate units, cabling, or wireless ecosystem." },
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
      { q: "Does every chairman unit have a priority function?", a: "Priority control is common as a category concept, but exact controls vary. Confirm the published product specifications and controller behavior." },
    ],
  },
  "delegate-unit": {
    heroTitle: "Conference Delegate Unit Price in Bangladesh",
    intro:
      "Delegate units give meeting participants individual speaking positions within a structured discussion system. Selection depends on controller compatibility, connection architecture, participant workflow, and room layout.",
    highlights: [
      { title: "Participant speech position", description: "Each delegate unit provides a defined place for participant speech pickup and meeting interaction." },
      { title: "Scalable room planning", description: "The required quantity follows the seating plan and the supported capacity of the chosen system." },
      { title: "Compatible ecosystem", description: "Delegate units must match the controller and any wired or wireless access and charging equipment." },
    ],
    buyerGuideTitle: "How to Choose Delegate Units",
    buyerGuideIntro: "Plan delegate quantity and compatibility from the complete meeting system rather than selecting units in isolation.",
    buyerGuide: [
      { title: "Count participant positions", description: "Map regular and maximum meeting attendance against the seating layout." },
      { title: "Verify the controller", description: "Confirm supported product family, connection, capacity, and required accessories." },
      { title: "Review user workflow", description: "Consider microphone operation and any documented interaction features required for the meeting format." },
    ],
    relatedCategorySlugs: ["chairman-unit", "control-unit", "audio-conference-system", "wireless-conference-system"],
    faqs: [
      { q: "What does a delegate unit do?", a: "It provides an individual participant position for speaking and taking part in a structured conference discussion." },
      { q: "How many delegate units are needed?", a: "The quantity depends on participant positions, shared-seat policy, room layout, and the published capacity of the selected controller." },
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
      { title: "Audio integration", description: "Connections to DSP, amplification, recording, or room audio must follow supported interfaces and system design." },
    ],
    buyerGuideTitle: "How to Choose a Conference Control Unit",
    buyerGuideIntro: "Match the controller to the microphone ecosystem, room scale, operating workflow, and integration plan.",
    buyerGuide: [
      { title: "Start with compatible units", description: "Identify the exact chairman and delegate family the controller is designed to manage." },
      { title: "Confirm capacity and expansion", description: "Review current participant quantity and realistic future growth using published specifications." },
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
      "Conference DSP equipment processes and routes room audio between microphones, sources, outputs, and supporting systems. Required processing depends on room acoustics, input and output needs, and confirmed integration requirements.",
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
      { q: "What should be checked before choosing a DSP?", a: "Check published input and output capacity, processing needs, control workflow, interfaces, and compatibility with the wider room audio system." },
    ],
  },
  "conference-amplifier": {
    heroTitle: "Conference Amplifier Price in Bangladesh",
    intro:
      "Conference amplifiers increase audio signal power for suitable room speakers and may form part of a wider meeting-room audio system. Selection depends on the speaker design, room coverage, signal chain, and published product capabilities.",
    highlights: [
      { title: "Speaker power", description: "The amplifier should be matched to the room's speaker load and coverage plan using published ratings." },
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
      { q: "How is amplifier size selected?", a: "Selection should use the confirmed speaker load, room zones, wiring design, output type, and suitable engineering margin." },
      { q: "Can a conference amplifier connect directly to microphones?", a: "That depends on the product's published inputs and system design. Many projects route microphone audio through a controller, mixer, or DSP first." },
    ],
  },
  "complete-package": {
    heroTitle: "Complete Conference System Package in Bangladesh",
    intro:
      "A complete conference package combines the discussion, control, processing, amplification, speaker, cabling, and installation requirements for a specific room. Installed package options and ready-made catalog products are shown as separate sections below.",
    highlights: [
      { title: "Complete signal chain", description: "A package may need chairman and delegate positions, controller, processing, amplification, speakers, and supporting accessories." },
      { title: "Room-size planning", description: "Participant count, seating, acoustics, and installation conditions determine the appropriate equipment mix." },
      { title: "BOQ-based scope", description: "A project BOQ documents selected products, quantities, cabling, installation, configuration, testing, and handover." },
    ],
    buyerGuideTitle: "How to Plan a Complete Conference Package",
    buyerGuideIntro: "Build the package from confirmed room requirements instead of selecting a generic bundle.",
    buyerGuide: [
      { title: "Survey the room", description: "Document seating, participant quantity, acoustics, furniture, display needs, and cable routes." },
      { title: "Define the system architecture", description: "Choose a compatible chairman, delegate, controller, processing, amplifier, and speaker workflow." },
      { title: "Prepare and verify the BOQ", description: "Confirm every model, quantity, accessory, installation item, testing step, and support requirement." },
    ],
    relatedCategorySlugs: ["audio-conference-system", "video-conference-system", "wired-conference-system", "wireless-conference-system", "control-unit"],
    faqs: [
      { q: "What is included in a complete conference package?", a: "The contents depend on the room, but may include compatible chairman and delegate units, controller, DSP, amplifier, speakers, cabling, accessories, installation, testing, and handover." },
      { q: "Are complete package products currently listed?", a: "Yes. Two ready-made complete-system products are listed separately from the installed room packages on this page." },
      { q: "How is a conference-system BOQ prepared?", a: "It starts with room size, seating, participant workflow, audio and video needs, infrastructure, product compatibility, installation, and commissioning requirements." },
      { q: "Do conference system package prices include installation?", a: "The displayed package ranges include the listed equipment, standard installation, system configuration, and testing. Final pricing may change after reviewing the selected brand, room layout, cable length, speaker requirements, site conditions, and any additional integration work." },
    ],
    emptyMessage: "No ready-made complete-system product is currently listed. Sasha can review the room and prepare a project-specific quotation using available equipment.",
  },
};

export const conferenceBrandPageContent: Readonly<Record<string, ConferenceBrandPageContent>> = {
  bosch: {
    heroTitle: "Bosch Conference System Price in Bangladesh",
    intro:
      "The current Bosch Conference catalog covers the analogue CCS 900 Ultra range and the digital CCS 1000 D platform, including control units, a recording control unit, and chairman and delegate discussion positions. Bosch PA amplifiers and loudspeakers are listed separately under PA System.",
    highlights: [
      { title: "Two discussion platforms", description: "CCS 900 Ultra covers plug-and-play analogue rooms; CCS 1000 D adds browser-based digital configuration and speaker queueing." },
      { title: "Recording without extra hardware", description: "The CCSD-CURD control unit captures meeting audio to USB storage, removing the separate recorder a minute-taking room would otherwise need." },
      { title: "Single-cable daisy chain", description: "Audio, control data, and power share one cable to each discussion device, which keeps table dressing manageable in large rooms." },
    ],
    buyerGuideTitle: "Planning a Bosch Conference System",
    buyerGuideIntro: "Decide between the analogue and digital platforms first, because that choice sets the control unit and every table position after it.",
    buyerGuide: [
      { title: "Choose analogue or digital", description: "CCS 900 Ultra suits fixed rooms that need speed of commissioning; CCS 1000 D suits rooms needing configurable discussion modes and camera triggers." },
      { title: "Fix the chairman-to-delegate split", description: "Confirm how many priority positions the meeting protocol requires before counting delegate units." },
      { title: "Decide on recording at design stage", description: "Choosing CCSD-CURD later means replacing a working control unit, so confirm the archiving requirement before purchase." },
    ],
    faqs: [
      { q: "What is the difference between CCS 900 Ultra and CCS 1000 D?", a: "CCS 900 Ultra is an analogue discussion range commissioned without configuration software. CCS 1000 D is digital, configured from a web browser, and adds request-to-speak queueing and camera-control triggers." },
      { q: "Do I need the CCSD-CURD instead of the CCSD-CU?", a: "Only if the meeting audio has to be recorded. The CCSD-CURD adds onboard capture to USB storage; otherwise the two control units manage discussion identically." },
      { q: "Are Bosch PA products part of this Conference range?", a: "No. Bosch mixer amplifiers, ceiling loudspeakers, and call stations are PA System products and are listed under that category, not here." },
    ],
  },
  toa: {
    heroTitle: "TOA Conference System Price in Bangladesh",
    intro:
      "The current TOA Conference catalog spans the TS-680, TS-690, TS-780, TS-790, TS-800, and TS-900 discussion ranges, covering central units, chairman and delegate stations, an expansion unit, and factory extension cords. TOA PA amplifiers and loudspeakers are listed under PA System.",
    highlights: [
      { title: "A platform for each room size", description: "TS-690 and TS-820 suit compact rooms, TS-780 and TS-790 cover mid-size halls, and TS-900 is TOA's provision for large formal chambers." },
      { title: "Defined expansion route", description: "The TS-918 expansion unit extends a TS-910 chamber without replacing the central unit, which protects the original specification as seating grows." },
      { title: "Local service depth", description: "TOA has been supported in Bangladesh long enough that spares and repair knowledge exist in-country, which matters for a ten-year installation." },
    ],
    buyerGuideTitle: "Planning a TOA Conference System",
    buyerGuideIntro: "Size the platform against realistic growth, not just today's seating — outgrowing a central unit is the most expensive mistake in a conference fit-out.",
    buyerGuide: [
      { title: "Match the series to the room", description: "Confirm the station count the central unit supports before selecting between the TS-690, TS-780, TS-790, and TS-900 platforms." },
      { title: "Check microphone stem length", description: "Deep tables and tiered desks need the long-stem L variants; standard stems leave the capsule too far from the speaker." },
      { title: "Schedule the extension cords", description: "Work the YR-780, YR-790, and YR-790-3 quantities out from the table drawing so short links and long rack runs are ordered correctly." },
    ],
    faqs: [
      { q: "Which TOA conference platform suits a large council chamber?", a: "The TS-900 range. Its TS-910 central unit supports formal speaker-queue procedure and expands through the TS-918 unit as member positions increase." },
      { q: "What does the L suffix mean on TOA station models?", a: "It indicates a long gooseneck microphone. Models such as TS-691L, TS-692L, and TS-792L are specified where participants sit back from the table edge." },
      { q: "Can I extend an existing TOA conference room?", a: "Usually yes. Confirm which central unit is installed first, then additional stations from the same series can be added to the chain." },
    ],
  },
  cmx: {
    heroTitle: "CMX Conference System Price in Bangladesh",
    intro:
      "The current CMX Conference catalog covers wired digital discussion across the CS, US, and WS ranges, wireless platforms using Wi-Fi, UHF, and infrared, and MC-series paperless conference hosts and management servers for document-driven meetings.",
    highlights: [
      { title: "Wired, wireless, and infrared", description: "CMX covers all three carriers, so a room can be specified around cabling constraints, radio congestion, or session confidentiality." },
      { title: "Paperless meeting platform", description: "The MC-5800E server and MC-5802ABC and MC-5803 hosts distribute agendas and papers to seat terminals instead of printed packs." },
      { title: "Table units at three tiers", description: "Compact, standard, and executive WS units share one controller, so a room can mix tiers between the head table and the sides." },
    ],
    buyerGuideTitle: "Planning a CMX Conference System",
    buyerGuideIntro: "The carrier decision comes first — cable, radio, or infrared — because it determines the controller and every table position that follows.",
    buyerGuide: [
      { title: "Decide the carrier honestly", description: "Wired is the most predictable; Wi-Fi and UHF free the table layout; infrared keeps discussion audio inside the room for closed sessions." },
      { title: "Survey before choosing wireless", description: "Infrared needs line of sight and radiator placement; UHF needs a frequency check against existing wireless microphones on site." },
      { title: "Plan paperless with IT", description: "MC-series deployments touch the network as much as the AV rack, so involve the IT team at design stage rather than at commissioning." },
    ],
    faqs: [
      { q: "Which CMX system suits a confidential closed session?", a: "The S800MC infrared controller. Infrared does not pass through walls, so discussion audio stays acoustically contained in a way no radio system can guarantee." },
      { q: "What is the difference between the WS-257, WS-259, and WS-261 units?", a: "They are the compact, standard, and executive tiers of the same WS table range. All three work with the same controller and differ in footprint, build, and finish." },
      { q: "Do CMX paperless systems replace the discussion audio?", a: "No. The MC-series hosts and servers handle agendas and documents alongside the discussion system rather than replacing the microphones and controller." },
    ],
  },
  spon: {
    heroTitle: "SPON Conference System Price in Bangladesh",
    intro:
      "The current SPON Conference catalog covers chairman and delegate units, a control unit, DSP, amplification, microphones, wireless access equipment, and charging products.",
    highlights: [
      { title: "Discussion components", description: "SPON chairman, delegate, microphone, and central-control products support structured meeting-system planning." },
      { title: "Audio processing and power", description: "The current catalog includes SPON DSP and amplifier products for wider room-audio integration." },
      { title: "Wireless workflow", description: "Wireless delegate, access-point, and charging products support flexible conference-system planning." },
    ],
    buyerGuideTitle: "Planning a SPON Conference System",
    buyerGuideIntro: "Select products as a compatible system and confirm model relationships before preparing the final BOQ.",
    buyerGuide: [
      { title: "Choose the system architecture", description: "Define whether the project uses compatible digital or wireless discussion products and supporting equipment." },
      { title: "Match control and participant units", description: "Verify controller, chairman, delegate, access, and charging compatibility rather than relying on brand name alone." },
      { title: "Complete the room audio plan", description: "Review DSP, amplification, speakers, cabling, installation, and commissioning requirements." },
    ],
    faqs: [
      { q: "Which SPON Conference products are currently listed?", a: "Sasha currently lists SPON microphones, chairman and delegate units, a control unit, DSP, amplifier, wireless access equipment, and a charger." },
      { q: "Can all SPON Conference products be combined automatically?", a: "No. Model family, controller, connection, charging, and accessory compatibility must still be verified for the intended system." },
      { q: "Can Sasha prepare a SPON Conference quotation?", a: "Yes. Sasha can review the room, participant layout, product requirements, installation scope, and BOQ before preparing a quotation." },
    ],
  },
};
