function formatSlugTitle(slug: string) {
    return slug
        .split("-")
        .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
        .join(" ");
}

const fieldTitleMap: Record<string, string> = {
    "computer-engineering": "Computer Engineering (BCT)",
    "electrical-engineering": "Electrical Engineering (BEL)",
    "electronics-and-communication": "Electronics and Communication (BEX)",
    "agriculture-engineering": "Agriculture Engineering (BAG)",
    "architecture-engineering": "Architecture Engineering (B.Arch)",
    "mechanical-engineering": "Mechanical Engineering (BME)",
    "civil-engineering": "Civil Engineering (BCE)",
    "electronics-and-information": "Electronics and Information (BEI New)",
    "automobile-engineering": "Automobile Engineering",
    "aerospace-engineering": "Aerospace Engineering",
    "geomatics-engineering": "Geomatics Engineering",
    "industrial-engineering": "Industrial Engineering [BIE]",
};

const semesterLabelMap: Record<string, string> = {
    "first-semester": "Semester 1",
    "second-semester": "Semester 2",
    "third-semester": "Semester 3",
    "fourth-semester": "Semester 4",
    "fifth-semester": "Semester 5",
    "sixth-semester": "Semester 6",
    "seventh-semester": "Semester 7",
    "eighth-semester": "Semester 8",
};

const appliedMechanicsSlug = "applied-mechanics-ce-401";
const basicElectricalEngineeringSlug = "basic-electrical-engineering-ee-401";
const engineeringPhysicsSlug = "engineering-physics-sh-402";
const engineeringDrawingISlug = "engineering-drawing-i-me-401";
const engineeringMathematicsISlug = "engineering-mathematics-i-sh-401";
const computerProgrammingSlug = "computer-programming-ct-401";

