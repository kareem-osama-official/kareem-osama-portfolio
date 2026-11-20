import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { hashPassword } from './crypto';

let dbInstance: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'portfolio.db');
  const db = new DatabaseSync(dbPath);

  // Enable WAL mode and foreign keys for durability and performance
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');

  initSchema(db);
  seedInitialData(db);

  dbInstance = db;
  return db;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY DEFAULT 'default',
      name_en TEXT NOT NULL,
      name_ar TEXT NOT NULL,
      headline_en TEXT NOT NULL,
      headline_ar TEXT NOT NULL,
      bio_en TEXT NOT NULL,
      bio_ar TEXT NOT NULL,
      role_en TEXT NOT NULL,
      role_ar TEXT NOT NULL,
      location_en TEXT NOT NULL,
      location_ar TEXT NOT NULL,
      timezone TEXT NOT NULL DEFAULT 'UTC+2 (EEST)',
      status_en TEXT NOT NULL,
      status_ar TEXT NOT NULL,
      email TEXT NOT NULL,
      github_url TEXT NOT NULL,
      linkedin_url TEXT NOT NULL,
      portrait_url TEXT NOT NULL DEFAULT '/images/kareem-osama.jpg',
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title_en TEXT NOT NULL,
      title_ar TEXT NOT NULL,
      tagline_en TEXT NOT NULL,
      tagline_ar TEXT NOT NULL,
      category_en TEXT NOT NULL,
      category_ar TEXT NOT NULL,
      role_en TEXT NOT NULL,
      role_ar TEXT NOT NULL,
      overview_en TEXT NOT NULL,
      overview_ar TEXT NOT NULL,
      problem_en TEXT NOT NULL,
      problem_ar TEXT NOT NULL,
      architecture_en TEXT NOT NULL,
      architecture_ar TEXT NOT NULL,
      technologies TEXT NOT NULL, -- JSON array
      status_badge_en TEXT NOT NULL,
      status_badge_ar TEXT NOT NULL,
      status_type TEXT NOT NULL DEFAULT 'in_progress',
      status_note_en TEXT NOT NULL,
      status_note_ar TEXT NOT NULL,
      features_json TEXT NOT NULL DEFAULT '[]',
      github_url TEXT,
      live_demo_url TEXT,
      results_metric_en TEXT,
      results_metric_ar TEXT,
      is_flagship INTEGER NOT NULL DEFAULT 0,
      is_featured INTEGER NOT NULL DEFAULT 1,
      is_published INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS skills (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL, -- 'languages' | 'frontend' | 'foundations' | 'tools'
      level_en TEXT NOT NULL,
      level_ar TEXT NOT NULL,
      evidence_en TEXT,
      evidence_ar TEXT,
      is_highlight INTEGER NOT NULL DEFAULT 0,
      is_visible INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS journey_milestones (
      id TEXT PRIMARY KEY,
      period TEXT NOT NULL,
      title_en TEXT NOT NULL,
      title_ar TEXT NOT NULL,
      institution_en TEXT NOT NULL,
      institution_ar TEXT NOT NULL,
      description_en TEXT NOT NULL,
      description_ar TEXT NOT NULL,
      badge_en TEXT NOT NULL,
      badge_ar TEXT NOT NULL,
      skills_applied TEXT NOT NULL, -- JSON array
      display_order INTEGER NOT NULL DEFAULT 0,
      is_visible INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      is_read INTEGER NOT NULL DEFAULT 0,
      is_archived INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function seedInitialData(db: DatabaseSync) {
  // 1. Seed Admin User if none exists
  const existingAdmin = db.prepare('SELECT id FROM admin_users LIMIT 1').get();
  if (!existingAdmin) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kareemosama.dev';
    const adminPassword = process.env.ADMIN_PASSWORD || 'KareemOsama2026!SecureAdmin';
    const { hash, salt } = hashPassword(adminPassword);

    db.prepare(`
      INSERT INTO admin_users (id, email, name, password_hash, password_salt, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('admin-root', adminEmail, 'Kareem Osama (Admin)', hash, salt, 'superadmin');
  }

  // 2. Seed Profile
  const existingProfile = db.prepare('SELECT id FROM profiles WHERE id = ?').get('default');
  if (!existingProfile) {
    db.prepare(`
      INSERT INTO profiles (
        id, name_en, name_ar, headline_en, headline_ar, bio_en, bio_ar,
        role_en, role_ar, location_en, location_ar, timezone, status_en, status_ar,
        email, github_url, linkedin_url, portrait_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'default',
      'Kareem Osama',
      'كريم أسامة',
      'Building Systems Behind the Interface.',
      'بناء النظم الهندسية خلف الواجهة.',
      'I design and build scalable digital products with clean architecture, focused on core computer science foundations and measurable real-world utility.',
      'أصمم وأبني منتجات برمجية متينة بمعمارية واضحة، مع التركيز على أسس علوم الحاسب والقيمة العملية الملموسة.',
      'Software Architect & CS Student',
      'معماري برمجيات وطالب علوم حاسب',
      'Cairo, Egypt',
      'القاهرة، مصر',
      'UTC+2 (EEST)',
      'Available for technical collaborations & ambitious projects',
      'متاح للتعاون التقني والمشاريع الطموحة',
      'kareemosama.dev@gmail.com',
      'https://github.com/kareemosama',
      'https://linkedin.com/in/kareemosama',
      '/images/kareem-osama.jpg'
    );
  }

  // 3. Seed Projects
  const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
  if (projectCount.count === 0) {
    const insertProject = db.prepare(`
      INSERT INTO projects (
        id, slug, title_en, title_ar, tagline_en, tagline_ar,
        category_en, category_ar, role_en, role_ar, overview_en, overview_ar,
        problem_en, problem_ar, architecture_en, architecture_ar,
        technologies, status_badge_en, status_badge_ar, status_type,
        status_note_en, status_note_ar, features_json, results_metric_en, results_metric_ar,
        is_flagship, is_featured, is_published, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Nexora
    insertProject.run(
      'proj-nexora',
      'nexora',
      'NEXORA — Educational Learning Platform',
      'نيكسورا — المنصة التعليمية الذكية',
      'Next-generation digital learning ecosystem engineering interactive curricula and intelligent study assistance.',
      'منظومة تعلم رقمية متقدمة لهندسة المناهج التفاعلية ومسارات الدراسة الذكية.',
      'EdTech / Web Architecture',
      'تكنولوجيا التعليم / معمارية الويب',
      'Lead Architect & Frontend Developer',
      'مطور الواجهة والمعمارية البرمجية',
      'Nexora is a comprehensive educational platform designed to resolve disjointed e-learning workflows. It provides structured module navigation, interactive practical coding workspaces, student progression telemetry, and planned AI-guided study companionship.',
      'نيكسورا هي منصة تعليمية متكاملة تهدف إلى معالجة تشتت أدوات التعلم الإلكتروني. تقدم هيكلة واضحة للمناهج، ومساحات تطبيقية تفاعلية، وتتبعاً دقيقاً لتقدم الطالب.',
      'Most conventional course platforms deliver passive video playback with disconnected exercises. Nexora unifies instructional content, real-time code environments, and structured progression into one harmonious workspace.',
      'معظم المنصات التعليمية التقليدية تقتصر على عرض مقاطع الفيديو السلبية بمعزل عن التطبيق العملي. توحد نيكسورا المادة العلمية، ومحرر الكود التفاعلي، وتتبع التقدم في مساحة واحدة.',
      'Constructed around a composable component architecture in Next.js and TypeScript. Features dynamic state persistence, responsive split-pane lesson viewports, and clean separation between curriculum data models and render layers.',
      'تم تصميم المعمارية بالاعتماد على المكونات القابلة لإعادة الاستخدام في Next.js وTypeScript مع حفظ ديناميكي لحالة الطالب.',
      JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'State Management']),
      'Active Development • Core Modules Operational',
      'تطوير مستمر • المكونات الأساسية مكتملة',
      'flagship_dev',
      'Core layout, syllabus engine, interactive lesson interface, and student state systems implemented. AI-assisted tutoring integrations in active development.',
      'تم إنجاز الهيكل الأساسي ومحرك المناهج ومساحة الدروس التفاعلية. يجري العمل على تكامل المساعد الذكي.',
      JSON.stringify([
        { title: { en: 'Hierarchical Curriculum Navigator', ar: 'مستعرض المناهج الشجري الذكي' }, status: 'implemented' },
        { title: { en: 'Interactive Split-Workspace Lesson Canvas', ar: 'مساحة دراسية تفاعلية متعددة الألواح' }, status: 'implemented' },
        { title: { en: 'AI Contextual Study Companion', ar: 'المساعد الدراسي الذكي الموجه' }, status: 'in_progress' },
      ]),
      'Core Modules Operational',
      'المكونات الأساسية مكتملة',
      1,
      1,
      1,
      1
    );

    // AlgoMind
    insertProject.run(
      'proj-algomind',
      'algomind',
      'AlgoMind — C++ Problem Solving & Algorithm Suite',
      'ألجوميند — مختبر الخوارزميات وهياكل البيانات بلغة C++',
      'Engineered collection of rigorous algorithm implementations, data structure libraries, and automated test runners in modern C++.',
      'مجموعة برمجية متكاملة لتطبيق الخوارزميات وهياكل البيانات ووحدات الاختبار الآلي بلغة C++ الحديثة.',
      'Systems & Algorithms / C++',
      'الأنظمة والخوارزميات / C++',
      'Software Engineer & Algorithmic Developer',
      'مهندس الخوارزميات والتنفيذ',
      'A foundational software laboratory dedicated to solving computational problems with memory discipline and optimal time complexity. Features verified test harnesses for sorting, recursion trees, and data structures.',
      'مختبر برمجي تأسيسي مخصص لحل المسائل الحسابية بانضباط تام في إدارة الذاكرة وتحقيق الكفاءة الزمنية المثلى.',
      'Bridging theoretical computer science principles with robust, clean, leak-free C++ implementations.',
      'الربط بين المفاهيم النظرية لعلوم الحاسب والتطبيق البرمجي المتين بلغة C++.',
      'Organized with modular header-source separation (include/ and src/), structured test drivers, and strict adherence to C++ standards.',
      'تنظيم معياري يفصل بين ملفات التعريف والتنفيذ مع محركات اختبار مخصصة.',
      JSON.stringify(['C++20', 'Data Structures', 'Algorithms', 'STL', 'Memory Management']),
      'Verified Core Suite • Local Laboratory',
      'مجموعة معتمدة • مختبر محلي',
      'completed',
      'Comprehensive test suites covering problem solving foundations, dynamic allocation, pointer mechanics, and algorithmic paradigms.',
      'وحدات اختبار شاملة تغطي أسس حل المشكلات وإدارة المؤشرات والذاكرة.',
      JSON.stringify([
        { title: { en: 'Automated Test Suite Engine', ar: 'محرك الاختبارات الآلي المستقل' }, status: 'implemented' },
        { title: { en: 'Optimized Data Structure Modules', ar: 'وحدات هياكل البيانات المحسنة' }, status: 'implemented' },
      ]),
      'Test Suite 100% Verified',
      'وحدات الاختبار معتمدة بالكامل',
      0,
      1,
      1,
      2
    );

    // The Digital Atelier
    insertProject.run(
      'proj-atelier',
      'digital-atelier',
      'The Digital Atelier — Personal Architecture & CMS',
      'الاستوديو الرقمي — نظام الهوية ولوحة التحكم',
      'Bespoke technical portfolio combining architectural typography, dual-engine LTR/RTL synchronization, and built-in full-stack content management system.',
      'منظومة عرض رقمية تحريرية تجمع بين الخطوط المعمارية، ومزامنة الاتجاهين LTR/RTL، ولوحة تحكم متكاملة.',
      'Full-Stack / Creative Architecture',
      'تطوير متكامل / معمارية الهوية',
      'Lead Full-Stack Engineer',
      'مهندس النظام والواجهة',
      'Engineered as a high-performance personal developer portfolio and content management system with SQLite native persistence, protected admin authentication, and bilingual public interface.',
      'صُمم كمنظومة متكاملة لملف الأعمال ونظام إدارة المحتوى مع قاعدة بيانات SQLite مدمجة ونظام مصادقة آمن.',
      'Eliminating generic templates and static limits by combining bespoke editorial design with a fully functional administration backend.',
      'تجاوز القوالب الجاهزة عبر دمج التصميم التحريري المتقن مع لوحة إدارة محتوى حقيقية.',
      'Built with Next.js 16 App Router, Node.js native SQLite database, and cryptographic session security.',
      'مبني باستخدام Next.js 16 وقاعدة بيانات SQLite المدمجة في Node.js.',
      JSON.stringify(['Next.js 16', 'React 19', 'TypeScript', 'Node SQLite', 'Tailwind CSS']),
      'Production Deployed Locally • Verified',
      'مكتمل ومُحقق محلياً',
      'completed',
      'Integrated with authentic personal portrait, interactive project case studies, and protected admin dashboard.',
      'مكتمل بالصورة الشخصية الحقيقية ولوحة التحكم الإدارية الكاملة.',
      JSON.stringify([
        { title: { en: 'Full-Stack Admin CMS', ar: 'لوحة تحكم إدارية متكاملة' }, status: 'implemented' },
        { title: { en: 'Harmonic Bilingual Engine', ar: 'محرك تبديل اللغات المتكامل' }, status: 'implemented' },
      ]),
      'Zero Template Dependency',
      'بناء أصلي بالكامل',
      0,
      1,
      1,
      3
    );
  }

  // 4. Seed Skills
  const skillCount = db.prepare('SELECT COUNT(*) as count FROM skills').get() as { count: number };
  if (skillCount.count === 0) {
    const insertSkill = db.prepare(`
      INSERT INTO skills (id, name, category, level_en, level_ar, evidence_en, evidence_ar, is_highlight, is_visible, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const defaultSkills = [
      ['skill-cpp', 'C++', 'languages', 'Foundational & Algorithmic', 'تأسيس متقدم وخوارزمي', 'OOP, STL, pointers, memory model, AlgoMind suite', 'البرمجة كائنية التوجه ومكتبة STL', 1, 1, 1],
      ['skill-ts', 'TypeScript', 'languages', 'Application Architecture', 'معمارية التطبيقات والواجهات', 'Strict typing, generic data modeling', 'أنظمة الأنواع الصارمة والنماذج العامة', 1, 1, 2],
      ['skill-js', 'JavaScript (ES6+)', 'languages', 'Full Modern Syntax', 'صياغة حديثة ومعالجة غير متزامنة', 'Async/await, DOM APIs, event loop', 'المعالجة غير المتزامنة وواجهات DOM', 0, 1, 3],
      ['skill-sql', 'SQL', 'languages', 'Relational Queries', 'استعلامات قواعد البيانات العلائقية', 'Schema design, normalization, joins', 'تصميم المخططات والربط بين الجداول', 0, 1, 4],
      ['skill-react', 'React 19', 'frontend', 'Component Engineering', 'هندسة المكونات التفاعلية', 'Hooks lifecycle, custom state patterns, memoization', 'إدارة الحالة المتقدمة والخطافات المخصصة', 1, 1, 5],
      ['skill-next', 'Next.js 16 (App Router)', 'frontend', 'Full-Stack Framework', 'إطار عمل الويب المتكامل', 'Server/Client components, layouts, metadata', 'مكونات السيرفر والعميل وتحسين الأصول', 1, 1, 6],
      ['skill-tw', 'Tailwind CSS v4', 'frontend', 'Design Tokens & Utility Systems', 'أنظمة التصميم ورموز الأنماط', 'Theme tokens, responsive breakpoints, editorial styling', 'رموز الثيم المخصصة ونقاط التجاوب', 1, 1, 7],
      ['skill-dsa', 'Data Structures & Algorithms', 'foundations', 'Certified Foundations', 'أسس موثقة ومُعتمدة', 'Verified completion of Level 1 Algorithms & Problem Solving', 'إتمام معتمد للمستوى الأول في الخوارزميات', 1, 1, 8],
      ['skill-oop', 'Object-Oriented Design (OOP)', 'foundations', 'Clean Architecture', 'تصميم الكائنات النظيف', 'Encapsulation, inheritance, polymorphism, separation of concerns', 'التغليف والتوريث وتعدد الأشكال', 1, 1, 9],
      ['skill-git', 'Git & GitHub', 'tools', 'Collaborative Workflow', 'إدارة الإصدارات والعمل البرمجي', 'Branch management, clean commits, workspace discipline', 'إدارة الفروع والتوثيق المنظم', 0, 1, 10],
      ['skill-sqlite', 'SQLite / Node SQLite', 'tools', 'Embedded Persistence', 'قواعد البيانات المضمنة', 'ACID transactions, prepared statements, zero external deps', 'معاملات متسقة واستعلامات مُجهزة', 1, 1, 11],
    ];

    for (const s of defaultSkills) {
      insertSkill.run(...s);
    }
  }

  // 5. Seed Journey Milestones
  const journeyCount = db.prepare('SELECT COUNT(*) as count FROM journey_milestones').get() as { count: number };
  if (journeyCount.count === 0) {
    const insertJourney = db.prepare(`
      INSERT INTO journey_milestones (
        id, period, title_en, title_ar, institution_en, institution_ar,
        description_en, description_ar, badge_en, badge_ar, skills_applied, display_order, is_visible
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertJourney.run(
      'jm-1',
      '2024 — Present',
      'Computer Science Academic Degree Program',
      'دراسة البكالوريوس في علوم الحاسب',
      'University Faculty of Computers & Artificial Intelligence',
      'كلية الحاسبات والذكاء الاصطناعي',
      'Immersed in computer science theory, discrete mathematics, digital logic, data structures, and software engineering methodologies.',
      'دراسة معمقة في نظريات علوم الحاسب، والرياضيات المتقطعة، وهندسة البرمجيات.',
      'Undergraduate Studies',
      'مرحلة البكالوريوس',
      JSON.stringify(['Computer Science', 'Algorithms', 'Discrete Math', 'Software Engineering']),
      1,
      1
    );

    insertJourney.run(
      'jm-2',
      '2025',
      'Algorithms & Problem Solving Mastery (Level 1)',
      'إتقان الخوارزميات وحل المشكلات (المستوى الأول)',
      'ProgrammingAdvices Academy',
      'أكاديمية ProgrammingAdvices',
      'Completed rigorous curriculum covering structured algorithmic decomposition, flowcharting, pseudocode analysis, and systematic debugging methods.',
      'إتمام منهاج مكثف في التفكيك الخوارزمي وحساب التعقيد الزمني واستكشاف الأخطاء.',
      'Verified Certificate',
      'شهادة إتمام معتمدة',
      JSON.stringify(['Problem Solving', 'Algorithm Design', 'Computational Thinking']),
      2,
      1
    );

    insertJourney.run(
      'jm-3',
      '2025',
      'C++ Systems & Object-Oriented Foundations',
      'البرمجة التأسيسية وهندسة الكائنات بلغة C++',
      'ProgrammingAdvices Academy',
      'أكاديمية ProgrammingAdvices',
      'Mastered C++ language mechanics including pointer arithmetic, manual memory allocation, reference semantics, and STL structures.',
      'إتقان تفاصيل لغة C++ والتعامل مع المؤشرات والذاكرة ومكتبة STL.',
      'Verified Certificate',
      'شهادة إتمام معتمدة',
      JSON.stringify(['C++', 'Pointers & Memory', 'OOP', 'STL Containers']),
      3,
      1
    );

    insertJourney.run(
      'jm-4',
      '2025 — 2026',
      'Nexora Platform Inception & Frontend Architecture',
      'انطلاق منصة نيكسورا وهندسة واجهاتها التعليمية',
      'Independent Engineering Project',
      'مشروع هندسي مستقل',
      'Initiated the architectural design and implementation of Nexora, exploring how modern web technologies transform interactive educational delivery.',
      'البدء في تصميم وتطوير منصة نيكسورا لاستكشاف إمكانيات الويب الحديثة في التعليم التفاعلي.',
      'Flagship Initiative',
      'مشروع رئيسي قيد التطوير',
      JSON.stringify(['Next.js', 'React', 'TypeScript', 'EdTech Architecture']),
      4,
      1
    );
  }

  // 6. Seed Site Settings
  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM site_settings').get() as { count: number };
  if (settingsCount.count === 0) {
    const insertSetting = db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?)');
    insertSetting.run('site_title', 'Kareem Osama — Software Developer | The Digital Atelier');
    insertSetting.run('allow_contact_form', 'true');
    insertSetting.run('default_language', 'en');
    insertSetting.run('accent_theme', 'mint'); // mint green (#00ff9d / #10b981)
  }
}

// ============================================================================
// TYPED REPOSITORY FUNCTIONS FOR DATABASE ACCESS
// ============================================================================

export interface DbProfile {
  id: string;
  name_en: string;
  name_ar: string;
  headline_en: string;
  headline_ar: string;
  bio_en: string;
  bio_ar: string;
  role_en: string;
  role_ar: string;
  location_en: string;
  location_ar: string;
  timezone: string;
  status_en: string;
  status_ar: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  portrait_url: string;
  updated_at: string;
}

export interface DbProject {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  tagline_en: string;
  tagline_ar: string;
  category_en: string;
  category_ar: string;
  role_en: string;
  role_ar: string;
  overview_en: string;
  overview_ar: string;
  problem_en: string;
  problem_ar: string;
  architecture_en: string;
  architecture_ar: string;
  technologies: string;
  status_badge_en: string;
  status_badge_ar: string;
  status_type: string;
  status_note_en: string;
  status_note_ar: string;
  features_json: string;
  github_url: string | null;
  live_demo_url: string | null;
  results_metric_en: string | null;
  results_metric_ar: string | null;
  is_flagship: number;
  is_featured: number;
  is_published: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbSkill {
  id: string;
  name: string;
  category: string;
  level_en: string;
  level_ar: string;
  evidence_en: string | null;
  evidence_ar: string | null;
  is_highlight: number;
  is_visible: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbJourneyMilestone {
  id: string;
  period: string;
  title_en: string;
  title_ar: string;
  institution_en: string;
  institution_ar: string;
  description_en: string;
  description_ar: string;
  badge_en: string;
  badge_ar: string;
  skills_applied: string;
  display_order: number;
  is_visible: number;
  created_at: string;
  updated_at: string;
}

export interface DbContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: number;
  is_archived: number;
  created_at: string;
}

export const dbRepo = {
  // Profiles
  getProfile(): DbProfile {
    const db = getDb();
    const row = db.prepare('SELECT * FROM profiles WHERE id = ?').get('default') as DbProfile | undefined;
    if (!row) throw new Error('Profile not found');
    return row;
  },

  updateProfile(data: Partial<DbProfile>): void {
    const db = getDb();
    const fields = Object.keys(data).filter((k) => k !== 'id' && k !== 'updated_at');
    if (fields.length === 0) return;

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (data as Record<string, unknown>)[f]);
    db.prepare(`UPDATE profiles SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = 'default'`).run(...values);
  },

  // Projects
  getProjects(includeDrafts = false): DbProject[] {
    const db = getDb();
    const query = includeDrafts
      ? 'SELECT * FROM projects ORDER BY display_order ASC, created_at DESC'
      : 'SELECT * FROM projects WHERE is_published = 1 ORDER BY display_order ASC, created_at DESC';
    return db.prepare(query).all() as DbProject[];
  },

  getProjectById(id: string): DbProject | undefined {
    const db = getDb();
    return db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as DbProject | undefined;
  },

  createProject(project: Omit<DbProject, 'created_at' | 'updated_at'>): void {
    const db = getDb();
    db.prepare(`
      INSERT INTO projects (
        id, slug, title_en, title_ar, tagline_en, tagline_ar,
        category_en, category_ar, role_en, role_ar, overview_en, overview_ar,
        problem_en, problem_ar, architecture_en, architecture_ar,
        technologies, status_badge_en, status_badge_ar, status_type,
        status_note_en, status_note_ar, features_json, github_url, live_demo_url,
        results_metric_en, results_metric_ar, is_flagship, is_featured, is_published, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      project.id, project.slug, project.title_en, project.title_ar, project.tagline_en, project.tagline_ar,
      project.category_en, project.category_ar, project.role_en, project.role_ar, project.overview_en, project.overview_ar,
      project.problem_en, project.problem_ar, project.architecture_en, project.architecture_ar,
      project.technologies, project.status_badge_en, project.status_badge_ar, project.status_type,
      project.status_note_en, project.status_note_ar, project.features_json, project.github_url || null, project.live_demo_url || null,
      project.results_metric_en || null, project.results_metric_ar || null,
      project.is_flagship ? 1 : 0, project.is_featured ? 1 : 0, project.is_published ? 1 : 0, project.display_order || 0
    );
  },

  updateProject(id: string, data: Partial<DbProject>): void {
    const db = getDb();
    const fields = Object.keys(data).filter((k) => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
    if (fields.length === 0) return;

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (data as Record<string, unknown>)[f]);
    db.prepare(`UPDATE projects SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values, id);
  },

  deleteProject(id: string): void {
    const db = getDb();
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  },

  // Skills
  getSkills(includeHidden = false): DbSkill[] {
    const db = getDb();
    const query = includeHidden
      ? 'SELECT * FROM skills ORDER BY category ASC, display_order ASC'
      : 'SELECT * FROM skills WHERE is_visible = 1 ORDER BY category ASC, display_order ASC';
    return db.prepare(query).all() as DbSkill[];
  },

  createSkill(skill: Omit<DbSkill, 'created_at' | 'updated_at'>): void {
    const db = getDb();
    db.prepare(`
      INSERT INTO skills (id, name, category, level_en, level_ar, evidence_en, evidence_ar, is_highlight, is_visible, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      skill.id, skill.name, skill.category, skill.level_en, skill.level_ar,
      skill.evidence_en || null, skill.evidence_ar || null,
      skill.is_highlight ? 1 : 0, skill.is_visible ? 1 : 0, skill.display_order || 0
    );
  },

  updateSkill(id: string, data: Partial<DbSkill>): void {
    const db = getDb();
    const fields = Object.keys(data).filter((k) => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
    if (fields.length === 0) return;

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (data as Record<string, unknown>)[f]);
    db.prepare(`UPDATE skills SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values, id);
  },

  deleteSkill(id: string): void {
    const db = getDb();
    db.prepare('DELETE FROM skills WHERE id = ?').run(id);
  },

  // Journey
  getJourney(includeHidden = false): DbJourneyMilestone[] {
    const db = getDb();
    const query = includeHidden
      ? 'SELECT * FROM journey_milestones ORDER BY display_order ASC, period DESC'
      : 'SELECT * FROM journey_milestones WHERE is_visible = 1 ORDER BY display_order ASC, period DESC';
    return db.prepare(query).all() as DbJourneyMilestone[];
  },

  createJourneyMilestone(item: Omit<DbJourneyMilestone, 'created_at' | 'updated_at'>): void {
    const db = getDb();
    db.prepare(`
      INSERT INTO journey_milestones (
        id, period, title_en, title_ar, institution_en, institution_ar,
        description_en, description_ar, badge_en, badge_ar, skills_applied, display_order, is_visible
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      item.id, item.period, item.title_en, item.title_ar, item.institution_en, item.institution_ar,
      item.description_en, item.description_ar, item.badge_en, item.badge_ar,
      item.skills_applied, item.display_order || 0, item.is_visible ? 1 : 0
    );
  },

  updateJourneyMilestone(id: string, data: Partial<DbJourneyMilestone>): void {
    const db = getDb();
    const fields = Object.keys(data).filter((k) => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
    if (fields.length === 0) return;

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (data as Record<string, unknown>)[f]);
    db.prepare(`UPDATE journey_milestones SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values, id);
  },

  deleteJourneyMilestone(id: string): void {
    const db = getDb();
    db.prepare('DELETE FROM journey_milestones WHERE id = ?').run(id);
  },

  // Contact Messages
  getMessages(includeArchived = false): DbContactMessage[] {
    const db = getDb();
    const query = includeArchived
      ? 'SELECT * FROM contact_messages ORDER BY created_at DESC'
      : 'SELECT * FROM contact_messages WHERE is_archived = 0 ORDER BY created_at DESC';
    return db.prepare(query).all() as DbContactMessage[];
  },

  createMessage(msg: { id: string; name: string; email: string; subject?: string; message: string }): void {
    const db = getDb();
    db.prepare(`
      INSERT INTO contact_messages (id, name, email, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(msg.id, msg.name, msg.email, msg.subject || null, msg.message);
  },

  markMessageRead(id: string, isRead = true): void {
    const db = getDb();
    db.prepare('UPDATE contact_messages SET is_read = ? WHERE id = ?').run(isRead ? 1 : 0, id);
  },

  deleteMessage(id: string): void {
    const db = getDb();
    db.prepare('DELETE FROM contact_messages WHERE id = ?').run(id);
  },

  // Site Settings
  getSettings(): Record<string, string> {
    const db = getDb();
    const rows = db.prepare('SELECT key, value FROM site_settings').all() as { key: string; value: string }[];
    const settings: Record<string, string> = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }
    return settings;
  },

  updateSetting(key: string, value: string): void {
    const db = getDb();
    db.prepare(`
      INSERT INTO site_settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `).run(key, value);
  },

  // Admin stats
  getAdminStats() {
    const db = getDb();
    const publishedProjects = (db.prepare('SELECT COUNT(*) as c FROM projects WHERE is_published = 1').get() as { c: number }).c;
    const draftProjects = (db.prepare('SELECT COUNT(*) as c FROM projects WHERE is_published = 0').get() as { c: number }).c;
    const featuredProjects = (db.prepare('SELECT COUNT(*) as c FROM projects WHERE is_featured = 1 AND is_published = 1').get() as { c: number }).c;
    const totalSkills = (db.prepare('SELECT COUNT(*) as c FROM skills').get() as { c: number }).c;
    const unreadMessages = (db.prepare('SELECT COUNT(*) as c FROM contact_messages WHERE is_read = 0 AND is_archived = 0').get() as { c: number }).c;
    const totalMessages = (db.prepare('SELECT COUNT(*) as c FROM contact_messages').get() as { c: number }).c;
    const totalMilestones = (db.prepare('SELECT COUNT(*) as c FROM journey_milestones').get() as { c: number }).c;

    const recentProjects = db.prepare('SELECT id, title_en, updated_at, is_published FROM projects ORDER BY updated_at DESC LIMIT 5').all();
    const recentMessages = db.prepare('SELECT id, name, email, subject, created_at, is_read FROM contact_messages ORDER BY created_at DESC LIMIT 5').all();

    return {
      publishedProjects,
      draftProjects,
      featuredProjects,
      totalSkills,
      unreadMessages,
      totalMessages,
      totalMilestones,
      recentProjects,
      recentMessages,
    };
  },

  // Admin User Auth
  getAdminByEmail(email: string) {
    const db = getDb();
    return db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email) as {
      id: string;
      email: string;
      name: string;
      password_hash: string;
      password_salt: string;
      role: string;
    } | undefined;
  },

  getAdminById(id: string) {
    const db = getDb();
    return db.prepare('SELECT id, email, name, role FROM admin_users WHERE id = ?').get(id) as {
      id: string;
      email: string;
      name: string;
      role: string;
    } | undefined;
  },
};
