/* Interactivity for Sai Accountables Educational Training Institution */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  const navContainer = document.querySelector(".nav-container");

  // Handle click on mobile menu button
  mobileMenuBtn.addEventListener("click", () => {
    navContainer.classList.toggle("active");
    document.body.classList.toggle("menu-open");
    const icon = mobileMenuBtn.querySelector("i");
    if (navContainer.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu and remove scroll lock when a link is clicked
  const navItems = navLinks.querySelectorAll("a");
  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      // 1. Close mobile menu
      navContainer.classList.remove("active");
      document.body.classList.remove("menu-open");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");

      // 2. Close any open modals
      if (window.closeDetailsModal) window.closeDetailsModal();
      if (window.closeCurriculumModal) window.closeCurriculumModal();
      if (window.closeModal) window.closeModal();
    });
  });

  // 2. Fade-in Animation on Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  // Track elements for fade-in
  const animatedElements = document.querySelectorAll(
    ".fade-in, .reveal-up, .reveal-left, .reveal-right",
  );
  animatedElements.forEach((el) => observer.observe(el));

  // 3. Image Modal for Gallery
  window.openModal = function (src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = src;
    document.body.style.overflow = "hidden"; // Stop scrolling
  };

  window.closeModal = function () {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  // Close modal on Esc key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // 4. Active Link Highlighting
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").includes(current)) {
        item.classList.add("active");
      }
    });

    // Navbar compression on scroll
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0";
      navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    } else {
      navbar.style.padding = "15px 0";
      navbar.style.boxShadow = "none";
    }
  });

  // 6. Course Detail Modal Logic
  const courseData = {
    financial: {
      title: "Financial/Accounting Courses",
      courses: [
        "SAP S4 HANA FICO- Finance and Controlling",
        "SAP S4 HANA MM-Materials Management",
        "Financial Data Certification:",
        "Nergy Vidya – Compliance & Accounting",
        "Tally ERP 9 with GST and Prime",
        "Zoho Books:",
        "Quick Books",
        "Peachtree/ Sage 50:",
        "IAF(Indian And Foreign accounting)",
        "GCC VAT",
      ],
    },
    it: {
      title: "IT and Data Analytics Specialist Program",
      courses: [
        "Technical Business Analyst",
        "Data Analytics Essentials: Python, SQL, Excel, and Power BI",
        "Data Analysis and Visualization with SQL, Excel and Power BI",
        "Python Essentials for Data Analysis",
        "JAVA Programming",
        "SQL(Structured Query Language)",
        "Power BI & SQL",
        "C++ Programming",
        "Full Stack Web Development",
        "DevOps Engineering",
        "Cloud Computing Essentials",
      ],
    },
    generic: {
      title: "Generic Courses",
      courses: [
        "MOS-Microsoft Office Specialist",
        "PowerBi",
        "Prompt Engineering",
      ],
    },
  };

  window.openCourseDetails = function (category) {
    const modal = document.getElementById("courseDetailsModal");
    const content = document.getElementById("detailsContent");
    const data = courseData[category];

    if (!data) return;

    let html = `
      <div class="details-header">
        <h2>${data.title}</h2>
        <div class="details-divider"></div>
      </div>
      <div class="details-grid">
    `;

    data.courses.forEach((course) => {
      html += `
        <div class="sub-course-card" onclick="openCourseCurriculum('${course}', '${data.title}')" style="cursor: pointer;">
          <h4>${course}</h4>
          <span class="know-more">Know More ></span>
        </div>
      `;
    });

    html += `</div>`;
    content.innerHTML = html;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  };

  window.closeDetailsModal = function () {
    const modal = document.getElementById("courseDetailsModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  // 7. Course Curriculum Logic
  const curriculumData = {
    // IT COURSES Content
    "Technical Business Analyst": {
      title: "Technical Business Analyst",
      description:
        "This course helps you build a strong foundation in business analysis and Agile practices. It is designed to prepare you for real-world IT and software projects by focusing on requirement handling, stakeholder coordination, and essential analytical tools.",
      list: [
        "Business Analyst roles, responsibilities, and career overview",
        "Understanding stakeholders, clients, and end-user needs",
        "Requirement gathering and analysis techniques",
        "SDLC overview – Waterfall and Agile methodologies",
        "Agile & Scrum fundamentals and project flow",
        "User stories, acceptance criteria, and basic documentation",
        "Introduction to software testing and UAT involvement",
        "Basics of data analysis using SQL, Python, and Power BI",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will be able to analyze business requirements, communicate effectively with technical teams, and support project delivery using industry-standard BA practices and tools.",
      suggested: [
        "Data Analytics Essentials: Python, SQL, Excel, and Power BI",
        "Microsoft Office Specialist (MOS)",
        "Full Stack Web Development",
      ],
    },
    "Data Analytics Essentials: Python, SQL, Excel, and Power BI": {
      title: "Data Analytics Essentials",
      description:
        "This course is designed to build strong fundamentals in data analytics using industry-standard tools. It focuses on data handling, analysis, and visualization skills required for entry-level data and business roles.",
      list: [
        "Basics of databases and SQL for data retrieval and analysis",
        "Writing queries to filter, sort, join, and summarize data",
        "Python fundamentals for data handling and analysis",
        "Working with data using pandas and NumPy",
        "Creating charts and basic visualizations using Python",
        "Advanced Excel for calculations, functions, pivot tables, and reports",
        "Power BI for data modeling, dashboards, and interactive reports",
        "Hands-on practice with real-world datasets and a final project",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will be able to analyze data, generate insights, and create meaningful reports and dashboards using Python, SQL, Excel, and Power BI—making you job-ready for data and analytics roles",
      suggested: [
        "Data Analysis and Visualization with SQL, Excel and Power BI",
        "Python Essentials for Data Analysis",
        "Technical Business Analyst",
      ],
    },
    "Data Analysis and Visualization with SQL, Excel and Power BI": {
      title: "Data Analysis and Visualization",
      description:
        "This course focuses on analyzing data and presenting insights through reports and dashboards. It is ideal for learners who want to strengthen their analytical and visualization skills using widely used business tools.",
      list: [
        "Fundamentals of databases and SQL for querying and analyzing data",
        "Writing SQL queries to filter, join, and summarize data",
        "Advanced Excel for data cleaning, formulas, pivot tables, and charts",
        "Data analysis and reporting using Excel functions and dashboards",
        "Power BI for data modeling and interactive visualizations",
        "Creating professional reports and dashboards for business use",
        "Best practices for presenting data-driven insights",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will be able to analyze data efficiently and present insights using SQL, Excel, and Power BI—enabling you to support business decisions with clear and impactful visual reports.",
      suggested: [
        "Data Analytics Essentials: Python, SQL, Excel, and Power BI",
        "Python Essentials for Data Analysis",
        "Power BI & SQL",
      ],
    },
    "Python Essentials for Data Analysis": {
      title: "Python Essentials for Data Analysis",
      description:
        "This course introduces Python as a powerful and easy-to-learn tool for data analysis and visualization. It is designed for beginners who want to work with data, automate tasks, and create meaningful insights using Python.",
      list: [
        "Basics of Python programming, syntax, and data types",
        "Writing programs using conditions and loops",
        "Working with lists, dictionaries, and strings",
        "Creating and using functions and modules",
        "Reading and writing files such as CSV and text files",
        "Handling errors and exceptions in Python programs",
        "Data analysis using NumPy and pandas",
        "Creating charts and visualizations using Matplotlib",
        "Connecting Python with databases and working with SQL data",
        "Hands-on project covering data collection, analysis, and visualization",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will be able to analyze data, automate simple tasks, and create clear visual reports using Python—building a strong foundation for roles in data analysis and business intelligence.",
      suggested: [
        "Data Analytics Essentials: Python, SQL, Excel, and Power BI",
        "Python Programming",
        "Full Stack Web Development",
      ],
    },
    "JAVA Programming": {
      title: "JAVA Programming",
      description:
        "This course introduces Java programming from scratch and helps learners understand core programming concepts using simple examples and hands-on practice. It is ideal for students and beginners who want to build a strong foundation in object-oriented programming.",
      list: [
        "Basics of Java programming and how to run Java programs",
        "Writing your first Java program using command prompt and Eclipse",
        "Understanding comments, variables, and data types",
        "Using operators, conditions, and loops for decision making",
        "Creating methods with and without parameters",
        "Understanding classes, objects, constructors, and keywords",
        "Core object-oriented concepts: Inheritance, Polymorphism, Abstraction, and Encapsulation",
        "Working with strings, arrays, and array lists",
        "Handling errors and exceptions in Java programs",
        "Identifying and fixing common syntax, logical, and runtime errors",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, learners will be able to write basic Java programs, understand object-oriented concepts clearly, and build a strong foundation for advanced Java, software development, or related IT careers.",
      suggested: [
        "C++ Programming",
        "Full Stack Web Development",
        "DevOps Engineering",
      ],
    },
    "C++ Programming": {
      title: "C++ Programming",
      description:
        "This course introduces C++ programming from the basics and helps learners understand core programming and object-oriented concepts through simple logic building and hands-on examples. It is suitable for students and beginners with little or no prior programming experience.",
      list: [
        "Fundamentals of C++ programming, syntax, and program structure",
        "Data types, variables, operators, and basic input/output operations",
        "Writing programs using conditional statements and loops",
        "Working with arrays and functions",
        "Understanding classes, objects, and object-oriented programming concepts",
        "Function overloading and operator overloading basics",
        "Constructors, destructors, and memory concepts",
        "Inheritance and polymorphism concepts in C++",
        "Virtual functions, abstract classes, and templates (introduction level)",
        "File handling and basic input/output stream operations",
        "Basics of exception handling and error control",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, learners will be able to write structured C++ programs, apply object-oriented concepts, and build a strong foundation for advanced programming, software development, or computer science studies.",
      suggested: [
        "JAVA Programming",
        "Full Stack Web Development",
        "Python Essentials for Data Analysis",
      ],
    },
    "Full Stack Web Development": {
      title: "Full Stack Web Development",
      description:
        "Become a versatile developer by mastering both frontend and backend technologies. This course takes you from basic HTML/CSS to building complex, database-driven applications using the popular MERN stack (MongoDB, Express, React, and Node.js).",
      list: [
        "Frontend Mastery: HTML5, CSS3, Flexbox, Grid, and Responsive Design",
        "JavaScript Deep Dive: ES6+ features, DOM manipulation, and Asynchronous JS",
        "React.js: Building component-based UIs, State Management (Hooks/Context API), and Routing",
        "Backend Development: Server-side logic with Node.js and Express.js",
        "Database Design: NoSQL with MongoDB and SQL with MySQL/PostgreSQL",
        "REST & GraphQL API: Design, implementation, and consumption",
        "Authentication: User login, JWT, and OAuth implementation",
        "Deployment & CI/CD: Git, GitHub, Vercel/Heroku, and basic Docker",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will be able to plan, code, and deploy professional-grade web applications and have a portfolio of projects to show potential employers.",
      suggested: [
        "DevOps Engineering",
        "Python Essentials for Data Analysis",
        "JAVA Programming",
      ],
    },
    "DevOps Engineering": {
      title: "DevOps Engineering",
      description:
        "Learn to automate software delivery and infrastructure management. This course bridges the gap between development and operations, teaching you the tools and practices used by top tech companies to maintain high-speed, reliable production environments.",
      list: [
        "DevOps Culture: Principles, Lifecycle, and Continuous Everything",
        "Version Control: Advanced Git workflows and Branching strategies",
        "CI/CD Pipelines: Automating builds and deployments with Jenkins and GitHub Actions",
        "Containerization: Creating and managing Docker containers",
        "Orchestration: Scaling applications with Kubernetes (EKS/GKE)",
        "Infrastructure as Code (IaC): Provisioning cloud resources with Terraform and Ansible",
        "Cloud Platforms: Managing AWS/Azure cloud infrastructure",
        "Monitoring: Real-time observability with Prometheus, Grafana, and ELK stack",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will be proficient in automating the entire software development lifecycle, ensuring faster releases and more stable systems.",
      suggested: [
        "Full Stack Web Development",
        "Cloud Computing Essentials",
        "C++ Programming",
      ],
    },
    "SQL(Structured Query Language)": {
      title: "SQL(Structured Query Language)",
      description:
        "This course introduces learners to databases and SQL from scratch. It focuses on understanding how data is stored, managed, and retrieved using SQL, with practical examples suitable for beginners and non-technical learners.",
      list: [
        "Basics of databases and types of data storage",
        "Introduction to SQL and relational databases",
        "Retrieving data using simple SQL queries",
        "Filtering, sorting, and searching data effectively",
        "Adding, updating, and deleting records in tables",
        "Using aggregate functions for summaries and reports",
        "Combining data from multiple tables using joins",
        "Understanding subqueries and nested queries",
        "Managing transactions and data consistency",
        "Applying constraints to maintain data accuracy",
        "Creating and using views for simplified data access",
        "Introduction to stored procedures and their benefits",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, learners will be able to confidently write SQL queries, work with databases, and perform data analysis tasks commonly required in business, reporting, and analytics roles",
      suggested: [
        "Power BI & SQL",
        "Data Analytics Essentials: Python, SQL, Excel, and Power BI",
        "Data Analysis and Visualization with SQL, Excel and Power BI",
      ],
    },

    // FINANCIAL COURSES Content
    "SAP S4 HANA FICO- Finance and Controlling": {
      title: "SAP S4 HANA FICO",
      description:
        "This program provides a practical foundation in SAP Financial Accounting (FICO), designed to help learners understand how finance operations are managed in real-world organizations using SAP.",
      list: [
        "Core SAP & ERP concepts and business processes integration",
        "Setting up company codes, business areas, and controlling areas",
        "Chart of Accounts and General Ledger operations",
        "Customer, vendor, and asset accounting",
        "Handling Accounts Payable (AP) and Accounts Receivable (AR)",
        "Bank accounting and reconciliation",
        "GST transactions and taxation scenarios",
      ],
      conclusion:
        "<strong>By the end of the course</strong>, learners will be able to navigate SAP confidently and perform key accounting transactions used in corporate finance roles.",
      suggested: [
        "SAP S4 HANA MM-Materials Management",
        "Technical Business Analyst",
        "IAF(Indian And Foreign accounting)",
      ],
    },
    "SAP S4 HANA MM-Materials Management": {
      title: "SAP S4 HANA MM",
      description:
        "This course provides a comprehensive foundation in SAP S/4HANA Material Management (MM), focusing on procurement, inventory, and material valuation.",
      list: [
        "SAP S/4HANA and MM fundamentals",
        "Organizational units: plant, storage location, purchasing group",
        "Master data: material master, vendor master, info records",
        "Procure-to-pay (P2P) cycle execution",
        "Inventory management: goods receipt, issue, transfers, and physical inventory",
        "Pricing procedures and purchase price determination",
      ],
      conclusion:
        "<strong>By the end of the course</strong>, learners will be able to independently handle procurement and inventory operations in SAP MM.",
      suggested: [
        "SAP S4 HANA FICO- Finance and Controlling",
        "Technical Business Analyst",
        "IAF(Indian And Foreign accounting)",
      ],
    },
    "Financial Data Certification:": {
      title: "Financial Data Certification",
      description:
        "Strong foundation in global financial markets, investment banking concepts, and financial data operations.",
      list: [
        "Investment banking and the global financial system",
        "Equity markets, IPO processes, and stock exchanges",
        "Fixed income securities: bonds, yields, and pricing",
        "Foreign exchange (FX) markets and instruments",
        "Derivatives: forwards, futures, options, and swaps",
        "Financial modelling and valuation using Excel",
      ],
      conclusion:
        "<strong>By the end of the course</strong>, learners will be prepared for roles in investment banking operations and financial analytics.",
      suggested: ["Advanced Excel Specialist", "Power BI & SQL", "Zoho Books:"],
    },
    "Nergy Vidya – Compliance & Accounting": {
      title: "Nergy Vidya",
      description:
        "Practical knowledge in statutory compliance, taxation, and basic accounting for real-world responsibilities.",
      list: [
        "Digital Statutory e-Filing Essentials: ITR, GST, MCA, EPF, and ESIC",
        "GST Compliance: Registration, Filing, and E-Way bills",
        "Accounting for Beginners: Journals, Ledgers, and Financial Statements",
        "Practical Tax Calculations: TDS and TCS computation",
      ],
      conclusion:
        "<strong>By the end of the course</strong>, you will have a clear, practical, and industry-oriented approach to taxation and accounting.",
      suggested: [
        "Tally ERP 9 with GST and Prime",
        "Zoho Books:",
        "Quick Books",
      ],
    },
    "Tally ERP 9 with GST and Prime": {
      title: "Tally ERP 9 with GST and Prime",
      description:
        "Practical foundation in accounting using Tally to manage day-to-day business accounts and taxation.",
      list: [
        "Set up companies and ledgers in Tally",
        "Record transactions and prepare Profit & Loss and Balance Sheet",
        "Manage inventory, purchase and sales processes",
        "Manufacturing activities and batch-wise accounting",
        "Payroll processing and GST transactions",
      ],
      conclusion:
        "<strong>By the end of the course</strong>, you will have hands-on accounting skills aligned with real-world business requirements.",
      suggested: [
        "Nergy Vidya – Compliance & Accounting",
        "Zoho Books:",
        "Quick Books",
      ],
    },
    "Zoho Books:": {
      title: "Zoho Books:",
      description:
        "End-to-end practical training on Zoho Books for cloud-based accounting and GST compliance.",
      list: [
        "Organization setup and user management",
        "GST configuration and Chart of Accounts design",
        "Purchase (P2P) and Sales (Q2C) cycle management",
        "AI-assisted bank reconciliation and online gateways",
        "Direct GST filing from Zoho Books",
      ],
      conclusion:
        "<strong>By the end of the course</strong>, you will master cloud-based accounting and compliance using Zoho Books.",
      suggested: ["Quick Books", "Peachtree/ Sage 50:", "Power BI & SQL"],
    },
    "Quick Books": {
      title: "Quick Books",
      description:
        "Practical training in QuickBooks to manage taxation, payroll, banking, and financial reporting.",
      list: [
        "Company configuration and opening balances",
        "Vendor profiles and accounts payable management",
        "Customer invoicing and accounts receivable",
        "Bank reconciliation and cash flow analysis",
        "Sales tax configuration and payments",
      ],
      conclusion:
        "<strong>By the end of the course</strong>, you will gain job-ready skills in computerized accounting using QuickBooks.",
      suggested: [
        "Zoho Books:",
        "Peachtree/ Sage 50:",
        "Financial Data Certification:",
      ],
    },
    "Peachtree/ Sage 50:": {
      title: "Peachtree/ Sage 50:",
      description:
        "Hands-on training in Peachtree for accurate business accounting and compliance-ready reporting.",
      list: [
        "Software interface and company data flow",
        "Vendors, customers, and bank management",
        "Financial reporting and export to Excel",
        "Sales tax and payroll operations",
        "Job-based billing and project tracking",
      ],
      conclusion:
        "<strong>By the end of the course</strong>, you will have practical skills in computerized accounting using Peachtree.",
      suggested: [
        "Quick Books",
        "Zoho Books:",
        "Tally ERP 9 with GST and Prime",
      ],
    },
    "IAF(Indian And Foreign accounting)": {
      title: "IAF(Indian And Foreign accounting)",
      description:
        "Comprehensive, job-oriented course designed to build foundations in manual and computerized accounting.",
      list: [
        "Core accounting principles and financial statement preparation",
        "Tally workflow: inventory, GST, TDS, and statutory reports",
        "QuickBooks and Peachtree for international accounting",
        "Payroll processing and statutory compliance",
        "Real-time accounting projects with practical scenarios",
      ],
      conclusion:
        "<strong>By the end of the course</strong>, you will build a strong career in accounting with exposure to multiple software platforms.",
      suggested: [
        "Tally ERP 9 with GST and Prime",
        "Zoho Books:",
        "Quick Books",
      ],
    },
    "GCC VAT": {
      title: "GCC VAT",
      description:
        "Practical knowledge of Tally with focus on GCC VAT compliance for Gulf countries.",
      list: [
        "Accounting fundamentals and Tally navigation",
        "Company creation and ledger management",
        "Inventory vouchers and purchase/sales management",
        "GCC VAT setup and compliance transactions",
        "Payroll and Bank Reconciliation (BRS)",
      ],
      conclusion:
        "<strong>By the end of the course</strong>, you will be prepared for VAT-compliant accounting roles in GCC countries.",
      suggested: [
        "Tally ERP 9 with GST and Prime",
        "Financial Data Certification:",
        "IAF(Indian And Foreign accounting)",
      ],
    },
    "Power BI & SQL": {
      title: "Power BI & SQL",
      description:
        "Master the art of data storytelling and database management. This course combines the power of SQL for data extraction with Power BI for creating high-impact business intelligence dashboards.",
      list: [
        "SQL Fundamentals: DDL, DML, and DCL commands",
        "Advanced SQL: Joins, Subqueries, and CTEs",
        "Data Cleaning and Transformation using Power Query",
        "DAX (Data Analysis Expressions) for complex calculations",
        "Designing Interactive Dashboards and Reports",
        "Publishing and Sharing insights in the Power BI Service",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will be able to transform raw business data into actionable visual insights using the industry's most popular BI stack.",
      suggested: [
        "Data Analytics Essentials: Python, SQL, Excel, and Power BI",
        "Technical Business Analyst",
        "Data Analysis and Visualization with SQL, Excel and Power BI",
      ],
    },
    "Cloud Computing Essentials": {
      title: "Cloud Computing Essentials",
      description:
        "An introductory guide to the world of cloud technology. Understand how the modern internet works and how businesses leverage AWS, Azure, and Google Cloud for scalability and efficiency.",
      list: [
        "Cloud Fundamentals: IaaS, PaaS, and SaaS models",
        "Introduction to Virtualization and Global Infrastructure",
        "Storage Solutions: Object storage vs. Block storage",
        "Cloud Security: Identity and Access Management (IAM)",
        "Scaling and Load Balancing basics",
        "Cost Management and Cloud Economics",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will have a solid grasp of cloud concepts, preparing you for foundational certifications and modern IT roles.",
      suggested: [
        "DevOps Engineering",
        "Full Stack Web Development",
        "Technical Business Analyst",
      ],
    },
    // GENERIC COURSES Content (As per Latest Update)
    "MOS-Microsoft Office Specialist": {
      title: "MOS-Microsoft Office Specialist",
      description:
        "Master the essential Microsoft Office applications used in every professional workplace. This course provides comprehensive training to make you a power user of Word, Excel, and PowerPoint.",
      list: [
        "Advanced Microsoft Word: Professional document formatting and automation",
        "Microsoft Excel: Complex formulas, data visualization, and pivot tables",
        "Microsoft PowerPoint: Creating high-impact business presentations",
        "Outlook & Outlook Calendar: Efficient communication and scheduling",
        "Microsoft Teams: Collaboration and project coordination in the cloud",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will be a certified expert in Microsoft Office, ready to boost productivity and efficiency in any corporate or professional environment.",
      suggested: [
        "Tally ERP 9 with GST and Prime",
        "Technical Business Analyst",
        "PowerBi",
      ],
    },
    PowerBi: {
      title: "PowerBi",
      description:
        "Unlock the power of your data with PowerBi. Learn how to connect to various data sources, transform raw data into meaningful insights, and create stunning interactive dashboards.",
      list: [
        "Introduction to Business Intelligence and PowerBi Desktop",
        "Data Transformation and Cleaning with Power Query",
        "Data Modeling: Relationships and Schema design",
        "DAX Fundamentals: Writing measures and calculated columns",
        "Report Design: Creating interactive charts, maps, and slicers",
        "PowerBi Service: Publishing and sharing dashboards securely",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will be able to build professional-grade dashboards that drive data-driven decision making and provide clear business insights.",
      suggested: [
        "SQL(Structured Query Language)",
        "Data Analytics Essentials: Python, SQL, Excel, and Power BI",
        "MOS-Microsoft Office Specialist",
      ],
    },
    "Prompt Engineering": {
      title: "Prompt Engineering",
      description:
        "Master the art of communicating with Artificial Intelligence. This course teaches you how to craft precise prompts to get the highest quality output from AI models like ChatGPT, Claude, and others.",
      list: [
        "Fundamentals of Generative AI and Large Language Models (LLMs)",
        "The Anatomy of a Perfect Prompt: Context, Task, and Constraints",
        "Advanced Techniques: Chain-of-Thought, Zero-Shot, and Few-Shot prompting",
        "AI for Productivity: Automating writing, research, and analysis",
        "Creative AI: Mastering image generation and design prompts",
        "Ethics and Best Practices in the AI Era",
      ],
      conclusion:
        "<strong>By the end of this course</strong>, you will be an expert AI orchestrator, capable of significantly increasing your productivity using state-of-the-art AI tools.",
      suggested: [
        "Python Essentials for Data Analysis",
        "Full Stack Web Development",
        "PowerBi",
      ],
    },
  };

  window.openCourseCurriculum = function (courseName, categoryTitle) {
    const modal = document.getElementById("courseCurriculumModal");
    const content = document.getElementById("curriculumContent");
    const data = curriculumData[courseName];

    // Close any previous modal
    document.getElementById("courseDetailsModal").style.display = "none";

    if (!data) {
      // Fallback for missing data
      content.innerHTML = `
        <div class="breadcrumbs">Home / Courses / ${categoryTitle} / ${courseName}</div>
        <div class="curriculum-header">
          <h1>${courseName}</h1>
          <div class="details-divider"></div>
        </div>
        <div class="curriculum-body">
          <p style="text-align: center;">Curriculum details are currently being updated for this professional module. Please contact us for the full syllabus.</p>
          <div style="text-align: center; margin-top: 30px;">
             <a href="#contact" class="btn btn-primary" onclick="closeCurriculumModal()">Contact for Syllabus</a>
          </div>
        </div>
      `;
    } else {
      let listHtml = "";
      data.list.forEach((item) => {
        listHtml += `<li>${item}</li>`;
      });

      let suggestedHtml = "";
      data.suggested.forEach((s) => {
        suggestedHtml += `
          <div class="suggested-card" onclick="openCourseCurriculum('${s}', '${categoryTitle}')" style="cursor: pointer;">
            <h4>${s}</h4>
          </div>
        `;
      });

      content.innerHTML = `
        <div class="breadcrumbs">
          Home / Courses / ${categoryTitle} / ${courseName}
        </div>
        <div class="curriculum-header" style="text-align: center;">
          <h1 style="text-transform: uppercase; font-size: 42px; letter-spacing: 2px;">${data.title}</h1>
          <div class="details-divider" style="margin: 20px auto;"></div>
        </div>
        <div class="curriculum-body">
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px;">${data.description}</p>
          <h3 style="font-size: 28px; margin-bottom: 20px;">What You Will Learn</h3>
          <ul class="curriculum-list" style="margin-bottom: 30px;">
            ${listHtml}
          </ul>
          <p style="font-size: 18px; line-height: 1.6;">${data.conclusion}</p>
          
          <div class="curriculum-social" style="text-align: right; margin: 40px 0;">
            <i class="fab fa-facebook-f" style="margin-left: 15px; cursor: pointer;"></i>
            <i class="fab fa-x-twitter" style="margin-left: 15px; cursor: pointer;"></i>
            <i class="fab fa-pinterest-p" style="margin-left: 15px; cursor: pointer;"></i>
          </div>

          <div class="suggested-courses">
            ${suggestedHtml}
          </div>
        </div>
      `;
    }

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  };

  window.closeCurriculumModal = function () {
    const modal = document.getElementById("courseCurriculumModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  // 8. Testimonial Slider Logic
  let currentTestimonialIndex = 0;
  const testimonials = document.querySelectorAll(".testimonial-focused");

  window.moveSlider = function (direction) {
    // Hide current
    testimonials[currentTestimonialIndex].style.display = "none";
    testimonials[currentTestimonialIndex].classList.remove("active");

    // Calculate next index
    currentTestimonialIndex += direction;
    if (currentTestimonialIndex >= testimonials.length) {
      currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
      currentTestimonialIndex = testimonials.length - 1;
    }

    // Show next
    testimonials[currentTestimonialIndex].style.display = "block";
    // Small delay to trigger animation
    setTimeout(() => {
      testimonials[currentTestimonialIndex].classList.add("active");
    }, 10);
  };
  // 9. Browser Back Button Modal Handling
  // Helper to check if any modal is open
  function isAnyModalOpen() {
    const modals = [
      document.getElementById("courseDetailsModal"),
      document.getElementById("courseCurriculumModal"),
      document.getElementById("imageModal"),
      document.querySelector(".nav-container"),
    ];
    return modals.some(
      (m) =>
        m && (m.style.display === "block" || m.classList.contains("active")),
    );
  }

  // Unified close function
  window.closeAllModals = function () {
    // 1. Close Modals
    if (window.closeDetailsModal) window.closeDetailsModal();
    if (window.closeCurriculumModal) window.closeCurriculumModal();
    if (window.closeModal) window.closeModal();

    // 2. Close Mobile Menu
    const navContainer = document.querySelector(".nav-container");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    if (navContainer && navContainer.classList.contains("active")) {
      navContainer.classList.remove("active");
      document.body.classList.remove("menu-open");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }

    document.body.style.overflow = "auto"; // Global restore
  };

  // Listen for back button
  window.addEventListener("popstate", (event) => {
    if (isAnyModalOpen()) {
      window.closeAllModals();
    }
  });

  // Updated Open Functions to push history state
  const originalOpenDetails = window.openCourseDetails;
  window.openCourseDetails = function (category) {
    history.pushState({ modal: "details" }, "");
    originalOpenDetails(category);
  };

  const originalOpenCurriculum = window.openCourseCurriculum;
  window.openCourseCurriculum = function (courseName, categoryTitle) {
    // If opening from details, we don't necessarily need another pushState
    // depending on if we want "back" to go to details or home.
    // For now, let's keep it simple: one state for "some modal is open".
    if (!isAnyModalOpen()) {
      history.pushState({ modal: "curriculum" }, "");
    }
    originalOpenCurriculum(courseName, categoryTitle);
  };

  const originalOpenImage = window.openModal;
  window.openModal = function (src) {
    history.pushState({ modal: "image" }, "");
    originalOpenImage(src);
  };

  // Handle mobile menu history state
  mobileMenuBtn.addEventListener("click", () => {
    if (!navContainer.classList.contains("active")) {
      history.pushState({ modal: "menu" }, "");
    } else {
      // If closing manually, we could theoretically go back in history,
      // but toggle logic usually handles this.
    }
  });
});
