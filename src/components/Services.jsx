import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent, useTransform, AnimatePresence } from 'framer-motion';

const TagCard = ({ number, title, text, className, aosDelay, aosType, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!ref.current || !containerRef.current) return;

    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;

    // Trigger when the line tip is 50px into the card
    const triggerY = cardTopRelativeToContainer + 50;
    const lineTipY = latest * containerHeight;

    if (lineTipY >= triggerY && !isActive) {
      setIsActive(true);
    } else if (lineTipY < triggerY && isActive) {
      setIsActive(false);
    }
  });

  return (
    <div
      ref={ref}
      data-aos={aosType || "fade-up"}
      data-aos-delay={aosDelay}
      className={`w-72 sm:w-80 rounded-[2rem] p-2 relative flex flex-col items-center hover:scale-[1.02] transition-all duration-700 z-10 ${className} ${isActive ? 'bg-[#ff2a2a] border-red-400 shadow-[0_20px_50px_rgba(255,42,42,0.4)]' : 'bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
        }`}
    >
      {/* The hole punch */}
      <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute top-4 border border-gray-300 z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-full opacity-20"></div>
      </div>

      {/* Inner container */}
      <div className={`w-full h-full rounded-[1.5rem] mt-8 p-8 flex flex-col min-h-[220px] transition-colors duration-700 ${isActive ? 'bg-red-700/50' : 'bg-[#f4f4f4]'
        }`}>
        <span className={`text-xl font-bold mb-2 font-serif italic transition-colors duration-700 ${isActive ? 'text-red-200' : 'text-gray-400'
          }`}>{number}</span>

        <h3 className={`text-2xl font-black mb-3 tracking-tight transition-colors duration-700 ${isActive ? 'text-white' : 'text-gray-900'
          }`}>{title}</h3>

        <p className={`text-sm leading-relaxed font-medium transition-colors duration-700 ${isActive ? 'text-red-100' : 'text-gray-500'
          }`}>
          {text}
        </p>
      </div>
    </div>
  );
};

const Services = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <>
      <section
        id="services"
        ref={containerRef}
        className="bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
      >
        <div className="max-w-6xl mx-auto relative md:h-[1350px]">

          {/* Header Content */}
          <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-16 md:mb-0">
            <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
              Journey Till Now
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight relative">
              My experience, community work, and achievements so far
              {/* Hand-drawn arrow */}
              <svg className="absolute -bottom-10 right-10 w-12 h-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" className="hidden" />
                <path d="M4 4 Q 10 10 15 15 M 15 15 L 10 15 M 15 15 L 15 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-sm font-medium leading-relaxed">
              A snapshot of the roles, contributions, and milestones that shaped my journey as a developer.
            </p>
          </div>

          {/* Desktop SVG Animated Dashed Line */}
          <svg
            className="hidden md:block absolute top-0 left-0 w-full h-[1350px] pointer-events-none z-0"
            viewBox="0 0 1000 1350"
            preserveAspectRatio="none"
          >
            {/* Faint background path (optional guide) */}
            <path
              d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="8 10"
            />

            {/* Mask to reveal the dashed path based on scroll */}
            <mask id="path-mask">
              <motion.path
                d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200"
                fill="none"
                stroke="white"
                strokeWidth="20"
                style={{ pathLength }}
              />
            </mask>

            {/* The actual dashed line that gets revealed */}
            <path
              d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="8 10"
              mask="url(#path-mask)"
              className="drop-shadow-sm"
            />
          </svg>

          {/* Mobile Animated Vertical Dashed Line */}
          <svg
            className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0"
            viewBox="0 0 4 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 2,0 L 2,100"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="4"
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
            />
            <mask id="path-mask-mobile">
              <motion.path
                d="M 2,0 L 2,100"
                fill="none"
                stroke="white"
                strokeWidth="4"
                style={{ pathLength }}
                vectorEffect="non-scaling-stroke"
              />
            </mask>
            <path
              d="M 2,0 L 2,100"
              fill="none"
              stroke="black"
              strokeWidth="4"
              strokeDasharray="4 6"
              mask="url(#path-mask-mobile)"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Cards Container */}
          <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">

            <TagCard
              number="01"
              title="Google Gemini Student Ambassador"
              text="Conducted student sessions on Google Gemini, AI tools, and practical AI use cases. Organized workshops, community learning activities, and peer-learning sessions for students."
              className="md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6"
              aosType="fade-left"
              aosDelay="100"
              pathLength={pathLength}
              containerRef={containerRef}
            />

            <TagCard
              number="02"
              title="Content Creator @DoraDAO"
              text="Created campaign visuals and social media content for the #GirlsWhoYap 2.0 campaign. Collaborated with the team on content planning, campaign execution, and engagement improvement."
              className="md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6"
              aosType="fade-right"
              aosDelay="200"
              pathLength={pathLength}
              containerRef={containerRef}
            />

            <TagCard
              number="03"
              title="Open Source Contributor"
              text="Contributed to 40+ projects through programs such as GSSoC, SSOC, and Hacktoberfest. Worked across diverse codebases and collaborated with global developer communities."
              className="md:absolute md:top-[700px] md:right-[5%] lg:right-[15%] rotate-1 md:rotate-3"
              aosType="fade-left"
              aosDelay="300"
              pathLength={pathLength}
              containerRef={containerRef}
            />

            <TagCard
              number="04"
              title="GitKon Game Jam Winner"
              text="Developed an educational Git-based learning game during GitKon Game Jam 2025 and won 1st place with a $2500 prize."
              className="md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%] -rotate-1 md:-rotate-3"
              aosType="fade-right"
              aosDelay="400"
              pathLength={pathLength}
              containerRef={containerRef}
            />

            {/* Hand-drawn end text */}
            <div
              data-aos="fade-in"
              data-aos-delay="600"
              className="hidden md:block absolute top-[1250px] left-[60%] font-['Caveat',cursive] text-3xl text-gray-600 rotate-6"
            >
              Still building, still learning.
            </div>

          </div>

        </div>
      </section>
      <TechnicalSkills />
      <ProjectsSection />
    </>
  );
};

