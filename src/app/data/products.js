export const products = [
  {
    id: '1',
    name: 'Premium Infant Formula Step 1',
    category: 'infant-formula',
    categoryName: 'Infant Milk Formulas',
    price: 3450,
    originalPrice: 4200,
    rating: 4.8,
    ratingCount: '95+ reviews',
    benefits: ['BRAIN DEV', 'Easy Digest'],
    image: '/images/infant_formula.png',
    inStock: true,
    description: 'Scientifically formulated for newborns up to 6 months. Formulated with key lipids, vitamins, and minerals to mimic maternal support systems. Clinically tested to promote cognitive growth and gastrointestinal comfort.',
    detailBadges: [
      { text: 'DHA & ARA Enriched', icon: 'brain' },
      { text: 'Supports Gut Health', icon: 'heart' },
      { text: 'Gluten-Free & Non-GMO', icon: 'shield' }
    ],
    specs: {
      origin: 'Imported (Germany)',
      packaging: '800g Canister',
      ageGroup: '0-6 Months',
      certifications: 'EU Organic, WHO Compliant',
    },
    tabs: {
      specs: [
        { label: 'Organic Lactose', value: '55%' },
        { label: 'Whey Protein Concentrate', value: '15%' },
        { label: 'Vegetable Oils (with DHA)', value: '25%' },
        { label: 'Essential Minerals & Vitamins', value: '5%' }
      ],
      results: [
        { label: 'Cognitive Milestone Achievement', value: '+92%', progress: 92 },
        { label: 'Reduction in Infant Colic', value: '-75%', progress: 75 }
      ],
      references: 'Clinical trial registered under EU-CTR #2021-002931-10. Double-blind study conducted on 300 infants over 24 weeks.'
    },
    precisionTitle: 'Pediatric Certification',
    precisionText: 'Manufactured under sterile pharmaceutical grade isolation chambers. Batch verified to have zero metal or pathogenetic residue before certification.',
    howToUse: [
      { step: 1, title: 'Sterilize', text: 'Boil feeding bottle, nipple, and ring in water for 5 minutes before use.' },
      { step: 2, title: 'Measure', text: 'Pour recommended amount of boiled, cooled water into the bottle. Add exact scoops of powder.' },
      { step: 3, title: 'Shake & Feed', text: 'Cap bottle and shake well until powder dissolves completely. Check temperature on wrist.' }
    ],
    reviews: [
      { author: 'Dr. Aarav Sharma (Pediatrician)', rating: 5, comment: 'Highly recommended for babies showing lactose sensitivity in their early months. Excellent formulation.' },
      { author: 'Prerana Thapa', rating: 4, comment: 'Very easy to digest, my son has had no colic issues since switching.' }
    ]
  },
  {
    id: '2',
    name: 'Organic Multivitamin Tabs',
    category: 'supplements',
    categoryName: 'Dietary Supplements',
    price: 1850,
    originalPrice: 2400,
    rating: 4.5,
    ratingCount: '150+ reviews',
    benefits: ['IMMUNITY', 'Daily Energy'],
    image: '/images/dietary_supplement.png',
    inStock: true,
    description: 'Comprehensive daily multivitamin designed for active adults. Contains organic extracts rich in vitamin C, D3, B-complex, Zinc, and Magnesium. Formulated to fill nutrient gaps and promote cellular energy production.',
    detailBadges: [
      { text: 'Supports Immunity', icon: 'shield' },
      { text: 'Bioavailable Nutrients', icon: 'leaf' },
      { text: '100% Vegan Certified', icon: 'check-circle' }
    ],
    specs: {
      origin: 'Imported (USA)',
      packaging: '90 Vegan Tablets',
      dosage: '1 tablet daily',
      certifications: 'GMP Certified, FDA Registered Facility',
    },
    tabs: {
      specs: [
        { label: 'Vitamin C (Ascorbic Acid)', value: '500mg' },
        { label: 'Vitamin D3 (Cholecalciferol)', value: '1000IU' },
        { label: 'Zinc (as Gluconate)', value: '15mg' },
        { label: 'Active Vitamin B-Complex', value: '50mg' }
      ],
      results: [
        { label: 'Daily Alertness Increase', value: '+45%', progress: 65 },
        { label: 'Immune Resistance Boost', value: '+60%', progress: 80 }
      ],
      references: 'Tested in collaboration with US Dietary Labs (Report #US-DL-2023-V9). Double-blind comparison against standard synthetic pills.'
    },
    precisionTitle: 'Nutritional Standard',
    precisionText: 'Cold-pressed extraction preserves cellular vitamin structures, ensuring maximum absorption rate compared to heat-processed capsules.',
    howToUse: [
      { step: 1, title: 'Dosage', text: 'Take exactly 1 tablet daily, preferably in the morning.' },
      { step: 2, title: 'Timing', text: 'Ingest with or immediately after your morning meal for optimal fat-soluble absorption.' },
      { step: 3, title: 'Hydrate', text: 'Drink a full glass of water to support active compound transport.' }
    ],
    reviews: [
      { author: 'Siddharth R.', rating: 5, comment: 'Helped reduce my daily fatigue. Love that it is vegan.' }
    ]
  },
  {
    id: '3',
    name: 'Advanced Hydrating Serum',
    category: 'cosmeceuticals',
    categoryName: 'Cosmeceuticals',
    price: 2900,
    originalPrice: 3500,
    rating: 4.9,
    ratingCount: '120+ reviews',
    benefits: ['HYDRATION', 'Deep Care'],
    image: '/images/cosmeceutical.png',
    inStock: true,
    description: 'Our signature moisture-locking formula engineered for deep dermal penetration and sustained barrier repair.',
    detailBadges: [
      { text: 'Deep Cellular Rehydration', icon: 'droplet' },
      { text: 'Dermatologically Tested', icon: 'shield' },
      { text: 'Fragrance-Free', icon: 'refresh' }
    ],
    specs: {
      origin: 'Imported (South Korea)',
      packaging: '50ml Pump Bottle',
      skinType: 'All (including sensitive)',
      certifications: 'Dermatologically Tested',
    },
    tabs: {
      specs: [
        { label: 'Triple Hyaluronic Acid', value: '3.5%' },
        { label: 'Pro-Vitamin B5', value: '2.0%' },
        { label: 'Madecassoside', value: '0.5%' },
        { label: 'Thermal Spring Water', value: '65%' }
      ],
      results: [
        { label: 'Instant Hydration Increase', value: '+125%', progress: 100 },
        { label: 'Barrier Repair (48 Hours)', value: '+82%', progress: 82 }
      ],
      references: 'Based on 28-week double-blind clinical study on 250 subjects.'
    },
    precisionTitle: 'Scientific Precision',
    precisionText: 'Formulated in our ISO-certified laboratory, every batch undergoes 14 distinct quality checks before sealing. We prioritize molecular stability for maximum efficacy.',
    howToUse: [
      { step: 1, title: 'Cleanse', text: 'Prepare skin with a pH-balanced medical cleanser.' },
      { step: 2, title: 'Apply', text: 'Dispense 2-3 drops. Gently press into face and neck.' },
      { step: 3, title: 'Seal', text: 'Follow with barrier-repair moisturizer once absorbed.' }
    ],
    reviews: [
      { author: 'Dr. Kriti Adhikari (Dermatologist)', rating: 5, comment: 'Excellent formulation for post-procedure healing and dry climates.' }
    ]
  },
  {
    id: '4',
    name: 'Sterile Gauze Pads (Pack of 50)',
    category: 'surgical',
    categoryName: 'Surgical Items',
    price: 950,
    originalPrice: 1200,
    rating: 4.9,
    ratingCount: '80+ reviews',
    benefits: ['MEDICAL GRADE', 'Highly Sterile'],
    image: '/images/surgical_kit.png',
    inStock: false,
    description: 'Premium medical-grade cotton gauze pads. Double-wrapped to ensure complete sterility. Highly absorbent 8-ply construction, ideal for surgical wound dressings and clinical sanitation procedures.',
    detailBadges: [
      { text: 'Highly Sterile & Absorptive', icon: 'shield' },
      { text: '100% USP Pure Cotton', icon: 'award' },
      { text: 'Non-Fraying Edges', icon: 'plus-circle' }
    ],
    specs: {
      origin: 'Imported (India)',
      packaging: 'Box of 50 (Individually Sealed)',
      material: '100% USP Pure Cotton',
      certifications: 'CE Certified, ISO 13485',
    },
    tabs: {
      specs: [
        { label: 'Absorbent Cotton USP', value: '100%' },
        { label: 'Construction Ply Count', value: '8-Ply' },
        { label: 'Sterility Verification', value: 'EO Gas' },
        { label: 'Thread Density', value: '28 x 24 mesh' }
      ],
      results: [
        { label: 'Absorbency Index Increase', value: '+140%', progress: 95 },
        { label: 'Particle Shedding Reduction', value: '-95%', progress: 95 }
      ],
      references: 'Tested in compliance with USP guidelines. Verified sterile by Bureau Veritas certification #BV-SURG-2023-G7.'
    },
    precisionTitle: 'Medical Sterility',
    precisionText: 'Sterilized using Ethylene Oxide gas under strictly monitored pressure chambers. Each pad remains sterile for up to 5 years if package is unopened.',
    howToUse: [
      { step: 1, title: 'Sanitize', text: 'Clean hands with soap or clinical sanitizer before dressing opening.' },
      { step: 2, title: 'Open', text: 'Peel back the sterile outer envelope carefully without touching the inner gauze surface.' },
      { step: 3, title: 'Dress', text: 'Apply directly over wound and secure with medical adhesive tape.' }
    ],
    reviews: [
      { author: 'Nurse Rajesh K.', rating: 5, comment: 'Absorbency is superb. Very reliable for clinical dressing changes.' }
    ]
  },
  {
    id: '5',
    name: 'Lactation Support Powder',
    category: 'infant-formula',
    categoryName: 'Infant Milk Formulas',
    price: 2100,
    originalPrice: 2800,
    rating: 4.2,
    ratingCount: '40+ reviews',
    benefits: ['100% NATURAL', 'Post-Natal'],
    image: '/images/infant_formula.png',
    inStock: true,
    description: 'A herbal nutritional supplement formulated to naturally support and enrich milk supply for lactating mothers. Enriched with Fenugreek, Fennel seeds, and essential prenatal micro-nutrients.',
    detailBadges: [
      { text: 'Aids Natural Milk Supply', icon: 'refresh' },
      { text: 'Rich in Iron & Calcium', icon: 'shield' },
      { text: 'No Artificial Additives', icon: 'check-circle' }
    ],
    specs: {
      origin: 'Imported (India)',
      packaging: '400g Foil Pack',
      usage: '2 scoops with warm milk',
      certifications: 'ISO Certified, AYUSH Standard',
    },
    tabs: {
      specs: [
        { label: 'Organic Fenugreek Extract', value: '1.5g' },
        { label: 'Fennel Seed Concentrate', value: '800mg' },
        { label: 'Natural Shatavari Extract', value: '1.2g' },
        { label: 'Vitamins & Iron Complex', value: '300mg' }
      ],
      results: [
        { label: 'Maternal Lactation Vol.', value: '+85%', progress: 85 },
        { label: 'Baby Feeding Satisfaction', value: '+90%', progress: 90 }
      ],
      references: 'Independent study published in Maternity Nutrition Journal 2022. Tested on 120 mothers over 8 weeks.'
    },
    precisionTitle: 'Herbal Purity',
    precisionText: 'Standardized cold extract processing preserves volatile herbal flavonoids, maximizing nutritional delivery without chemical preservatives.',
    howToUse: [
      { step: 1, title: 'Scoop', text: 'Measure exactly 2 level scoops of support powder.' },
      { step: 2, title: 'Mix', text: 'Stir vigorously into a cup (200ml) of warm milk or water until smooth.' },
      { step: 3, title: 'Drink', text: 'Consume twice daily after major meals for sustained nutrition support.' }
    ],
    reviews: [
      { author: 'Anjali D.', rating: 4, comment: 'Noticeable difference in supply within 3 days. Taste is pleasant.' }
    ]
  },
  {
    id: '6',
    name: 'Omega-3 Fish Oil Capsules',
    category: 'supplements',
    categoryName: 'Dietary Supplements',
    price: 2200,
    originalPrice: 2800,
    rating: 4.7,
    ratingCount: '110+ reviews',
    benefits: ['HEART HEALTH', 'High EPA/DHA'],
    image: '/images/dietary_supplement.png',
    inStock: true,
    description: 'Sourced from deep-sea wild-caught fish, molecularly distilled to ensure zero mercury or heavy metal contamination. Formulated with high-strength EPA and DHA to aid cardiovascular wellness, joint flexibility, and brain function.',
    detailBadges: [
      { text: 'Supports Heart & Joint', icon: 'heart' },
      { text: 'Ultra-Pure Molecular Distillation', icon: 'shield' },
      { text: 'Mercury & Toxin Free', icon: 'check-circle' }
    ],
    specs: {
      origin: 'Imported (Norway)',
      packaging: '60 Softgels',
      dosage: '2 softgels daily',
      certifications: 'IFOS 5-Star Rated',
    },
    tabs: {
      specs: [
        { label: 'Wild Fish Oil Concentrate', value: '1000mg' },
        { label: 'Eicosapentaenoic Acid (EPA)', value: '360mg' },
        { label: 'Docosahexaenoic Acid (DHA)', value: '240mg' },
        { label: 'Mixed Tocopherols (Vitamin E)', value: '10IU' }
      ],
      results: [
        { label: 'Cardiovascular Index Balance', value: '+40%', progress: 70 },
        { label: 'Joint Mobility Improvement', value: '+55%', progress: 75 }
      ],
      references: 'Tested and certified by the International Fish Oil Standards (IFOS). Certified zero mercury count.'
    },
    precisionTitle: 'Distillation Quality',
    precisionText: 'Vacuum molecular distillation ensures thermal heat does not oxidize sensitive fatty acids, maintaining high capsule freshness values.',
    howToUse: [
      { step: 1, title: 'Count', text: 'Take 2 softgels daily.' },
      { step: 2, title: 'Injest', text: 'Swallow with water during lunch or dinner to enhance natural fat absorption.' },
      { step: 3, title: 'Store', text: 'Keep bottle closed tightly in a cool, dry place out of direct sunlight.' }
    ],
    reviews: [
      { author: 'Manish Bhattarai', rating: 5, comment: 'No fishy aftertaste! Great quality Omega-3.' }
    ]
  },
  {
    id: '7',
    name: 'Clinical Sun Protection SPF50',
    category: 'cosmeceuticals',
    categoryName: 'Cosmeceuticals',
    price: 1550,
    originalPrice: 2000,
    rating: 4.4,
    ratingCount: '65+ reviews',
    benefits: ['MATTE FINISH', 'Clinical SPF'],
    image: '/images/cosmeceutical.png',
    inStock: true,
    description: 'Broad-spectrum UVA/UVB gel protection developed for sensitive and acne-prone skin. Non-comedogenic, fragrance-free formula that offers a clean matte finish. Suitable for use under makeup or in clinical post-laser care.',
    detailBadges: [
      { text: 'Broad Spectrum UVA/UVB', icon: 'shield' },
      { text: 'Fragrance-Free Matte', icon: 'refresh' },
      { text: 'Dermatologist Approved', icon: 'check-circle' }
    ],
    specs: {
      origin: 'Imported (France)',
      packaging: '50ml Tube',
      protection: 'SPF 50+ / PA++++',
      certifications: 'FDA Approved Sunscreen',
    },
    tabs: {
      specs: [
        { label: 'Ethylhexyl Salicylate', value: '5%' },
        { label: 'Homosalate UV Filter', value: '10%' },
        { label: 'Niacinamide (Vitamin B3)', value: '2%' },
        { label: 'Tocopherol Acetate', value: '1%' }
      ],
      results: [
        { label: 'UV Cell Protection Rate', value: '98%', progress: 98 },
        { label: 'Sebum Oil Reduction', value: '-35%', progress: 70 }
      ],
      references: 'Tested in sunscreen labs in Lyon, France. Evaluation report #FR-UV-2023-G1.'
    },
    precisionTitle: 'Sunscreen Safety',
    precisionText: 'Formulated without oxybenzone and octinoxate. Environmentally safe, reef-friendly formulation that protects both skin cells and oceans.',
    howToUse: [
      { step: 1, title: 'Amount', text: 'Squeeze a generous length of sunscreen on two fingers.' },
      { step: 2, title: 'Apply', text: 'Apply evenly onto face, neck, and exposed ears 15 minutes before sun exposure.' },
      { step: 3, title: 'Reapply', text: 'Reapply after 80 minutes of swimming or sweating, or every 2 hours.' }
    ],
    reviews: [
      { author: 'Sophiya K.', rating: 4, comment: 'Leaves zero white cast on brown skin! Finally a great sunscreen.' }
    ]
  },
  {
    id: '8',
    name: 'Digital Blood Pressure Monitor',
    category: 'surgical',
    categoryName: 'Surgical Items',
    price: 5400,
    originalPrice: 6500,
    rating: 4.6,
    ratingCount: '140+ reviews',
    benefits: ['AUTO-DETECT', 'Clinical Spec'],
    image: '/images/surgical_kit.png',
    inStock: true,
    description: 'Fully automatic digital blood pressure monitor with clinical-grade accuracy. Features double-user memory storage, irregular heartbeat detection, and a color-coded WHO scale indicator for quick blood pressure readings.',
    detailBadges: [
      { text: 'Auto WHO Code Detect', icon: 'activity' },
      { text: 'Double User Storage (99x2)', icon: 'users' },
      { text: 'Clinically Validated Accuracy', icon: 'award' }
    ],
    specs: {
      origin: 'Imported (Japan)',
      packaging: 'Device + Adult Cuff + Case',
      powerSource: '4 AA Batteries or USB-C',
      certifications: 'BHS Clinically Validated',
    },
    tabs: {
      specs: [
        { label: 'Pressure Resolution', value: '1 mmHg' },
        { label: 'Heart Rate Pulse Range', value: '40-180 bpm' },
        { label: 'Inflation pressure pump', value: 'Automatic Fuzzy' },
        { label: 'Cuff Size Range', value: '22 - 42 cm' }
      ],
      results: [
        { label: 'Accuracy Check Deviation', value: '±3 mmHg', progress: 95 },
        { label: 'User Setup Ease Index', value: '+92%', progress: 92 }
      ],
      references: 'BHS (British Hypertension Society) clinical protocol validation report #BHS-2022-JP9.'
    },
    precisionTitle: 'Oscillometric Accuracy',
    precisionText: 'Oscillometric biosensors measure artery pulsation directly. Embedded fuzzy-logic algorithm prevents over-inflation discomfort for elderly users.',
    howToUse: [
      { step: 1, title: 'Position', text: 'Sit quietly, place cuff on left upper arm, 2cm above the elbow elbow-level with heart.' },
      { step: 2, title: 'Press', text: 'Press the central START button. Keep arm relaxed and quiet, do not speak.' },
      { step: 3, title: 'Log', text: 'Read systolic, diastolic, and pulse values. Device stores results automatically.' }
    ],
    reviews: [
      { author: 'Dr. N. B. Karki', rating: 5, comment: 'Reading variance is negligible. Perfect for home monitoring by elders.' }
    ]
  },
  {
    id: '9',
    name: 'Toddler Growth Formula Step 3',
    category: 'infant-formula',
    categoryName: 'Infant Milk Formulas',
    price: 3200,
    originalPrice: 4000,
    rating: 4.3,
    ratingCount: '50+ reviews',
    benefits: ['HIGH PROTEIN', 'Bones Support'],
    image: '/images/infant_formula.png',
    inStock: true,
    description: 'Nutritionally tailored growth formula for active toddlers aged 1-3 years. Enhanced with prebiotics, Vitamin D, Calcium, and Iron to support bone mineral density, cognitive sharpness, and immune system resilience during growth milestones.',
    detailBadges: [
      { text: 'Aids Bone Mineral Density', icon: 'shield' },
      { text: 'High Iron & Zinc Content', icon: 'plus-circle' },
      { text: 'EU Organic Certified', icon: 'award' }
    ],
    specs: {
      origin: 'Imported (Germany)',
      packaging: '800g Canister',
      ageGroup: '12-36 Months',
      certifications: 'EU Organic Certified',
    },
    tabs: {
      specs: [
        { label: 'Organic Skimmed Milk', value: '45%' },
        { label: 'Active Iron Complex', value: '1.2mg/L' },
        { label: 'Vitamin D & Calcium', value: '450IU/L' },
        { label: 'Bifidobacterium Lactis', value: '10^8 CFU' }
      ],
      results: [
        { label: 'Bone Growth Index Growth', value: '+30%', progress: 75 },
        { label: 'Daily Appetite Improvement', value: '+45%', progress: 85 }
      ],
      references: 'Tested in Munich Pediatrics Research Lab. Certified organic standard under DE-ÖKO-001.'
    },
    precisionTitle: 'Organic Purity',
    precisionText: 'Sourced from grass-fed organic dairies. Clean label certified with zero antibiotics, growth hormones, or chemical additives.',
    howToUse: [
      { step: 1, title: 'Cleanse', text: 'Wash hands and cup. Boil drinking water and allow to cool to 40°C.' },
      { step: 2, title: 'Measure', text: 'Pour recommended water into cup. Add exact number of leveled scoops of Toddler Step 3.' },
      { step: 3, title: 'Stir', text: 'Stir well with clean spoon until dissolved. Serve immediately.' }
    ],
    reviews: [
      { author: 'Sunita Bhandari', rating: 5, comment: 'My daughter loves the taste, and her growth milestones have been perfect.' }
    ]
  },
  {
    id: '10',
    name: 'Disposable Surgical Gloves',
    category: 'surgical',
    categoryName: 'Surgical Items',
    price: 1200,
    originalPrice: 1600,
    rating: 4.1,
    ratingCount: '45+ reviews',
    benefits: ['LATEX FREE', 'Medical Grade'],
    image: '/images/surgical_kit.png',
    inStock: true,
    description: 'High-sensitivity nitrile surgical gloves. Micro-textured surface ensures an excellent wet and dry grip. Free from latex proteins to eliminate allergy triggers. High tensile strength prevents tears during operation.',
    detailBadges: [
      { text: 'Latex Allergy Free', icon: 'shield' },
      { text: 'Textured Nitrile Grip', icon: 'award' },
      { text: 'Puncture Resistant Design', icon: 'check-circle' }
    ],
    specs: {
      origin: 'Imported (Malaysia)',
      packaging: 'Box of 100 (50 Pairs)',
      material: 'Nitrile (Powder-Free)',
      certifications: 'EN 455, FDA 510(k)',
    },
    tabs: {
      specs: [
        { label: 'Material Thickness (Palm)', value: '0.12 mm' },
        { label: 'Tensile Strength (Elongation)', value: '650%' },
        { label: 'Powder Content Level', value: 'Powder-free' },
        { label: 'Pinhole AQL Verification', value: '1.5 AQL' }
      ],
      results: [
        { label: 'Puncture Resistance Index', value: '+110%', progress: 85 },
        { label: 'Clinician Grip Index Test', value: '+95%', progress: 95 }
      ],
      references: 'Tested under ASTM D6319 standards. Certified medical Grade by SGS labs.'
    },
    precisionTitle: 'Puncture Safety',
    precisionText: 'Micro-textured fingertips provide exceptional touch sensitivity. High stretchability reduces hand fatigue during long clinical procedures.',
    howToUse: [
      { step: 1, title: 'Wash', text: 'Perform standard clinical hand washing prior to glove donning.' },
      { step: 2, title: 'Retrieve', text: 'Pull a glove out from the box, touch only the inside cuff surface.' },
      { step: 3, title: 'Don', text: 'Pull glove over hand. Smooth palm and finger areas to ensure correct tactile fit.' }
    ],
    reviews: [
      { author: 'Dr. Susan Bajracharya', rating: 5, comment: 'Fits like a second skin, with high puncture resistance.' }
    ]
  }
];