const appliedMechanicsContent = [
    {
        title: "Course Objective",
        items: [
            "Provide basic knowledge of engineering mechanics for all engineering branches.",
            "Build foundation for structural engineering stress analysis and mechanics applications.",
            "Introduce mechanics common to all engineering faculties of Tribhuvan University.",
            "Emphasis on Statics.",
        ],
    },
    {
        title: "Introduction (2 hours)",
        items: [
            "Definitions and scope of Applied Mechanics.",
            "Concept of Rigid and Deformed Bodies.",
            "Fundamental concepts and principles of mechanics: Newtonian Mechanics.",
        ],
    },
    {
        title: "Basic Concept in Statics and Static Equilibrium (4 hours)",
        items: [
            "Concept of Particles and Free Body Diagram.",
            "Physical meaning of Equilibrium and its essence in structural application.",
            "Equation of Equilibrium in Two Dimension.",
        ],
    },
    {
        title: "Forces Acting on Particle and Rigid Body (6 hours)",
        items: [
            "Different types of Forces: Point, Surface Traction and Body Forces.",
            "Translational Force and Rotational Force: Relevant Examples.",
            "Resolution and Composition of Forces: Relevant Examples.",
            "Principle of Transmissibility and Equivalent Forces: Relevant Examples.",
            "Moments and couples: Relevant Examples.",
            "Resolution of a Force into Forces and a Couple: Relevant Examples.",
            "Resultant of Force and Moment for a System of Force: Examples.",
        ],
    },
    {
        title: "Center of Gravity, Centroid and Moment of Inertia (6 hours)",
        items: [
            "Concepts and Calculation of Centre of Gravity and Centroid: Examples.",
            "Calculation of Second Moment of Area / Moment of Inertia and Radius of Gyration and relevant usages.",
            "Use of Parallel Axis Theorem: Relevant Examples.",
        ],
    },
    {
        title: "Friction (2 hours)",
        items: [
            "Laws of Friction, Static and Dynamic Coefficient of Friction, Angle of Friction: Engineering Examples of usage of friction.",
            "Calculations involving friction in structures: Example as High Tension Friction Grip bolts and its free body diagram.",
        ],
    },
    {
        title: "Analysis of Beams and Frames (9 hours)",
        items: [
            "Introduction to Structures: Discrete and Continuum.",
            "Concept of Load Estimating and Support Idealizations: Examples and Standard symbols.",
            "Use of beams/frames in engineering: Concept of rigid joints/distribute loads in beams/frames.",
            "Concept of Statically/Kinematically Determinate and Indeterminate Beams and Frames: Relevant Examples.",
            "Calculation of Axial Force, Shear Force and Bending Moment for Determinate Beams and Frames.",
            "Axial Force, Shear Force and Bending Moment Diagrams and Examples for drawing it.",
        ],
    },
    {
        title: "Analysis of Plane Trusses (4 hours)",
        items: [
            "Use of trusses in engineering: Concept of pin joints/joint loads in trusses.",
            "Calculation of Member Forces of Truss by method of joints: Simple Examples.",
            "Calculation of Member Forces of Truss by method of sections: Simple Examples.",
        ],
    },
    {
        title: "Kinematics of Particles and Rigid Body (7 hours)",
        items: [
            "Rectilinear Kinematics: Continuous Motion.",
            "Position, Velocity and Acceleration of a Particle and Rigid Body.",
            "Determination of Motion of Particle and Rigid Body.",
            "Uniform Rectilinear Motion of Particles.",
            "Uniformly Accelerated Rectilinear Motion of Particles.",
            "Curvilinear Motion: Rectangular Components with Examples of Particles.",
        ],
    },
    {
        title: "Kinetics of Particles and Rigid Body: Force and Acceleration (5 hours)",
        items: [
            "Newton’s Second Law of Motion and momentum.",
            "Equation of Motion and Dynamic Equilibrium: Relevant Examples.",
            "Angular Momentum and Rate of Change.",
            "Equation of Motion - Rectilinear and Curvilinear.",
            "Rectangular: Tangential and Normal Components and Polar Coordinates: Radial and Transverse Components.",
        ],
    },
    {
        title: "Tutorials",
        items: [
            "Introduction (1 hour): Theory; definition and concept type questions.",
            "Basic Concept in Statics and Static Equilibrium (2 hours): Theory; definition and concept type questions.",
            "Concept of Force acting on structures (3 hours): Practical examples; numerical examples and derivation types of questions. Tutorials can be for each sub-section.",
            "Center of Gravity, Centroid and Moment of Inertia (4 hours): Concept type; numerical examples and practical examples type questions.",
            "Friction (2 hours): Definition type; Practical example type and numerical type questions.",
            "Analysis of Beam and Frame (5 hours): Concept type; definition type; numerical examples type with diagrams questions. Tutorials can be for each sub-section.",
            "Analysis of Plane Trusses (5 hours): Concept type; definition type; numerical examples type questions. Tutorials can be for each sub-section.",
            "Kinematics of Particles and Rigid Body (4 hours): Definition type; numerical examples type questions. Tutorials can be for each sub-section.",
            "Kinetics of Particles and Rigid Body Force and Acceleration (4 hours): Concept type; definition type; numerical examples type questions. Tutorials can be for each sub-section.",
        ],
    },
    {
        title: "References",
        items: [
            "Mechanics of Engineers- Statics and Dynamics, F.P. Beer and E.R. Johnston, Jr. 4th Edition, Mc Graw-Hill, 1987.",
            "Engineering Mechanics-Statics and Dynamics, R.C. Hibbeler, Ashok Gupta. 11th edition., New Delhi, Pearson, 2009.",
            "Engineering Mechanics- Statics and Dynamics, I.C. Jong and B.G. Rogers.",
            "Engineering Mechanics- Statics and Dynamics, D.K. Anand and P.F. Cunnif.",
            "A Text Book of Engineering Mechanics, R.S. Khurmi.",
            "Applied Mechanics and Strength of Materials, R.S. Khurmi.",
            "A Text Book of Applied Mechanics, I.B. Prasad.",
            "Engineering Mechanics-Statics and Dynamics, Shame, I.H. 3rd ed., New Delhi, Prentice Hall of India, 1990.",
        ],
    },
    {
        title: "Evaluation Scheme",
        items: [
            "The questions will cover all the chapters of the syllabus.",
            "Total: 45 hours, 80 marks (with minor deviations possible).",
            "Chapter-wise mark distribution:",
            "1: 2 hours, 3 marks",
            "2: 4 hours, 8 marks",
            "3: 6 hours, 12 marks",
            "4: 6 hours, 12 marks",
            "5: 2 hours, 4 marks",
            "6: 9 hours, 13 marks",
            "7: 4 hours, 8 marks",
            "8: 7 hours, 10 marks",
            "9: 5 hours, 10 marks",
        ],
    },
];

