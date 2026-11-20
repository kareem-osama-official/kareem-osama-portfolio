import {
  NavItem,
  ProjectItem,
  SkillCategory,
  JourneyMilestone,
  PhilosophyPrinciple,
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: {
    en: 'Kareem Osama',
    ar: 'كريم أسامة',
  },
  monogram: 'KO',
  title: {
    en: 'Software Developer & Computer Science Student',
    ar: 'مطور برمجيات وطالب علوم حاسب',
  },
  tagline: {
    en: 'THE DIGITAL ATELIER',
    ar: 'الاستوديو الرقمي الهندسي',
  },
  headline: {
    en: 'Engineering ideas into digital reality — with architectural precision and creative discipline.',
    ar: 'تحويل الأفكار البرمجية إلى واقع رقمي ملموس — بدقة معمارية وانضباط إبداعي.',
  },
  bioLead: {
    en: 'Computer Science student crafting thoughtful digital systems. Focused on solid algorithmic foundations, modern web architecture, and educational technology.',
    ar: 'طالب علوم حاسب يبني نظمًا برمجية رصينة ومتقنة. يركز على الأسس الخوارزمية الصلبة، والمعمارية الحديثة للويب، وتكنولوجيا التعليم التفاعلية.',
  },
  location: {
    en: 'Cairo, Egypt',
    ar: 'القاهرة، مصر',
  },
  timezone: 'UTC+2 (EEST)',
  status: {
    en: 'Available for technical collaborations & ambitious projects',
    ar: 'متاح للتعاون التقني والمشاريع الطموحة',
  },
  contact: {
    email: 'kareemosama.dev@gmail.com',
    github: 'https://github.com/kareemosama',
    linkedin: 'https://linkedin.com/in/kareemosama',
  },
  portraitPath: '/images/kareem-osama.jpg',
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: { en: '01__HOME', ar: '٠١__الرئيسية' }, href: '#hero' },
  { id: 'about', label: { en: '02__ABOUT', ar: '٠٢__الرؤية' }, href: '#about' },
  { id: 'projects', label: { en: '03__PROJECTS', ar: '٠٣__المشاريع' }, href: '#projects' },
  { id: 'skills', label: { en: '04__STACK', ar: '٠٤__القدرات' }, href: '#skills' },
  { id: 'journey', label: { en: '05__JOURNEY', ar: '٠٥__المسار' }, href: '#journey' },
  { id: 'contact', label: { en: '06__CONTACT', ar: '٠٦__التواصل' }, href: '#contact' },
];

