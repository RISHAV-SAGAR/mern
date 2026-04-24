export const librarySections = [
  {
    type: "books",
    title: "Book Categories",
    description:
      "Open a category to explore curated books with author names, prices, release year, and a short description.",
    categories: [
      {
        slug: "fictional",
        name: "Fictional",
        icon: "📖",
        blurb: "Novels, imaginative stories, and modern literary favorites.",
      },
      {
        slug: "programming",
        name: "Programming",
        icon: "💻",
        blurb: "Web development, coding fundamentals, and software design.",
      },
      {
        slug: "science",
        name: "Science",
        icon: "🔬",
        blurb: "Physics, biology, and interesting science-based reading.",
      },
      {
        slug: "self-help",
        name: "Self Help",
        icon: "🌱",
        blurb: "Mindset, productivity, and personal growth collections.",
      },
    ],
  },
  {
    type: "pdfs",
    title: "PDF Categories",
    description:
      "These PDF resources are perfect for revision, quick practice, and exam preparation.",
    categories: [
      {
        slug: "lecture-notes",
        name: "Lecture Notes",
        icon: "📝",
        blurb: "Short notes and summaries for fast revision.",
      },
      {
        slug: "exam-prep",
        name: "Exam Prep",
        icon: "📚",
        blurb: "Solved questions, practice packs, and exam-focused material.",
      },
      {
        slug: "research-guides",
        name: "Research Guides",
        icon: "📄",
        blurb: "Topic explainers and downloadable reference PDFs.",
      },
    ],
  },
  {
    type: "software",
    title: "Software Categories",
    description:
      "Browse useful student software tools with pricing, publisher details, year, and a short summary.",
    categories: [
      {
        slug: "productivity",
        name: "Productivity",
        icon: "🧠",
        blurb: "Planning, note-taking, and focus tools for daily student work.",
      },
      {
        slug: "design-tools",
        name: "Design Tools",
        icon: "🎨",
        blurb: "Creative apps for UI design, posters, presentations, and editing.",
      },
      {
        slug: "developer-tools",
        name: "Developer Tools",
        icon: "⚙️",
        blurb: "Coding and testing tools that help students build projects faster.",
      },
    ],
  },
  {
    type: "games",
    title: "Game Categories",
    description:
      "Explore educational games by category and view their price, studio name, release year, and description.",
    categories: [
      {
        slug: "brain-games",
        name: "Brain Games",
        icon: "🧩",
        blurb: "Memory, logic, and reasoning games for sharper thinking.",
      },
      {
        slug: "coding-games",
        name: "Coding Games",
        icon: "🎮",
        blurb: "Interactive games that teach programming through fun challenges.",
      },
      {
        slug: "math-games",
        name: "Math Games",
        icon: "➗",
        blurb: "Practice speed, calculations, and problem-solving in a fun way.",
      },
    ],
  },
  {
    type: "courses",
    title: "Course Categories",
    description:
      "Browse online course categories and view each course with price, instructor name, release year, and a short description.",
    categories: [
      {
        slug: "web-development",
        name: "Web Development",
        icon: "🌐",
        blurb: "Frontend, backend, and full-stack learning paths for modern web apps.",
      },
      {
        slug: "data-science",
        name: "Data Science",
        icon: "📊",
        blurb: "Python, analytics, machine learning, and visualization courses.",
      },
      {
        slug: "design-career",
        name: "Design & Career",
        icon: "🎓",
        blurb: "UI/UX, communication, portfolio, and job-readiness programs.",
      },
    ],
  },
];