const basicElectricalEngineeringContent = [
    {
        title: "Course Objectives",
        items: [
            "Provide the fundamental concept of DC, AC & 3-phase electrical circuits.",
        ],
    },
    {
        title: "General Electric System (6 hours)",
        items: [
            "Constituent parts of an electrical system (source, load, communication & control).",
            "Current flow in a circuit.",
            "Electromotive force and potential difference.",
            "Electrical units.",
            "Ohm’s law.",
            "Resistors, resistivity.",
            "Temperature rise & temperature coefficient of resistance.",
            "Voltage & current sources.",
        ],
    },
    {
        title: "DC Circuits (4 hours)",
        items: [
            "Series circuits.",
            "Parallel networks.",
            "Krichhhof’s laws.",
            "Power and energy.",
        ],
    },
    {
        title: "Network Theorems (12 hours)",
        items: [
            "Application of Krichhof’s laws in network solution.",
            "Nodal Analysis.",
            "Mesh analysis.",
            "Star-delta & delta-star transformation.",
            "Superposition theorem.",
            "Thevnin’s theorem.",
            "Nortan’s theorem.",
            "Maximum power transfer theorem.",
            "Reciprocity theorem.",
        ],
    },
    {
        title: "Inductance & Capacitance in Electric Circuits (4 hours)",
        items: [
            "General concept of capacitance.",
            "Charge & voltage.",
            "Capacitors in series and parallel.",
            "General concept of inductance.",
            "Inductive & non-inductive circuits.",
            "Inductance in series & parallel.",
        ],
    },
    {
        title: "Alternating Quantities (2 hours)",
        items: [
            "AC systems.",
            "Wave form, terms & definitions.",
            "Average and RMS values of current & voltage.",
            "Phasor representation.",
        ],
    },
    {
        title: "Single-phase AC Circuits (6 hours)",
        items: [
            "AC in resistive circuits.",
            "Current & voltage in an inductive circuits.",
            "Current and voltage in an capacitive circuits.",
            "Concept of complex impedance and admittance.",
            "AC series and parallel circuit.",
            "RL, RC and RLC circuit analysis & phasor representation.",
        ],
    },
    {
        title: "Power in AC Circuits (4 hours)",
        items: [
            "Power in resistive circuits.",
            "Power in inductive and capacitive circuits.",
            "Power in circuit with resistance and reactance.",
            "Active and reactive power.",
            "Power factor, its practical importance.",
            "Improvement of power factor.",
            "Measurement of power in a single-phase AC circuits.",
        ],
    },
    {
        title: "Three-Phase Circuit Analysis (6 hours)",
        items: [
            "Basic concept & advantage of Three-phase circuit.",
            "Phasor representation of star & delta connection.",
            "Phase and line quantities.",
            "Voltage & current computation in 3-phase balance & unbalance circuits.",
            "Real and reactive power computation.",
            "Measurements of power & power factor in 3-phase system.",
        ],
    },
    {
        title: "Practical",
        items: [
            "Measurement of Voltage, current & power in DC circuit: Verification of Ohm’s Law.",
            "Temperature effects in Resistance.",
            "Krichoff’s Voltage & current Law: Evaluate power from V & I, note loading effects of meter.",
            "Measurement amplitude, frequency and time with oscilloscope: Calculate & verify average and RMS value, examine phase relation in RL & RC circuit.",
            "Measurements of alternating quantities: R, RL, RC circuits with AC excitation, AC power, power factor, VARs, phasor diagrams.",
            "Three-phase AC circuits: Measure currents and voltages in three-phase balanced AC circuits, prove Y-∆ transformation, exercise on phasor diagrams for three-phase circuits.",
            "Measurement of Voltage, current & power in a three-phase circuit: Two-wattmeter method of power measurement in R, RL and RC three phase circuits, watts ratio curve.",
        ],
    },
    {
        title: "References",
        items: [
            "J.R. Cogdell, Foundations of Electrical Engineering, Prentice Hall, Englewood Chiffs, New Jersey, 1990.",
            "I.M. Smith, Haughes Electrical Technology, Addison-Wesley, ISR Reprint, 2000.",
        ],
    },
    {
        title: "Evaluation Scheme",
        items: [
            "The questions will cover all the chapters in the syllabus.",
            "Total: 80 marks (with minor deviations possible).",
            "Chapter-wise marks distribution:",
            "1: 6 hours, 10 marks",
            "2: 4 hours, 5 marks",
            "3: 12 hours, 25 marks",
            "4: 4 hours, 5 marks",
            "5: 2 hours, 15 marks",
            "6: 6 hours, 7 marks",
            "7: 4 hours, 10 marks",
            "8: 6 hours, 10 marks",
        ],
    },
];