export const PHILOSOPHY_PRINCIPLES: PhilosophyPrinciple[] = [
  {
    number: '01',
    title: {
      en: 'Deep Foundations Before Abstraction',
      ar: 'رسوخ الأساس قبل التجريد',
    },
    description: {
      en: 'High-level frameworks change rapidly; deep algorithmic thinking, data structures, and computer science fundamentals endure. Every system is built on first principles.',
      ar: 'أطر العمل تتغير باستمرار، بينما التفكير الخوارزمي وهياكل البيانات وأسس علوم الحاسب تبقى ثابتة. كل نظام يُبنى انطلاقاً من المبادئ الأولية.',
    },
    quote: {
      en: 'True mastery begins under the hood, where memory, logic, and complexity align.',
      ar: 'الإتقان الحقيقي يبدأ في عمق النظام، حيث تلتقي الذاكرة والمنطق والكفاءة.',
    },
  },
  {
    number: '02',
    title: {
      en: 'Architectural Coherence & Clean Design',
      ar: 'التماسك المعماري ونقاء التصميم',
    },
    description: {
      en: 'Software should feel intentional at every scale. From internal component boundaries to pixel-perfect visual typography, clarity is an ethical commitment to the user.',
      ar: 'البرمجيات يجب أن تكون مقصودة في كل تفصيلة، بدءاً من حدود المكونات المعمارية وحتى الخطوط الدقيقة؛ فالوضوح التزام تجاه المستخدم.',
    },
    quote: {
      en: 'Simplicity is not the lack of complexity, but complexity resolved into harmony.',
      ar: 'البساطة ليست غياب التعقيد، بل ترويضه ليصبح تناغماً متسقاً.',
    },
  },
  {
    number: '03',
    title: {
      en: 'Crafting Tools That Empower Minds',
      ar: 'صناعة أدوات تثري العقول',
    },
    description: {
      en: 'Technology reaches its highest utility when it accelerates human comprehension. Developing educational platforms like Nexora reflects my ambition to build tools that expand knowledge.',
      ar: 'تبلغ التقنية أسمى غاياتها عندما تدعم الفهم البشري. بناء منصات تعليمية مثل نيكسورا يجسد رغبتي في خلق أدوات تسهم في نشر المعرفة وتبسيطها.',
    },
    quote: {
      en: 'We do not simply build interfaces; we build gateways for human potential.',
      ar: 'نحن لا نبني مجرد واجهات استخدام؛ بل نفتح بوابات لتمكين القدرات البشرية.',
    },
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'nexora',
    isFlagship: true,
    year: '2025–2026',
    title: {
      en: 'NEXORA — Educational Learning Platform',
      ar: 'نيكسورا — المنصة التعليمية الذكية',
    },
    tagline: {
      en: 'Next-generation digital learning ecosystem engineering interactive curricula and intelligent study assistance.',
      ar: 'منظومة تعلم رقمية متقدمة لهندسة المناهج التفاعلية ومسارات الدراسة الذكية.',
    },
    category: {
      en: 'EdTech / Web Architecture',
      ar: 'تكنولوجيا التعليم / معمارية الويب',
    },
    role: {
      en: 'Lead Architect & Frontend Developer',
      ar: 'مطور الواجهة والمعمارية البرمجية',
    },
    overview: {
      en: 'Nexora is a comprehensive educational platform designed to resolve disjointed e-learning workflows. It provides structured module navigation, interactive practical coding workspaces, student progression telemetry, and planned AI-guided study companionship.',
      ar: 'نيكسورا هي منصة تعليمية متكاملة تهدف إلى معالجة تشتت أدوات التعلم الإلكتروني. تقدم هيكلة واضحة للمناهج، ومساحات تطبيقية تفاعلية، وتتبعاً دقيقاً لتقدم الطالب، بالإضافة إلى مساعد دراسي ذكي قيد التطوير.',
    },
    problemPurpose: {
      en: 'Most conventional course platforms deliver passive video playback with disconnected exercises. Nexora unifies instructional content, real-time code environments, contextual guidance, and structured progression into one harmonious workspace.',
      ar: 'معظم المنصات التعليمية التقليدية تقتصر على عرض مقاطع الفيديو السلبية بمعزل عن التطبيق العملي. توحد نيكسورا المادة العلمية، ومحرر الكود التفاعلي، والإرشاد السياقي، وتتبع التقدم في مساحة عمل متكاملة متجانسة.',
    },
    architectureDetails: {
      en: 'Constructed around a composable component architecture in Next.js and TypeScript. Features dynamic state persistence, responsive split-pane lesson viewports, and clean separation between curriculum data models and render layers.',
      ar: 'تم تصميم المعمارية بالاعتماد على المكونات القابلة لإعادة الاستخدام في Next.js وTypeScript، مع حفظ ديناميكي لحالة الطالب، وتصميم مجزأ متجاوب لمساحات الشرح والتطبيق، وفصل تام بين نماذج بيانات المنهج وطبقات العرض.',
    },
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Component Architecture',
      'State Management',
      'Modular System Design',
    ],
    status: {
      badge: {
        en: 'Active Development • Core Modules Operational',
        ar: 'تطوير مستمر • المكونات الأساسية مكتملة',
      },
      type: 'flagship_dev',
      note: {
        en: 'Core layout, syllabus engine, interactive lesson interface, and student state systems implemented. AI-assisted tutoring integrations and automated test suites in active development.',
        ar: 'تم إنجاز الهيكل الأساسي، ومحرك شجرة المناهج، ومساحة الدروس التفاعلية، ونظام تتبع حالة الطالب. يجري العمل حالياً على تكامل المساعد الذكي ووحدات التقييم الآلي.',
      },
    },
    features: [
      {
        title: {
          en: 'Hierarchical Curriculum Navigator',
          ar: 'مستعرض المناهج الشجري الذكي',
        },
        description: {
          en: 'Structured roadmap tree allowing students to browse chapters, preview prerequisite dependencies, and track unit completion in real time.',
          ar: 'خارطة طريق هيكلية تتيح استعراض فصول المادة، ومتطلبات الدروس السابقة، وتتبع إنجاز الوحدات لحظياً.',
        },
        status: 'implemented',
      },
      {
        title: {
          en: 'Interactive Split-Workspace Lesson Canvas',
          ar: 'مساحة دراسية تفاعلية متعددة الألواح',
        },
        description: {
          en: 'Side-by-side editorial reading pane, formatted markdown explanations, live code snippets, and active practice sandboxes.',
          ar: 'لوح قراءة تحليلي يعرض الشرح البرمجي بجانب أمثلة الكود التفاعلية ومساحات التجربة المباشرة.',
        },
        status: 'implemented',
      },
      {
        title: {
          en: 'AI Contextual Study Companion',
          ar: 'المساعد الدراسي الذكي الموجه',
        },
        description: {
          en: 'An in-system AI assistant engineered to generate targeted hints, explain syntax errors, and break down complex concepts without revealing direct answers prematurely.',
          ar: 'مساعد ذكي مدمج لتوليد تلميحات سياقية وتوضيح الأخطاء البرمجية وشرح المفاهيم المعقدة خطوة بخطوة.',
        },
        status: 'in_progress',
      },
      {
        title: {
          en: 'Automated Knowledge Verification Engine',
          ar: 'محرك التحقق والتقييم الآلي',
        },
        description: {
          en: 'Instant test-case evaluation for programming tasks and interactive quizzes assessing conceptual comprehension.',
          ar: 'تقييم فوري لحلول الطلاب واختبارات تفاعلية لقياس الفهم المعرفي الدقيق للمفاهيم.',
        },
        status: 'in_progress',
      },
      {
        title: {
          en: 'Collaborative Peer Study Circles',
          ar: 'حلقات الدراسة التشاركية',
        },
        description: {
          en: 'Future collaborative hubs enabling students to co-review problems, share annotations, and engage in peer challenge boards.',
          ar: 'مساحات تعاونية مستقبلية تتيح للطلاب مراجعة المسائل سوياً وتبادل الملاحظات وحل التحديات الجماعية.',
        },
        status: 'planned',
      },
    ],
  },
  {
    id: 'algomind',
    isFlagship: false,
    year: '2025',
    title: {
      en: 'AlgoMind — C++ Problem Solving & Algorithm Suite',
      ar: 'ألجوميند — مختبر الخوارزميات وهياكل البيانات بلغة C++',
    },
    tagline: {
      en: 'Engineered collection of rigorous algorithm implementations, data structure libraries, and automated test runners in modern C++.',
      ar: 'مجموعة برمجية متكاملة لتطبيق الخوارزميات المعقدة وهياكل البيانات ووحدات الاختبار الآلي بلغة C++ الحديثة.',
    },
    category: {
      en: 'Systems & Algorithms / C++',
      ar: 'الأنظمة والخوارزميات / C++',
    },
    role: {
      en: 'Software Engineer & Algorithmic Developer',
      ar: 'مهندس الخوارزميات والتنفيذ',
    },
    overview: {
      en: 'A foundational software laboratory dedicated to solving computational problems with memory discipline and optimal time complexity. Features verified test harnesses for sorting, recursion trees, matrix mathematics, string parsing, and graph algorithms.',
      ar: 'مختبر برمجي تأسيسي مخصص لحل المسائل الحسابية بانضباط تام في إدارة الذاكرة وتحقيق الكفاءة الزمنية المثلى. يتضمن وحدات اختبار معتمدة لخوارزميات الترتيب، والعودية، والبيانات المصفوفية، والرسوم البيانية.',
    },
    problemPurpose: {
      en: 'Bridging theoretical computer science principles with robust, clean, leak-free C++ implementations. Emphasizes clean code, reusable headers, and verifiable test suites.',
      ar: 'الربط بين المفاهيم النظرية لعلوم الحاسب والتطبيق البرمجي المتين والخالي من تسريب الذاكرة بلغة C++، مع التركيز على الكود النظيف ووحدات الاختبار القابلة لإعادة الاستخدام.',
    },
    architectureDetails: {
      en: 'Organized with modular header-source separation (`include/` and `src/`), structured test drivers, performance benchmarking timers, and strict adherence to C++ standards.',
      ar: 'تنظيم معياري يفصل بين ملفات التعريف والتنفيذ، مع محركات اختبار مخصصة ومؤقتات دقيقة لقياس الأداء وفق أحدث معايير C++.',
    },
    technologies: [
      'C++20',
      'Data Structures',
      'Algorithms',
      'OOP Principles',
      'Standard Template Library (STL)',
      'Memory Management',
      'Test Harnesses',
    ],
    status: {
      badge: {
        en: 'Verified Core Suite • Active Expansion',
        ar: 'مجموعة معتمدة • توسع مستمر',
      },
      type: 'completed',
      note: {
        en: 'Comprehensive test suites covering problem solving foundations, dynamic allocation, pointer mechanics, and algorithmic paradigms.',
        ar: 'وحدات اختبار شاملة تغطي أسس حل المشكلات، وإدارة المؤشرات، والتعامل المتقدم مع الذاكرة والخوارزميات.',
      },
    },
    features: [
      {
        title: {
          en: 'Automated Test Suite Engine',
          ar: 'محرك الاختبارات الآلي المستقل',
        },
        description: {
          en: 'Custom test runner measuring execution correctness across edge cases, boundary inputs, and complexity limits.',
          ar: 'مشغل اختبارات مخصص يقيس دقة التنفيذ في الحالات المعقدة وحدود المدخلات بكفاءة عالية.',
        },
        status: 'implemented',
      },
      {
        title: {
          en: 'Optimized Data Structure Modules',
          ar: 'وحدات هياكل البيانات المحسنة',
        },
        description: {
          en: 'Clean implementations of lists, queues, trees, and hash-based lookups with explicit lifecycle management.',
          ar: 'بناء متقن للقوائم والصفوف والأشجار وجداول التجزئة مع إدارة واعية لدورة حياة الكائنات في الذاكرة.',
        },
        status: 'implemented',
      },
    ],
  },
  {
    id: 'digital-atelier',
    isFlagship: false,
    year: '2026',
    title: {
      en: 'The Digital Atelier — Personal Architecture System',
      ar: 'الاستوديو الرقمي — نظام الهوية والمعمارية الشخصية',
    },
    tagline: {
      en: 'Bespoke editorial portfolio combining architectural typography, dual-engine LTR/RTL synchronization, and resilient component engineering.',
      ar: 'منظومة عرض رقمية تحريرية تجمع بين الخطوط المعمارية، ومزامنة الاتجاهين LTR/RTL، وهندسة المكونات المرنة.',
    },
    category: {
      en: 'Creative Development / Identity',
      ar: 'تطوير إبداعي / معمارية الهوية',
    },
    role: {
      en: 'Designer & Frontend Architect',
      ar: 'المصمم ومعماري الواجهة',
    },
    overview: {
      en: 'Designed from zero as a signature statement. Replaces common portfolio clichés with editorial grid structure, acid-lime precision accents, tactile micro-interactions, and deep bilingual harmony.',
      ar: 'صُمم بالكامل ليكون بصمة فريدة تتجاوز القوالب النمطية، معتمداً على شبكات هندسية واضحة، ولمسات لونية دقيقة، ومزامنة ثنائية اللغة كاملة ومريحة للقراءة.',
    },
    problemPurpose: {
      en: 'Demonstrating that developer portfolios can convey technical rigor and artistic taste simultaneously, without relying on canned templates or misleading claims.',
      ar: 'إثبات أن ملف الأعمال البرمجية يمكنه التعبير عن العمق التقني والذوق الفني في آن واحد، بعيداً عن القوالب الجاهزة أو الادعاءات غير الدقيقة.',
    },
    architectureDetails: {
      en: 'Engineered with Next.js App Router, Tailwind CSS v4 design tokens, client-side language switching with zero layout jumps, and strict accessibility compliance.',
      ar: 'مبني باستخدام أحدث إصدارات Next.js وTailwind CSS v4، مع تبديل سلس للغات دون اهتزازات في التخطيط، ومراعاة دقيقة لمعايير الوصولية.',
    },
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS v4',
      'Bilingual LTR/RTL',
      'Accessible UI',
    ],
    status: {
      badge: {
        en: 'Production Deployed Locally • Verified',
        ar: 'مكتمل ومُحقق محلياً',
      },
      type: 'completed',
      note: {
        en: 'Integrated with authentic personal portrait, interactive project case studies, and responsive engineering.',
        ar: 'مكتمل بالصورة الشخصية الحقيقية ودراسات الحالة التفاعلية والتصميم المتجاوب لجميع الشاشات.',
      },
    },
    features: [
      {
        title: {
          en: 'Harmonic Bilingual RTL/LTR Engine',
          ar: 'محرك تبديل اللغات المتكامل',
        },
        description: {
          en: 'Seamlessly transforms typography, layout flow, reading order, and interactive elements between English and Arabic.',
          ar: 'يحوّل انسياب الخطوط، وترتيب العناصر، واتجاه القراءة بمرونة وسلاسة بين العربية والإنجليزية.',
        },
        status: 'implemented',
      },
      {
        title: {
          en: 'Architectural Framing & Asset Optimization',
          ar: 'تأطير معماري ومعالجة دقيقة للصور',
        },
        description: {
          en: 'Bespoke frame treatment respecting the authentic portrait asset with strict aspect ratio preservation and fallback gracefully handled.',
          ar: 'تأطير هندسي مبتكر يحافظ على ملامح الصورة الحقيقية مع نسب أبعاد دقيقة ودعم احتياطي فوري.',
        },
        status: 'implemented',
      },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    name: {
      en: 'Core Programming Languages',
      ar: 'لغات البرمجة الأساسية',
    },
    description: {
      en: 'Compiled and typed languages used for systems programming, data structures, and typed application logic.',
      ar: 'لغات البرمجة المترجمة والمكتوبة المستخدمة في هندسة الأنظمة وهياكل البيانات والواجهات.',
    },
    skills: [
      {
        name: 'C++',
        level: { en: 'Foundational & Algorithmic', ar: 'تأسيس متقدم وخوارزمي' },
        highlight: true,
        evidence: {
          en: 'OOP, STL, pointers, memory model, AlgoMind suite',
          ar: 'البرمجة كائنية التوجه، مكتبة STL، المؤشرات، مختبر ألجوميند',
        },
      },
      {
        name: 'TypeScript',
        level: { en: 'Application Architecture', ar: 'معمارية التطبيقات والواجهات' },
        highlight: true,
        evidence: {
          en: 'Strict typing, interfaces, generic data modeling',
          ar: 'أنظمة الأنواع الصارمة، النماذج العامة للبيانات',
        },
      },
      {
        name: 'JavaScript (ES6+)',
        level: { en: 'Full Modern Syntax', ar: 'صياغة حديثة ومعالجة غير متزامنة' },
        highlight: false,
        evidence: {
          en: 'Async/await, DOM APIs, event loop, functional patterns',
          ar: 'المعالجة غير المتزامنة، واجهات DOM، البرمجة الوظيفية',
        },
      },
      {
        name: 'SQL',
        level: { en: 'Relational Queries', ar: 'استعلامات قواعد البيانات العلائقية' },
        highlight: false,
        evidence: {
          en: 'Schema design, joins, normalization, indexing concepts',
          ar: 'تصميم المخططات، الربط بين الجداول، تسوية البيانات',
        },
      },
      {
        name: 'HTML5 / CSS3',
        level: { en: 'Semantic & Layout Precision', ar: 'دقة هيكلية وتصميمية متقدمة' },
        highlight: false,
        evidence: {
          en: 'Modern flexbox/grid, accessible markup, RTL adaptation',
          ar: 'تخطيط flexbox وgrid، ترميز وصولي متوافق مع RTL',
        },
      },
    ],
  },
  {
    id: 'frontend',
    name: {
      en: 'Frontend Architecture & Systems',
      ar: 'معمارية الواجهات والأنظمة التفاعلية',
    },
    description: {
      en: 'Modern frameworks and tools used to construct high-performance, accessible, and responsive user experiences.',
      ar: 'أطر العمل والأدوات الحديثة لبناء تجارب مستخدم عالية الأداء، متجاوبة، وسهلة الوصول.',
    },
    skills: [
      {
        name: 'React',
        level: { en: 'Component Engineering', ar: 'هندسة المكونات التفاعلية' },
        highlight: true,
        evidence: {
          en: 'Hooks lifecycle, custom state patterns, memoization',
          ar: 'إدارة الحالة المتقدمة، الخطافات المخصصة، تحسين الأداء',
        },
      },
      {
        name: 'Next.js (App Router)',
        level: { en: 'Full-Stack Framework', ar: 'إطار عمل الويب المتكامل' },
        highlight: true,
        evidence: {
          en: 'Server/Client components, layouts, metadata, asset optimization',
          ar: 'مكونات السيرفر والعميل، القوالب، تحسين الأصول الرقمية',
        },
      },
      {
        name: 'Tailwind CSS',
        level: { en: 'Design Tokens & Utility Systems', ar: 'أنظمة التصميم ورموز الأنماط' },
        highlight: true,
        evidence: {
          en: 'v4 theme tokens, responsive breakpoints, editorial styling',
          ar: 'رموز الثيم المخصصة، نقاط التجاوب، التصميم التحريري',
        },
      },
      {
        name: 'Responsive & Accessible Design',
        level: { en: 'Cross-Device Precision', ar: 'توافق شامل عبر الأجهزة' },
        highlight: false,
        evidence: {
          en: 'Semantic HTML5, ARIA labels, keyboard navigation, fluid viewports',
          ar: 'دعم لوحة المفاتيح، معايير ARIA، انسيابية العرض لكافة المقاسات',
        },
      },
    ],
  },
  {
    id: 'foundations',
    name: {
      en: 'Computer Science & Software Engineering',
      ar: 'علوم الحاسب وهندسة البرمجيات',
    },
    description: {
      en: 'Theoretical disciplines and methodical practices that underpin robust software development.',
      ar: 'الأسس النظرية والممارسات المنهجية التي تضمن متانة وكفاءة الحلول البرمجية.',
    },
    skills: [
      {
        name: 'Data Structures & Algorithms',
        level: { en: 'Certified Foundations', ar: 'أسس موثقة ومُعتمدة' },
        highlight: true,
        evidence: {
          en: 'Verified completion of Level 1 Algorithms & Problem Solving',
          ar: 'إتمام معتمد للمستوى الأول في الخوارزميات وحل المشكلات',
        },
      },
      {
        name: 'Object-Oriented Design (OOP)',
        level: { en: 'Clean Architecture', ar: 'تصميم الكائنات النظيف' },
        highlight: true,
        evidence: {
          en: 'Encapsulation, inheritance, polymorphism, separation of concerns',
          ar: 'التغليف، التوريث، تعدد الأشكال، وفصل المسؤوليات',
        },
      },
      {
        name: 'Algorithmic Problem Solving',
        level: { en: 'Mathematical & Logical Rigor', ar: 'انضباط منطقي ورياضي' },
        highlight: true,
        evidence: {
          en: 'Complexity analysis (Big-O), recursion trees, divide-and-conquer',
          ar: 'تحليل التعقيد الحسابي، الخوارزميات العودية والتفكيكية',
        },
      },
      {
        name: 'Git & Version Control',
        level: { en: 'Collaborative Workflow', ar: 'إدارة الإصدارات والعمل البرمجي' },
        highlight: false,
        evidence: {
          en: 'Branch management, clean commits, workspace discipline',
          ar: 'إدارة الفروع، التوثيق المنظم، وتنظيم مستودعات الكود',
        },
      },
      {
        name: 'Database Modeling & SQL Server',
        level: { en: 'Relational Schema Foundations', ar: 'أسس النمذجة العلائقية' },
        highlight: false,
        evidence: {
          en: 'Entity-relationship analysis, queries, data consistency',
          ar: 'تحليل الكيانات والعلاقات، سلامة واتساق البيانات',
        },
      },
    ],
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    period: '2024 — Present',
    title: {
      en: 'Computer Science Academic Degree Program',
      ar: 'دراسة البكالوريوس في علوم الحاسب',
    },
    institution: {
      en: 'University Faculty of Computers & Artificial Intelligence',
      ar: 'كلية الحاسبات والذكاء الاصطناعي',
    },
    description: {
      en: 'Immersed in computer science theory, discrete mathematics, digital logic, operating system principles, data structures, and software engineering methodologies.',
      ar: 'دراسة معمقة في نظريات علوم الحاسب، والرياضيات المتقطعة، والمنطق الرقمي، ومبادئ نظم التشغيل، وهندسة البرمجيات.',
    },
    badge: {
      en: 'Undergraduate Studies',
      ar: 'مرحلة البكالوريوس',
    },
    skillsApplied: ['Computer Science', 'Algorithms', 'Discrete Math', 'Software Engineering'],
  },
  {
    period: '2025',
    title: {
      en: 'Algorithms & Problem Solving Mastery (Level 1)',
      ar: 'إتقان الخوارزميات وحل المشكلات (المستوى الأول)',
    },
    institution: {
      en: 'ProgrammingAdvices Academy',
      ar: 'أكاديمية ProgrammingAdvices',
    },
    description: {
      en: 'Completed rigorous curriculum covering structured algorithmic decomposition, flowcharting, pseudocode analysis, complexity profiling, and systematic debugging methods.',
      ar: 'إتمام منهاج مكثف في التفكيك الخوارزمي، وتحليل المخططات الانسيابية، وحساب التعقيد الزمني، وطرق استكشاف الأخطاء البرمجية.',
    },
    badge: {
      en: 'Verified Certificate',
      ar: 'شهادة إتمام معتمدة',
    },
    skillsApplied: ['Problem Solving', 'Algorithm Design', 'Computational Thinking', 'Pseudocode'],
  },
  {
    period: '2025',
    title: {
      en: 'C++ Systems & Object-Oriented Foundations',
      ar: 'البرمجة التأسيسية وهندسة الكائنات بلغة C++',
    },
    institution: {
      en: 'ProgrammingAdvices Academy',
      ar: 'أكاديمية ProgrammingAdvices',
    },
    description: {
      en: 'Mastered C++ language mechanics including pointer arithmetic, manual memory allocation, reference semantics, class architectures, operator overloading, and STL structures.',
      ar: 'إتقان تفاصيل لغة C++، والتعامل المباشر مع المؤشرات والذاكرة، وبناء الفئات، وتعدد الأشكال، ومكتبة القوالب المعيارية STL.',
    },
    badge: {
      en: 'Verified Certificate',
      ar: 'شهادة إتمام معتمدة',
    },
    skillsApplied: ['C++', 'Pointers & Memory', 'OOP', 'STL Containers'],
  },
  {
    period: '2025 — 2026',
    title: {
      en: 'Nexora Platform Inception & Frontend Architecture',
      ar: 'انطلاق منصة نيكسورا وهندسة واجهاتها التعليمية',
    },
    institution: {
      en: 'Independent Engineering Project',
      ar: 'مشروع هندسي مستقل',
    },
    description: {
      en: 'Initiated the architectural design and implementation of Nexora, exploring how modern web technologies (Next.js, TypeScript, Tailwind) can transform interactive educational delivery.',
      ar: 'البدء في تصميم وتطوير منصة نيكسورا، واستكشاف إمكانيات أحدث تقنيات الويب في إحداث نقلة نوعية في تجربة التعليم الإلكتروني التفاعلي.',
    },
    badge: {
      en: 'Flagship Initiative',
      ar: 'مشروع رئيسي قيد التطوير',
    },
    skillsApplied: ['Next.js', 'React', 'TypeScript', 'EdTech Architecture'],
  },
];