export const libraryInventory = {
  books: {
    fictional: {
      title: "Fictional Books",
      description:
        "Enjoy popular fictional titles with engaging stories, featured authors, and quick details for buyers.",
      items: [
        {
          name: "The Midnight Library",
          author: "Matt Haig",
          year: 2020,
          price: "$18",
          description:
            "A thoughtful story about choices, regrets, and the many ways a life can unfold.",
        },
        {
          name: "The Alchemist",
          author: "Paulo Coelho",
          year: 1988,
          price: "$12",
          description:
            "A timeless novel about following dreams and discovering purpose through a spiritual journey.",
        },
        {
          name: "To Kill a Mockingbird",
          author: "Harper Lee",
          year: 1960,
          price: "$15",
          description:
            "A classic fictional work exploring justice, empathy, and courage in a small town.",
        },
      ],
    },
    programming: {
      title: "Programming Books",
      description:
        "Best-selling coding books for students and developers who want stronger practical skills.",
      items: [
        {
          name: "Eloquent JavaScript",
          author: "Marijn Haverbeke",
          year: 2018,
          price: "$22",
          description:
            "A practical guide to JavaScript fundamentals, browser concepts, and programming structure.",
        },
        {
          name: "Clean Code",
          author: "Robert C. Martin",
          year: 2008,
          price: "$25",
          description:
            "Teaches how to write readable, maintainable, and professional-quality code.",
        },
        {
          name: "You Don't Know JS Yet",
          author: "Kyle Simpson",
          year: 2020,
          price: "$19",
          description:
            "An in-depth series focused on the core mechanics and advanced ideas of JavaScript.",
        },
      ],
    },
    science: {
      title: "Science Books",
      description:
        "A compact collection of science books covering curiosity, discovery, and real-world concepts.",
      items: [
        {
          name: "A Brief History of Time",
          author: "Stephen Hawking",
          year: 1988,
          price: "$17",
          description:
            "A readable introduction to space, time, black holes, and the structure of the universe.",
        },
        {
          name: "The Selfish Gene",
          author: "Richard Dawkins",
          year: 1976,
          price: "$16",
          description:
            "A famous book explaining evolution through the idea of gene-centered selection.",
        },
        {
          name: "The Gene",
          author: "Siddhartha Mukherjee",
          year: 2016,
          price: "$21",
          description:
            "A fascinating history of genetics, discovery, and the science shaping modern medicine.",
        },
      ],
    },
    "self-help": {
      title: "Self Help Books",
      description:
        "Helpful reads for better habits, clearer focus, and stronger personal growth.",
      items: [
        {
          name: "Atomic Habits",
          author: "James Clear",
          year: 2018,
          price: "$20",
          description:
            "Shows how tiny daily improvements can create powerful long-term changes.",
        },
        {
          name: "Deep Work",
          author: "Cal Newport",
          year: 2016,
          price: "$18",
          description:
            "A guide to focused work and producing more value in a distracted world.",
        },
        {
          name: "Think Like a Monk",
          author: "Jay Shetty",
          year: 2020,
          price: "$16",
          description:
            "Blends modern life advice with mindfulness and intentional thinking.",
        },
      ],
    },
  },
  pdfs: {
    "lecture-notes": {
      title: "Lecture Notes PDFs",
      description:
        "Useful PDF notes prepared for quick reading, revision, and concept review.",
      items: [
        {
          name: "Web Development Notes Pack",
          author: "Areeba Khan",
          year: 2024,
          price: "$6",
          description:
            "Concise front-end and back-end notes with examples for HTML, CSS, JavaScript, and React.",
        },
        {
          name: "Data Structures Summary",
          author: "Hassan Raza",
          year: 2023,
          price: "$5",
          description:
            "A revision PDF covering stacks, queues, trees, graphs, and common interview concepts.",
        },
        {
          name: "Database Systems Revision",
          author: "Noor Fatima",
          year: 2024,
          price: "$4",
          description:
            "Short notes on SQL, normalization, indexing, joins, and transactions.",
        },
      ],
    },
    "exam-prep": {
      title: "Exam Prep PDFs",
      description:
        "Downloadable PDFs for practice questions, solved papers, and last-minute preparation.",
      items: [
        {
          name: "OOP Solved Paper Set",
          author: "Muhammad Ali",
          year: 2024,
          price: "$7",
          description:
            "A practice-focused PDF with solved OOP questions and short concept explanations.",
        },
        {
          name: "Mathematics Crash Revision",
          author: "Sarah Ahmed",
          year: 2023,
          price: "$5",
          description:
            "Includes formulas, important theorems, and mini-practice exercises for quick review.",
        },
        {
          name: "Computer Networks MCQ Bank",
          author: "Usman Tariq",
          year: 2024,
          price: "$6",
          description:
            "A multiple-choice preparation PDF covering protocols, models, and networking basics.",
        },
      ],
    },
    "research-guides": {
      title: "Research Guide PDFs",
      description:
        "Reference PDFs that support project writing, report building, and topic exploration.",
      items: [
        {
          name: "Research Writing Starter Guide",
          author: "Dr. Sana Javed",
          year: 2022,
          price: "$8",
          description:
            "Explains structure, citations, formatting, and academic writing standards in a simple way.",
        },
        {
          name: "AI Trends Overview PDF",
          author: "Hamza Qureshi",
          year: 2025,
          price: "$9",
          description:
            "A readable PDF on recent AI trends, practical use cases, and future opportunities.",
        },
        {
          name: "Project Proposal Templates",
          author: "Fatima Iqbal",
          year: 2024,
          price: "$5",
          description:
            "Contains proposal outlines, examples, and editable structure suggestions for students.",
        },
      ],
    },
  },
  software: {
    productivity: {
      title: "Productivity Software",
      description:
        "Student-friendly productivity tools for note-taking, planning, and organized study routines.",
      items: [
        {
          name: "Notion Student Pro",
          author: "Notion Labs",
          year: 2024,
          price: "$14",
          description:
            "A workspace tool for notes, assignments, planners, and team collaboration in one place.",
        },
        {
          name: "FocusFlow Planner",
          author: "StudySoft",
          year: 2023,
          price: "$10",
          description:
            "Helps students manage tasks, Pomodoro sessions, and weekly learning goals.",
        },
        {
          name: "EverStudy Notes",
          author: "NoteStack",
          year: 2025,
          price: "$12",
          description:
            "A cross-device notebook app for fast revision notes and organized study material.",
        },
      ],
    },
    "design-tools": {
      title: "Design Tools Software",
      description:
        "Creative software options for UI work, posters, presentations, and academic design projects.",
      items: [
        {
          name: "Canva Classroom Kit",
          author: "Canva",
          year: 2024,
          price: "$11",
          description:
            "A simple design platform for assignments, infographics, resumes, and presentations.",
        },
        {
          name: "Figma Starter Pro",
          author: "Figma Inc.",
          year: 2025,
          price: "$16",
          description:
            "Useful for interface design, teamwork, and quick prototyping of student projects.",
        },
        {
          name: "PixelCraft Editor",
          author: "BrightPixel Studio",
          year: 2023,
          price: "$13",
          description:
            "A lightweight graphics editor for banners, flyers, and social design practice.",
        },
      ],
    },
    "developer-tools": {
      title: "Developer Tools Software",
      description:
        "Useful tools for coding students who want to write, test, and manage projects more efficiently.",
      items: [
        {
          name: "CodePilot Toolkit",
          author: "DevForge",
          year: 2025,
          price: "$18",
          description:
            "A bundled developer utility suite for debugging, snippets, and project templates.",
        },
        {
          name: "API Lab Studio",
          author: "RapidBuild",
          year: 2024,
          price: "$15",
          description:
            "A student-friendly app for testing REST APIs and organizing backend requests.",
        },
        {
          name: "DB Desk Manager",
          author: "QueryWorks",
          year: 2023,
          price: "$12",
          description:
            "Helps learners explore databases, run queries, and understand schema design.",
        },
      ],
    },
  },
  games: {
    "brain-games": {
      title: "Brain Games",
      description:
        "Educational games built to improve logic, concentration, and memory through short challenges.",
      items: [
        {
          name: "MindSprint Challenge",
          author: "BrainBox Studio",
          year: 2024,
          price: "$9",
          description:
            "A logic and memory game with quick rounds designed to boost focus and pattern recognition.",
        },
        {
          name: "Puzzle Quest Academy",
          author: "LearnPlay",
          year: 2023,
          price: "$8",
          description:
            "Offers increasingly difficult problem-solving levels to sharpen reasoning skills.",
        },
        {
          name: "Memory Master",
          author: "CleverCore Games",
          year: 2025,
          price: "$10",
          description:
            "A colorful training game that helps students practice visual memory and retention.",
        },
      ],
    },
    "coding-games": {
      title: "Coding Games",
      description:
        "Interactive games that teach coding logic, syntax basics, and algorithm thinking in a fun format.",
      items: [
        {
          name: "Code Runner Arena",
          author: "BytePlay",
          year: 2025,
          price: "$14",
          description:
            "Players solve small programming challenges to unlock levels and improve coding confidence.",
        },
        {
          name: "Bug Hunter Junior",
          author: "Syntax Spark",
          year: 2024,
          price: "$11",
          description:
            "A beginner-friendly debugging game focused on spotting and fixing code mistakes.",
        },
        {
          name: "Algo Adventure",
          author: "Loop Labs",
          year: 2023,
          price: "$12",
          description:
            "Teaches loops, conditions, and sequences through animated missions and quests.",
        },
      ],
    },
    "math-games": {
      title: "Math Games",
      description:
        "Fun math practice games for improving speed, calculations, and confidence in problem-solving.",
      items: [
        {
          name: "Math Blaster Pro",
          author: "EduFun Interactive",
          year: 2024,
          price: "$7",
          description:
            "Fast-paced arithmetic challenges designed to strengthen mental calculation skills.",
        },
        {
          name: "Fraction Frenzy",
          author: "NumberNest",
          year: 2023,
          price: "$6",
          description:
            "Makes fraction and ratio practice easier through game-style levels and rewards.",
        },
        {
          name: "Geometry Dash Learn",
          author: "ShapeLabs",
          year: 2025,
          price: "$9",
          description:
            "Combines shapes, angles, and geometry concepts with engaging interactive puzzles.",
        },
      ],
    },
  },
  courses: {
    "web-development": {
      title: "Web Development Courses",
      description:
        "Online courses for HTML, CSS, JavaScript, React, Node.js, and full-stack project building.",
      items: [
        {
          name: "Frontend Bootcamp Masterclass",
          author: "Areeba Khan",
          year: 2025,
          price: "$29",
          description:
            "A complete beginner-friendly course covering HTML, CSS, JavaScript, React, and responsive design projects.",
        },
        {
          name: "MERN Stack Project Lab",
          author: "Hamza Ali",
          year: 2024,
          price: "$34",
          description:
            "Build real MERN applications with authentication, APIs, MongoDB, and deployment guidance.",
        },
        {
          name: "Node.js API Essentials",
          author: "Sara Ahmed",
          year: 2023,
          price: "$24",
          description:
            "Learn backend fundamentals by creating REST APIs, routing logic, and secure server workflows.",
        },
      ],
    },
    "data-science": {
      title: "Data Science Courses",
      description:
        "Practical online programs for Python analysis, data visualization, machine learning, and statistics.",
      items: [
        {
          name: "Python for Data Analysis",
          author: "Dr. Sana Javed",
          year: 2025,
          price: "$31",
          description:
            "Covers pandas, NumPy, cleaning datasets, and working with real-world analysis problems.",
        },
        {
          name: "Machine Learning Starter Track",
          author: "Usman Tariq",
          year: 2024,
          price: "$36",
          description:
            "An entry-level course on supervised learning, model evaluation, and scikit-learn basics.",
        },
        {
          name: "Data Visualization with Power BI",
          author: "Noor Fatima",
          year: 2023,
          price: "$27",
          description:
            "Helps students build dashboards, reports, and insights using professional visualization tools.",
        },
      ],
    },
    "design-career": {
      title: "Design & Career Courses",
      description:
        "Courses focused on UI/UX basics, communication, personal branding, and career preparation.",
      items: [
        {
          name: "UI/UX Design Foundations",
          author: "Fatima Iqbal",
          year: 2025,
          price: "$28",
          description:
            "Learn wireframes, user flows, prototyping, and design thinking with hands-on assignments.",
        },
        {
          name: "Portfolio & Resume Workshop",
          author: "Bilal Hassan",
          year: 2024,
          price: "$18",
          description:
            "A short career-focused course for creating strong resumes, portfolios, and interview-ready profiles.",
        },
        {
          name: "Freelancing for Students",
          author: "Hina Raza",
          year: 2023,
          price: "$20",
          description:
            "Guides learners through client communication, gig platforms, proposals, and basic pricing strategies.",
        },
      ],
    },
  },
};