const engineeringPhysicsContent = [
    {
        title: "Course Objectives",
        items: [
            "Provide the concept and knowledge of physics with emphasis on present day application.",
            "Assumes background of physics corresponding to Proficiency Certificate Level.",
        ],
    },
    {
        title: "Oscillation (7 hours)",
        items: [
            "Mechanical Oscillation: Introduction.",
            "Free oscillation.",
            "Damped oscillation.",
            "Forced mechanical oscillation.",
            "EM Oscillation: Free, Damped and Forced Electromagnetic oscillation.",
        ],
    },
    {
        title: "Wave Motion (2 hours)",
        items: [
            "Waves and particles.",
            "Progressive wave.",
            "Energy, power and intensity of progressive wave.",
        ],
    },
    {
        title: "Acoustics (3 hours)",
        items: [
            "Reverberation.",
            "Sabine's Law.",
            "Ultrasound and its applications.",
        ],
    },
    {
        title: "Physical Optics (12 hours)",
        items: [
            "Interference.",
            "Intensity in double slit interference.",
            "Interference in thin films.",
            "Newton's rings.",
            "Hadinger fringes.",
            "Diffraction.",
            "Fresnel and Fraunhoffer’s diffraction.",
            "Intensity due to a single slit.",
            "Diffraction grating.",
            "X-ray diffraction, X-ray for material test.",
            "Polarization.",
            "Double refraction.",
            "Nichol prism, Wave plates.",
            "Optical activity, Specific rotation.",
        ],
    },
    {
        title: "Geometrical Optics (3 hours)",
        items: [
            "Lenses, combination of lenses.",
            "Cardinal points.",
            "Chromatic aberration.",
        ],
    },
    {
        title: "Laser and Fiber Optics (4 hours)",
        items: [
            "Laser production.",
            "He-Ne laser.",
            "Uses of laser.",
            "Fiber Optics.",
            "Self focusing.",
            "Applications of Optical fiber.",
        ],
    },
    {
        title: "Electrostatics (8 hours)",
        items: [
            "Electric charge and Force.",
            "Electric field and Potential.",
            "Electrostatic potential energy.",
            "Capacitors, Capacitor with dielectric.",
            "Charging and Discharging of a capacitor.",
        ],
    },
    {
        title: "Electromagnetism (11 hours)",
        items: [
            "Direct Current: Electric current.",
            "Ohm's law, Resistance and Resistivity.",
            "Semiconductor and Superconductor.",
            "Magnetic Fields:",
            "Magnetic force and Torque.",
            "Hall effect.",
            "Cyclotron, Synchrotron.",
            "Biot-Savart law.",
            "Ampere’s circuit law, Magnetic fields straight conductors.",
            "Faraday’s laws, Induction and Energy transformation, Induced field.",
            "LR circuit, Induced Magnetic field.",
            "Displacement current.",
        ],
    },
    {
        title: "Electromagnetic Waves (5 hours)",
        items: [
            "Maxwell’s equations.",
            "Wave equations, Speed.",
            "E and B fields.",
            "Continuity equation.",
            "Energy transfer.",
        ],
    },
    {
        title: "Photon and Matter Waves (5 hours)",
        items: [
            "Quantization of energy.",
            "Electrons and Matter waves.",
            "Schrodinger wave equation.",
            "Probability distribution.",
            "One dimensional potential well.",
            "Uncertainty principle.",
            "Barrier tunneling.",
        ],
    },
    {
        title: "References",
        items: [
            "Fundamentals of Physics: Halliday, Resnick, Walker (Latest Edition).",
            "A text book of Optics: Brij Lal and Subrahmanyam (Latest edition).",
            "Modern Engineering Physics: A. S. Basudeva.",
            "Engineering Physics: R. K. Gaur and S. L. Gupta.",
            "Waves and Oscillation: Brij Lal and Subrahmanyam.",
        ],
    },
    {
        title: "Evaluation Scheme",
        items: [
            "Questions will cover all the chapters in the syllabus.",
            "Total: 60 hours, 80 marks (with minor deviations possible).",
            "Chapter-wise mark distribution:",
            "1: 7 hours, 10 marks",
            "2,3: 5 hours, 5 marks",
            "4: 12 hours, 15 marks",
            "5: 3 hours, 5 marks",
            "6: 4 hours, 5 marks",
            "7,8: 19 hours, 30 marks",
            "9: 5 hours, 5 marks",
            "10: 5 hours, 5 marks",
        ],
    },
];