const skills = [
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Firebase", category: "Database" },
  { name: "Firestore", category: "Database" },
  { name: "Firebase Auth", category: "Authentication" },
  { name: "Java", category: "Programming" },
  { name: "Python", category: "Programming" },
  { name: "Zustand", category: "State Management" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "GitHub Actions", category: "Tools" },
  { name: "Excel", category: "Tools" },
  { name: "Canva", category: "Design" },
  { name: "Framer Motion", category: "Animation" },
];

const TechnicalSkills = () => {
  return (
    <section
      id="skills"
      className="bg-white py-24 px-6 md:px-12 w-full relative overflow-hidden font-sans"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-12 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter"
          >
            <span className="text-black">TECH_</span>
            <span className="text-[#ff2a2a]">STACK</span>
          </motion.h2>
        </div>

        <div className="bg-white border border-black/20 shadow-xl rounded-2xl overflow-hidden p-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-black/20">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                className="bg-white p-3 md:p-5 relative flex flex-col justify-center min-h-[70px] md:min-h-[90px] group cursor-pointer hover:z-10 border border-transparent hover:border-[#ff2a2a]/30 hover:shadow-[0_15px_30px_rgba(255,42,42,0.15)] transition-all duration-300"
              >
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2 group-hover:text-[#ff2a2a] transition-colors">
                  {skill.category}
                </span>

                <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-[#ff2a2a] transition-colors">
                  {skill.name}
                </h3>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.06)_0%,transparent_70%)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      num: "01",
      title: "VoxelVerse",
      subtitle: "Interactive Version Control Learning Game",
      achievement: "1st Place GitKon Game Jam 2025, $2500 Prize",
      description: "Developed an educational Git-based learning game during GitKon Game Jam 2025 to help beginners understand version control. Built interactive CLI-based Git visualizations to simplify branching, merging, rebasing, and repository workflows. Designed 3D puzzle-based learning challenges, improving beginner onboarding by 40%.",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "PostCSS", "Web"],
      github: "https://github.com/sejal-Kamble18/Voxel-Verse",
      image: "/assets/projects/voxelverse.png"
    },
    {
      num: "02",
      title: "EduDiscover",
      subtitle: "College Discovery Platform",
      achievement: null,
      description: "Built a full-stack college discovery platform enabling students to search, compare, evaluate, and save colleges across India. Implemented advanced filtering, college comparison, predictor tools, discussion forums, and saved colleges using Firebase and Firestore. Designed Zustand state management and Next.js App Router.",
      tech: ["Next.js", "React", "TypeScript", "Firebase Auth", "Firestore", "Tailwind CSS", "Zustand"],
      github: "https://github.com/sejal-Kamble18/college-discovery-platform",
      image: "/assets/projects/edudiscover.png"
    },
    {
      num: "03",
      title: "AI Recipe Generator / Flavor AI",
      subtitle: "AI-Powered Web Application",
      achievement: "GSSoC Contribution",
      description: "Developed an AI recipe generator with voice and text input modes during GSSoC. Added ingredient-set saving feature, improving user retention by 20% and repeat usage. Designed responsive recipe cards showing preparation time, difficulty level, and missing ingredients for improved UX.",
      tech: ["React.js", "Tailwind CSS", "GitHub", "AI Prompt Handling"],
      github: "https://github.com/Ayushjhawar8/Flavor-ai/pull/273",
      image: "/assets/projects/flavorai.png"
    }
  ];

  const nextProject = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const activeProject = projects[activeIndex];
  const nextProjectPreview = projects[activeIndex === projects.length - 1 ? 0 : activeIndex + 1];

  return (
    <section id="projects" className="bg-white py-16 md:py-24 w-full relative overflow-hidden font-sans" style={{
      backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
      backgroundSize: "24px 24px"
    }}>
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header & Controls */}
        <div className="px-4 md:px-10 flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-5">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-xs text-gray-600 font-bold mb-4 bg-white shadow-sm uppercase tracking-[0.2em]"
            >
              Selected Work
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase"
            >
              <span className="text-black">Featured</span>{" "}
              <span className="text-[#ff2a2a]">Projects</span>
            </motion.h2>
          </div>

          {/* Navigation Arrows Near Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <button
              onClick={prevProject}
              className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-900 hover:border-[#ff2a2a] hover:text-[#ff2a2a] hover:shadow-[0_0_15px_rgba(255,42,42,0.15)] transition-all duration-300 group"
            >
              <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={nextProject}
              className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-900 hover:border-[#ff2a2a] hover:text-[#ff2a2a] hover:shadow-[0_0_15px_rgba(255,42,42,0.15)] transition-all duration-300 group"
            >
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </motion.div>
        </div>

        {/* Carousel Content */}
        <div className="relative px-6 md:px-12 flex items-center gap-8 w-full max-w-[100vw] overflow-hidden md:overflow-visible py-4">

          {/* Main Active Card */}
          <div className="w-[90vw] sm:w-[82vw] md:w-[78vw] lg:w-[720px] xl:w-[820px] shrink-0 min-h-[380px] md:h-[460px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full relative overflow-hidden rounded-[2rem] bg-black border border-[#ff2a2a]/40 shadow-[0_20px_50px_rgba(255,42,42,0.15)] hover:shadow-[0_30px_60px_rgba(255,42,42,0.25)] transition-shadow duration-500 group flex flex-col justify-between"
              >
                {/* Project Image */}
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="absolute right-0 top-0 h-full w-full md:w-1/2 object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 p-5 md:p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6 md:mb-10">
                    <span className="text-4xl md:text-6xl font-black text-white/10 group-hover:text-red-500/30 transition-colors duration-500 font-mono">
                      {activeProject.num}
                    </span>
                    {activeProject.achievement && (
                      <span className="text-[9px] md:text-xs font-black text-white bg-[#ff2a2a] px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm mt-2">
                        {activeProject.achievement}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-4xl font-black text-white mb-2 group-hover:text-[#ff2a2a] transition-colors duration-300 tracking-tight leading-tight">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 font-mono">
                    {activeProject.subtitle}
                  </p>
                  <p className="text-xs md:text-sm text-gray-300 font-medium leading-relaxed mb-6 max-w-xl flex-grow">
                    {activeProject.description}
                  </p>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-auto gap-8">
                    <div className="flex flex-wrap gap-2.5 max-w-full md:max-w-[85%]">
                      {activeProject.tech.map((t) => (
                        <span key={t} className="text-[10px] md:text-xs font-mono font-bold bg-white/10 border border-white/5 px-3 py-1.5 rounded-full text-white uppercase tracking-wide">
                          {t}
                        </span>
                      ))}
                    </div>

                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full bg-[#ff2a2a] border border-transparent flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white shadow-xl"
                      >
                        <svg className="w-6 h-6 md:w-7 md:h-7 text-current" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Middle Arrow Button Outside Card */}
          <div className="hidden xl:flex items-center justify-center shrink-0 z-20">
            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center text-gray-900 hover:border-[#ff2a2a] hover:text-[#ff2a2a] hover:shadow-[0_0_20px_rgba(255,42,42,0.2)] hover:scale-110 transition-all duration-300 group"
            >
              <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Preview Next Card */}
          <div
            onClick={nextProject}
            className="hidden lg:block w-[240px] xl:w-[280px] h-[400px] shrink-0 relative overflow-hidden rounded-[1.5rem] bg-black border border-gray-300/30 cursor-pointer hover:border-[#ff2a2a]/40 transition-colors duration-300 group opacity-50 hover:opacity-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
            <img
              src={nextProjectPreview.image}
              alt={nextProjectPreview.title}
              className="absolute right-0 top-0 h-full w-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            />
            <div className="relative z-20 p-8 h-full flex flex-col">
              <span className="text-4xl font-black text-white/20 font-mono mb-4">{nextProjectPreview.num}</span>
              <h3 className="text-2xl font-black text-white mb-2">{nextProjectPreview.title}</h3>
              <p className="text-[10px] font-bold text-[#ff2a2a] uppercase tracking-widest font-mono">Next Project</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;