const engineeringDrawingIContent = [
    {
        title: "Course Objective",
        items: [
            "Develop basic projection concepts with reference to points, lines, planes and geometrical solids.",
            "Develop sketching and drafting skills to facilitate communication.",
        ],
    },
    {
        title: "Instrumental Drawing, Technical Lettering Practices and Techniques (2 hours)",
        items: [
            "Equipment and materials.",
            "Description of drawing instruments, auxiliary equipment and drawing materials.",
            "Techniques of instrumental drawing.",
            "Pencil sharpening, securing paper, proper use of T-squares, triangles, scales, dividers, compasses, erasing shields, French curves, inking pens.",
            "Lettering strokes, letter proportions, use of pencils and pens, uniformity and appearance of letters, freehand techniques, inclined and vertical letters and numerals, upper and lower cases, standard English lettering forms.",
        ],
    },
    {
        title: "Dimensioning (2 hours)",
        items: [
            "Fundamentals and techniques.",
            "Size and location dimensioning, SI conversions.",
            "Use of scales, measurement units, reducing and enlarging drawings.",
            "Placement of dimensions: aligned and unidirectional.",
        ],
    },
    {
        title: "Applied Geometry (6 hours)",
        items: [
            "Plane geometrical construction: proportional division of lines, arc & line tangents.",
            "Methods for drawing standard curves such as ellipses, parabolas, hyperbolas, involutes, spirals, cycloids and helices (cylindrical and conical).",
            "Techniques to reproduce a given drawing (by construction).",
        ],
    },
    {
        title: "Basic Descriptive Geometry (14 hours)",
        items: [
            "Introduction to Orthographic projection, Principal Planes, Four Quadrants or Angles.",
            "Projection of points on first, second, third and fourth quadrants.",
            "Projection of Lines: Parallel to one of the principal plane, Inclined to one of the principal plane and parallel to other, Inclined to both principal planes.",
            "Projection Planes: Perpendicular to both principal planes, Parallel to one of the principal planes and Inclined to one of the principal planes, perpendicular to other and Inclined to both principal planes.",
            "True length of lines: horizontal, inclined and oblique lines.",
            "Rules for parallel and perpendicular lines.",
            "Point view or end view of a line.",
            "Shortest distance from a point to a line.",
            "Edge View and True shape of an oblique plane.",
            "Angle between two intersecting lines.",
            "Intersection of a line and a plane.",
            "Angle between a line and a plane.",
            "Dihedral angle between two planes.",
            "Shortest distance between two skew lines.",
            "Angle between two non-intersecting (skew) lines.",
        ],
    },
    {
        title: "Multi View (Orthographic) Projections (18 hours)",
        items: [
            "Orthographic Projections.",
            "First and third angle projection.",
            "Principal views: methods for obtaining orthographic views, projection of lines, angles and plane surfaces, analysis in three views, projection of curved lines and surfaces, object orientation and selection of views for best representation, full and hidden lines.",
            "Orthographic drawings: making an orthographic drawing, visualizing objects (pictorial view) from the given views.",
            "Interpretation of adjacent areas, true-length lines, representation of holes, conventional practices.",
            "Sectional Views: Full, half, broken revolved, removed (detail) sections, phantom of hidden section, auxiliary sectional views, specifying cutting planes for sections, conventions for hidden lines, holes, ribs, spokes.",
            "Auxiliary views: Basic concept and use, drawing methods and types, symmetrical and unilateral auxiliary views. Projection of curved lines and boundaries, line of intersection between two planes, true size of dihedral angles, true size and shape of plane surfaces.",
        ],
    },
    {
        title: "Developments and Intersections (18 hours)",
        items: [
            "Introduction and Projection of Solids.",
            "Developments: general concepts and practical considerations, development of a right or oblique prism, cylinder, pyramid, and cone, development of truncated pyramid and cone, triangulation method for approximately developed surfaces, transition pieces for connecting different shapes, development of a sphere.",
            "Intersections: lines of intersection of geometric surfaces, piercing point of a line and a geometric solid, intersection lines of two planes, intersections of prisms and pyramids, cylinder and an oblique plane. Constructing a development using auxiliary views, intersection of two cylinders, a cylinder & a cone.",
        ],
    },
    {
        title: "Practical (3 hours/week; 15 weeks)",
        items: [
            "Drawing Sheet Layout, Freehand Lettering, Sketching of parallel lines, circles, Dimensioning.",
            "Applied Geometry (Sketch and Instrumental Drawing).",
            "Descriptive Geometry I: Projection of Point and Lines (4.1 to 4.3) (Sketch and Instrumental Drawing).",
            "Descriptive Geometry II: Projection of Planes (4.4) (Sketch and Instrumental Drawing).",
            "Descriptive Geometry III: Applications in Three dimensional Space (4.5 to 4.15) (Sketch and Instrumental Drawing).",
            "Multiview Drawings (5.1) (Sketch and Instrumental Drawing).",
            "Multiview, Sectional Drawings and Dimensioning I (5.2) (Sketch and Instrumental Drawing).",
            "Multiview, Sectional Drawings and Dimensioning II (5.2) (Sketch and Instrumental Drawing).",
            "Auxiliary View, Sectional Drawings and Dimensioning (5.3) (Sketch and Instrumental Drawing).",
            "Projection of Regular Geometrical Solids (Sketch and Instrumental Drawing).",
            "Development and Intersection I (6.1) (Sketch and Instrumental Drawing).",
            "Development and Intersection II (6.2) (Sketch and Instrumental Drawing).",
            "Development and Intersection III (6.3) (Sketch and Instrumental Drawing).",
        ],
    },
    {
        title: "References",
        items: [
            "Fundamentals of Engineering Drawing, W. J. Luzadder, Prentice Hall.",
            "Engineering Drawing and Graphic Technology, T. E. French, C. J. Vierck, and R. J. Foster, Mc Graw Hill Publishing Co.",
            "Technical Drawing, F. E. Giescke, A. Mitchell, H. C. Spencer and J. T. Dygdone, Macmillan Publishing Co.",
            "Elementary Engineering Drawing, N. D. Bhatt, Charotar Publishing House, India.",
            "A Text Book of Engineering Drawing, P. S. Gill, S. K. Kataria and Sons, India.",
            "A Text Book of Engineering Drawing, R. K. Dhawan, S. Chand and Company Limited, India.",
        ],
    },
    {
        title: "Evaluation Scheme",
        items: [
            "The questions will cover all the chapters in the syllabus.",
            "Total: 60 hours, 40 marks (with minor deviations possible).",
            "Chapter-wise marks distribution:",
            "3: 6 hours, 3 marks",
            "3 to 5: 4 hours, 14 marks",
            "1, 2, 5: 22 hours, 14 marks",
            "6: 18 hours, 14 marks",
        ],
    },
];

const engineeringMathematicsIContent = [
    {
        title: "Course Objectives",
        items: [
            "Provide students a sound knowledge of calculus and analytic geometry to apply them in their relevant fields.",
        ],
    },
    {
        title: "Derivatives and their Applications (14 hours)",
        items: [
            "Introduction.",
            "Higher order derivatives.",
            "Mean value theorem.",
            "Rolle’s Theorem.",
            "Lagrange’s Mean Value Theorem.",
            "Cauchy’s Mean Value Theorem.",
            "Power series of single valued function.",
            "Taylor’s Series.",
            "Maclaurin’s Series.",
            "Indeterminate forms: L’Hospital Rule.",
            "Asymptotes to Cartesian and Polar curves.",
            "Pedal equations to Cartesian and Polar curves: Curvature and Radius of Curvature.",
        ],
    },
    {
        title: "Integration and its Applications (11 hours)",
        items: [
            "Introduction.",
            "Definite integrals and their properties.",
            "Improper integrals.",
            "Differentiation under integral sign.",
            "Reduction formula: Beta Gama functions.",
            "Application of integrals for finding areas, arc length, surface and solid of revolution in the plane for Cartesian and Polar curves.",
        ],
    },
    {
        title: "Plane Analytic Geometry (8 hours)",
        items: [
            "Transformation of coordinates: Translation and rotation.",
            "Ellipse and Hyperbola: Standard forms, tangent, and normal.",
            "General equation of conics in Cartesian and Polar forms.",
        ],
    },
    {
        title: "Ordinary Differential Equations and their Applications (12 hours)",
        items: [
            "First order and first degree differential equations.",
            "Homogenous differential equations.",
            "Linear differential equations.",
            "Equations reducible to linear differential equations: Bernoulli’s equation.",
            "First order and higher degree differential equation: Clairaut’s equation.",
            "Second order and first degree linear differential equations with constant coefficients.",
            "Second order and first degree linear differential equations with variable coefficients: Cauchy’s equations.",
            "Applications in Engineering field.",
        ],
    },
    {
        title: "Reference Books",
        items: [
            "Erwin Kreyszig, Advance Engineering Mathematics, John Wiley and Sons Inc.",
            "Thomas, Finney, Calculus and Analytical Geometry, Addison-Wesley.",
            "M. B. Singh, B. C. Bajrachrya, Differential Calculus, Sukunda Pustak Bhandar, Nepal.",
            "M. B. Singh, S. P. Shrestha, Applied Mathematics.",
            "G. D. Pant, G. S. Shrestha, Integral Calculus and Differential Equations, Sunila Prakashan, Nepal.",
            "M. R. Joshi, Analytical Geometry, Sukunda Pustak Bhandar, Nepal.",
            "S. P. Shrestha, H. D. Chaudhary, P. R. Pokharel, A Textbook of Engineering Mathematics - Vol I.",
            "Santosh Man Maskey, Calculus, Ratna Pustak Bhandar, Nepal.",
        ],
    },
    {
        title: "Evaluation Scheme",
        items: [
            "The questions will cover all the chapters in the syllabus.",
            "Total: 45 hours, 80 marks (with minor deviations possible).",
            "Chapter-wise marks distribution:",
            "1: 14 hours, 25 marks",
            "2: 11 hours, 20 marks",
            "3: 8 hours, 15 marks",
            "4: 12 hours, 20 marks",
        ],
    },
];

const computerProgrammingContent = [
    {
        title: "Course Objective",
        items: [
            "Acquaint students with computer software and high level programming languages.",
            "Emphasis on developing programming skills using C and FORTRAN.",
        ],
    },
    {
        title: "Overview of Computer Software & Programming Languages (2 hours)",
        items: [
            "System software.",
            "Application software.",
            "General software features and recent trends.",
            "Generation of programming languages.",
            "Categorization of high level languages.",
        ],
    },
    {
        title: "Problem Solving Using Computer (2 hours)",
        items: [
            "Problem analysis.",
            "Algorithm development and flowchart.",
            "Compilation and execution.",
            "Debugging and testing.",
            "Programming documentation.",
        ],
    },
    {
        title: "Introduction to C Programming (3 hours)",
        items: [
            "Character set, keywords, and data types.",
            "Preprocessor directives.",
            "Constants and variables.",
            "Operators and statements.",
        ],
    },
    {
        title: "Input and Output (2 hours)",
        items: [
            "Formatted input/output.",
            "Character input/output.",
            "Programs using input/output statements.",
        ],
    },
    {
        title: "Control Statements (6 hours)",
        items: [
            "Introduction.",
            "The goto, if, if...else, switch statements.",
            "The while, do...while, for statements.",
        ],
    },
    {
        title: "User-Defined Functions (4 hours)",
        items: [
            "Introduction.",
            "Function definition and return statement.",
            "Function prototypes.",
            "Function invocation, call by value and call by reference, recursive functions.",
        ],
    },
    {
        title: "Arrays and Strings (6 hours)",
        items: [
            "Defining an array.",
            "One-dimensional arrays.",
            "Multi-dimensional arrays.",
            "Strings and string manipulation.",
            "Passing array and string to function.",
        ],
    },
    {
        title: "Structures (4 hours)",
        items: [
            "Introduction.",
            "Processing a structure.",
            "Arrays of structures.",
            "Arrays within structures.",
            "Structures and function.",
        ],
    },
    {
        title: "Pointers (4 hours)",
        items: [
            "Introduction.",
            "Pointer declaration.",
            "Pointer arithmetic.",
            "Pointer and array.",
            "Passing pointers to a function.",
            "Pointers and structures.",
        ],
    },
    {
        title: "Data Files (4 hours)",
        items: [
            "Defining opening and closing a file.",
            "Input/output operations on files.",
            "Error handling during input/output operations.",
        ],
    },
    {
        title: "Programming Language: FORTRAN (8 hours)",
        items: [
            "Character set.",
            "Data types, constants and variables.",
            "Arithmetic operations, library functions.",
            "Structure of a Fortran program.",
            "Formatted and unformatted input/output statements.",
            "Control structures: Goto, Logical IF, Arithmetic IF, Do loops.",
            "Arrays: one dimensional and two dimensional.",
        ],
    },
    {
        title: "Laboratory",
        items: [
            "Minimum 6 sets of computer programs in C (Unit 4 to Unit 10) and 2 sets in FORTRAN (Unit 11) should be done individually (30 marks out of 50 marks).",
            "Student (maximum 4 persons in a group) should submit mini project at the end of course (20 marks out of 50 marks).",
        ],
    },
    {
        title: "References",
        items: [
            "Kelly & Pohl, A Book on C, Benjamin/Cumming.",
            "Brian W. Kernighan & Dennis M. Ritchie, The C Programming Language, PHI.",
            "Byrons S. Gotterfried, Programming with C, TMH.",
            "Yashavant Kanetkar, Let Us C, BPB.",
            "D. M. Etter, Structured Fortran for Engineers and Scientist, The Benjamin/Cummings Publishing Company, Inc.",
            "Rama N. Reddy and Carol A. Ziegler, FORTRAN 77 with Applications for Scientists and Engineers, Jaico Publishing House.",
            "Alexis Leon, Mathews Leon, Fundamentals of Information Technology, Leon Press and Vikas Publishing House.",
        ],
    },
    {
        title: "Evaluation Scheme",
        items: [
            "Questions will cover all chapters in the syllabus.",
            "Total: 45 hours, 80 marks (with minor deviations possible).",
            "Chapter-wise mark distribution:",
            "1, 2: 4 hours, 8 marks",
            "3, 4: 5 hours, 8 marks",
            "5: 6 hours, 10 marks",
            "6: 4 hours, 8 marks",
            "7: 6 hours, 10 marks",
            "8: 4 hours, 8 marks",
            "9: 4 hours, 8 marks",
            "10: 4 hours, 8 marks",
            "11: 8 hours, 12 marks",
        ],
    },
];
export default async function SubjectSyllabusPage({
    params,
}: {
    params: Promise<{ field: string; semester: string; subject: string }>;
}) {
    const { field, semester, subject } = await params;
    const fieldTitle = fieldTitleMap[field] ?? formatSlugTitle(field);
    const semesterTitle =
        semesterLabelMap[semester] ?? formatSlugTitle(semester);
    const subjectTitle = formatSlugTitle(subject);
    const isAppliedMechanics = subject === appliedMechanicsSlug;
    const isBasicElectricalEngineering =
        subject === basicElectricalEngineeringSlug;
    const isEngineeringPhysics = subject === engineeringPhysicsSlug;
    const isEngineeringDrawingI = subject === engineeringDrawingISlug;
    const isEngineeringMathematicsI = subject === engineeringMathematicsISlug;
    const isComputerProgramming = subject === computerProgrammingSlug;

    return (
        <div className="px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">
                    {isAppliedMechanics ? "Applied Mechanics" : subjectTitle}
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                    {fieldTitle} · {semesterTitle}
                </p>
            </div>

            {isAppliedMechanics ||
            isBasicElectricalEngineering ||
            isEngineeringPhysics ||
            isEngineeringDrawingI ||
            isEngineeringMathematicsI ||
            isComputerProgramming ? (
                <div className="space-y-6">
                    {(() => {
                        if (isAppliedMechanics) return appliedMechanicsContent;
                        if (isBasicElectricalEngineering)
                            return basicElectricalEngineeringContent;
                        if (isEngineeringPhysics)
                            return engineeringPhysicsContent;
                        if (isEngineeringDrawingI)
                            return engineeringDrawingIContent;
                        if (isEngineeringMathematicsI)
                            return engineeringMathematicsIContent;
                        if (isComputerProgramming)
                            return computerProgrammingContent;
                        return engineeringPhysicsContent;
                    })().map((section) => (
                        <section
                            key={section.title}
                            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
                        >
                            <h2 className="text-lg font-semibold text-white">
                                {section.title}
                            </h2>
                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                                {section.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 p-6 text-sm text-slate-400">
                    Syllabus content coming soon.
                </div>
            )}
        </div>
    );
}
