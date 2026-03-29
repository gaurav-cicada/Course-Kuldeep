/* Interactivity for Accountables Educational Training Institution */

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
        "Tally Prime with GST",
        "SAP S4 HANA",
        "GCC VAT",
        "IAF(Indian And Foreign accounting)",
        "Quick Books",
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
        "Power BI & SQL",
        "Data Analysis and Visualization with SQL, Excel and Power BI",
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
        "Power BI & SQL",
        "Technical Business Analyst",
        "MOS-Microsoft Office Specialist",
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
        "JAVA Programming",
        "SQL(Structured Query Language)",
        "Data Analytics Essentials: Python, SQL, Excel, and Power BI",
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
    "SAP S4 HANA": {
      title: "SAP S4 HANA",
      isCategory: true,
      description:
        "Our SAP S4 HANA programs are designed to cater to different functional areas, preparing students with end-to-end implementation and end user processes.",
      subCourses: [
        "FICO Finance and Controlling",
        "M M Material Management",
        "P P Production Planning with end user process",
        "S D Sales and Distribution With end user process",
      ],
      suggested: [],
    },
    "P P Production Planning with end user process": {
      title: "P P Production Planning with end user process",
      description:
        "The course will prepare students to understand all the necessary end-to-end implementation steps to configure SAP S/4HANA Production Planning with End-User processes. After this course, students will be able to identify and analyze business requirements for Record to Report process cycles and configure SAP S/4HANA PP accordingly.<br><br>Learners will be able to work both as a Consultant and End-User, and can also take the SAP S/4HANA PP certification exam. The course is perfect for absolute beginners; having basic Manufacturing or Production Planning knowledge is helpful.<br><br><strong>Key Highlights:</strong><br>Configuration & Implementation for SAP S/4HANA PP, Hands-on experience, Integration of PP with MM, SD & Finance, BP & Linkages to Customer/Vendor Master, SAP PP Closing Cockpit, Universal Journal (ACDOCA), and SAP FIORI S/4HANA PP Apps.",
      list: [
        "<strong>Module 1: Introduction to S4HANA</strong><ul><li>S4HANA overview</li><li>HANA architecture and deployment</li><li>S4HANA History releases</li></ul>",
        "<strong>Module 2: Introduction to SAP Activate Methodology</strong><ul><li>System Conversion</li><li>Landscape transformation</li><li>New implementation</li></ul>",
        "<strong>Module 3: Organization Structure</strong><ul><li>Client, Company Code, Plant</li><li>Storage Location, Sales Organisation</li><li>Distribution Channel, Division</li></ul>",
        "<strong>Module 4: Master Data</strong><ul><li>Material Master</li><li>Workcenter</li><li>Routing</li><li>Production Version</li><li>Bill of Material</li></ul>",
        "<strong>Module 5: Production Planning</strong><ul><li>MRP Planning</li><li>MPS Planning</li><li>REORDER TYPE PLANNING</li><li>Consumption Base Planning</li></ul>",
        "<strong>Module 6: Production Execution</strong><ul><li>Make to Stock (production strategy)</li><li>Make to order (Production Strategy)</li><li>Production execution for process industries</li><li>Batch Management</li><li>Variant Configuration</li></ul>",
        "<strong>Module 7: Good Movement</strong><ul><li>Automatic good movement</li><li>Manual goods movement</li><li>Back flushing</li></ul>",
        "<strong>Module 8: Production Order Creation</strong><ul><li>Creation of Production Order</li><li>Release of Production Order</li><li>Production Version selection</li></ul>",
        "<strong>Module 9: Production Confirmation</strong><ul><li>Time Ticket Confirmation</li><li>Repetitive Back flushing</li><li>Collective confirmation at header level</li><li>Milestone confirmation</li><li>Progressive Confirmation</li></ul>",
        "<strong>Module 10: Product Costing</strong><ul><li>Product Cost Collector</li><li>Production Order Costing</li><li>Target Cost, Planned Cost</li><li>Difference Between Planned & Actual</li><li>Repetitive Manufacturing profile</li></ul>",
        "<strong>Module 11: Repetitive Manufacturing</strong><ul><li>Back flushing</li><li>All backend configuration</li></ul>",
        "<strong>Module 12: Configuration PP Module</strong><ul><li>Configuration PP Module</li></ul>",
        "<strong>Module 13: Reports</strong><ul><li>SAP PP Reports</li></ul>",
        "<strong>Module 14: Advanced Topics</strong><ul><li>Complete Table Understanding</li><li>Transport Request and movement of TR</li></ul>",
        "<strong>Module 15: Integration of PP with other Modules</strong><ul><li>Integration with Finance</li><li>Integration with SD</li><li>Integration with MM</li><li>Procurement Process</li><li>Integration with Controlling</li></ul>",
        "<strong>Module 16: Real Time Scenarios</strong><ul><li>Project Preparation</li><li>Resolving tickets</li><li>LSMW</li><li>Implementation overview</li><li>Support and maintenance process</li></ul>",
      ],
      conclusion:
        "<strong>Key Benefits of the Training:</strong><br>• Our complete training is constructed as per current industry standards.<br>• Live Project & Industrial Based Training.<br>• Led by Certified Expert & Competent Trainers.<br>• Easy to understand study material with Smart Labs access.<br>• Globally Recognized Course Completion Certificate.<br>• Personality Development, Resume Prep, and Interview Preparation classes.<br>• Dedicated training & placement assistance.",
      suggested: [],
    },
    "S D Sales and Distribution With end user process": {
      title: "S D Sales and Distribution With end user process",
      description:
        "The course will prepare the students to learn and understand all the necessary end-to-end implementation steps to configure SAP S/4HANA Sales & Distribution with End-User processes for any organization. After this course, the students will be able to identify and analyze the business requirements of any organization for Record to Report process cycle and to configure SAP S/4HANA SD accordingly.<br><br>After doing this course, the Learners will be able to work both as a Consultant and End-User and can also take SAP S/4HANA SD certification exam. The course is perfect for absolute beginners; having basic sales & distribution (O2C) knowledge is helpful.<br><br><strong>Key Highlights:</strong><br>Configuration & Implementation for SAP S/4HANA Sales & Distribution, Hands-on experience, Integration of SAP S/4HANA SD with MM & Finance, Business Partners and linkage with Customer/Vendor Master, SAP SD Closing Cockpit, Universal Journal (ACDOCA), and SAP FIORI S/4HANA SD Apps.",
      list: [
        "<strong>Module 1: Introduction to S4HANA</strong><ul><li>S4HANA overview</li><li>HANA architecture and deployment</li><li>S4HANA History releases</li></ul>",
        "<strong>Module 2: Introduction to SAP Activate Methodology</strong><ul><li>System Conversion</li><li>Landscape transformation</li><li>New implementation</li></ul>",
        "<strong>Module 3: Organization Structure</strong><ul><li>Define SD Organization structure</li><li>Assign SD organization structure</li></ul>",
        "<strong>Module 4: Key Innovations</strong><ul><li>Business Partner</li><li>Order Management Billing</li><li>Credit Management</li><li>Inventory Management</li><li>Material Requirement Planning</li><li>Architectural Changes/Configurations related to Sales</li></ul>",
        "<strong>Module 5: Business Partners</strong><ul><li>Introduction to Business Partners</li><li>Maintaining Business Partners</li><li>BP Relationships, BP tables</li><li>Customizing BP roles</li><li>Customer Vendor Integration</li></ul>",
        "<strong>Module 6: Overview of Sales & Distribution</strong><ul><li>Organizational structures</li><li>Sales and distribution aspect</li><li>Materials management aspect</li></ul>",
        "<strong>Module 7: Master Data</strong><ul><li>Working with Business Partners</li><li>Working with Material Master Record</li><li>Customer Account groups</li><li>Working with Customer Info Records</li></ul>",
        "<strong>Module 8: Pre-Sales Activity</strong><ul><li>Inquiries, Quotations</li></ul>",
        "<strong>Module 9: Creating, Processing and Controlling</strong><ul><li>Item Categories Determination</li><li>Schedule lines Categories Determination</li><li>Copy Control</li><li>Log of incomplete items</li><li>Creation of sales order with reference</li></ul>",
        "<strong>Module 10: Pricing</strong><ul><li>Condition Technique, Condition Type, Access Sequence</li><li>Condition Record, Condition Table</li><li>Price determination</li><li>Definition and maintenance of prices, surcharges, and discounts</li></ul>",
        "<strong>Module 11: Fast Material Entry in Sales order</strong><ul><li>Product Proposals</li><li>Material Listing and exclusion</li><li>Material Determination</li><li>Free goods</li></ul>",
        "<strong>Module 12: Sales Order Types</strong><ul><li>Rush order</li><li>Cash Sales</li><li>Free of charge deliveries</li></ul>",
        "<strong>Module 13: Outline Agreements</strong><ul><li>Contracts</li><li>Scheduling agreements</li></ul>",
        "<strong>Module 14: ATP (Availability to Promise)</strong><ul><li>SAP ATP Overview, Purpose, Types, Scope</li><li>Availability Check – Sales Order, Control, Configuration, Prerequisites</li><li>Master Data Preparation</li><li>Availability Check – Order Processing, Delivery Processing</li></ul>",
        "<strong>Module 15: Partner Determination</strong><ul><li>Define Partner Function</li><li>Create Partner Determination</li><li>Assign Partner Determination</li></ul>",
        "<strong>Module 16: Special Business Processes</strong><ul><li>Consignments</li><li>Bill of material</li></ul>",
        "<strong>Module 17: Shipping</strong><ul><li>Overview of shipping</li><li>Shipping point and route determination</li><li>Creating and controlling outbound delivery, Delivery processing</li><li>Picking, Picking conformation</li><li>Goods issue</li></ul>",
        "<strong>Module 18: Billing</strong><ul><li>Billing document types</li><li>Creation of billing documents</li><li>Overview of billing methods, Billing plan</li><li>Revenue account determination</li><li>Posting billing document to Accounts</li></ul>",
        "<strong>Module 19: Credit Management</strong><ul><li>Purpose of Credit Management</li><li>Types of Credit Management</li><li>Configuration</li></ul>",
        "<strong>Module 20: Other Topics</strong><ul><li>Text determination</li><li>Output determination</li></ul>",
        "<strong>Module 21: Business Process</strong><ul><li>Normal Sales, Return Sales, Third Party Sales</li><li>Free Goods, Text Item</li><li>Consignment fill & issue, Consignment pick & return</li><li>Sales using sales BOM</li></ul>",
        "<strong>Module 22: Integration of SD with other Modules</strong><ul><li>Integration with Finance, Production, MM, Controlling</li><li>Procurement Process</li></ul>",
        "<strong>Module 23: Real Time Scenarios</strong><ul><li>Project Preparation</li><li>Resolving tickets</li><li>LSMW</li><li>Implementation overview</li><li>Support and maintenance process</li></ul>",
      ],
      conclusion:
        "<strong>Key Benefits of the Training:</strong><br>• Our complete training is constructed as per current industry standards.<br>• Live Project & Industrial Based Training.<br>• Led by Certified Expert & Competent Trainers.<br>• Easy to understand study material with Smart Labs access.<br>• Globally Recognized Course Completion Certificate.<br>• Personality Development, Resume Prep, and Interview Preparation classes.<br>• Dedicated training & placement assistance.",
      suggested: [],
    },
    "FICO Finance and Controlling": {
      title: "FICO Finance and Controlling",
      description:
        "The course will prepare students to understand all the necessary end-to-end implementation steps to configure SAP S/4HANA Finance and Controlling 1909 with End-User processes. After this course, students will be able to identify and analyze business requirements for Record to Report process cycles and configure SAP S/4HANA FICO accordingly.<br><br>Learners will be able to work both as a Consultant and End-User, and can also take the SAP S/4HANA Finance 1909 certification exam (C_TS4FI_1909).",
      list: [
        "<strong>Module 1: Introduction to SAP S/4HANA, Finance, SAP Activate & Universal Journal</strong><ul><li>Introduction to SAP S/4HANA and Finance Module</li><li>Enterprise Structure & ERP R/3 Structure</li><li>ASAP Methodology & Role of a Functional Consultant</li><li>Core Functional Modules Overview & Integration in SAP</li></ul>",
        "<strong>Module 2: Enterprise Structure in SAP S/4HANA, Projects Types & Documentation</strong><ul><li>Business Scenario & Enterprise Structure - Definition of Client</li><li>Creation of Company Code and Business Areas</li><li>Define Company and Assignment of Company code to Company</li><li>Customizing Requests Transport Organizer</li></ul>",
        "<strong>Module 3: Fiscal Year Variant and Posting Period Variant</strong><ul><li>Business Scenario & Variant Principle</li><li>Fiscal Year Variant (Calendar and Non-Calendar)</li></ul>",
        "<strong>Module 4: General Ledger Accounts & Document Splitting Configuration</strong><ul><li>Business Scenario, Chart of Accounts, G/L Account Groups</li><li>Number Ranges, Field Status & Retained Earnings Account</li><li>G/L Master Data Creation, Expense & Revenue Account Creation</li><li>Reconciliation Account Creation</li></ul>",
        "<strong>Module 5: Controlling Area, Profit Center, Cost Center & Elements</strong><ul><li>Maintain Controlling Area and Version 0</li><li>Profit/Cost Center Accounting and Master Data</li><li>Default Account Assignment for Cost and Profit Centers</li></ul>",
        "<strong>Module 6: Currency Types, Ledgers and Accounting Principles</strong><ul><li>Currency Types and Conversion Settings</li><li>Exchanges Rates, Leading Ledger 0L, Parallel Accounting G/L</li></ul>",
        "<strong>Module 7: Integration of Controlling with Financial Accounting</strong><ul><li>Configuration of Integration of Controlling with Financial Accounting</li></ul>",
        "<strong>Module 8: Business Partner, Customer and Vendor Master Data (A/R and A/P)</strong><ul><li>Introduction to Business Partner, Customer and Vendor Master Data</li><li>Customer/Vendor Account Groups and Number Ranges</li><li>Define Number Assignment for Direction BP to Customer/Vendor</li><li>Creation of Business Partner Master Data & One-time Master Data</li><li>Customer as Vendor and Vendor as Customer Clearing</li></ul>",
        "<strong>Module 9: Bank Master Data and House Bank</strong><ul><li>Manage House Bank and Bank Master</li><li>SAP Business Client - Maintain link between House Bank and G/L</li></ul>",
        "<strong>Module 10: Documents and Document Controls in SAP S/4HANA Finance</strong><ul><li>Documents in SAP S/4HANA Finance</li><li>Document Types, Number Ranges, Posting Keys, Default Values</li></ul>",
        "<strong>Module 11: Taxes on Sales/Purchases - A/R & A/P</strong><ul><li>Basic Settings - Tax Calculation Procedure</li><li>Calculation - Tax Codes and Base Amount</li><li>Define Input and Output Taxes G/L Accounts & Document Splitting</li><li>Document Entry with Tax Code</li></ul>",
        "<strong>Module 12: Tolerance Limits for Employees, G/L & Customer/Vendor</strong><ul><li>Tolerance Groups for Employees, G/L Accounts, Customer/Vendor</li><li>Document Entry with Tolerance Limits</li></ul>",
        "<strong>Module 13: Currencies, Exchange Rates and Exchange Rate Differences</strong><ul><li>Currencies and Exchange Rates through SAP NetWeaver</li><li>Exchange Rate Tools, Reference Currency Tool</li><li>Define Translation Ratios and Enter Exchange Rates</li><li>Exchange Rate Differences for Open Item Clearing & G/L Accounts</li><li>Overview for Foreign Currency Valuation as Periodic Processing</li></ul>",
        "<strong>Module 14: Holding and Parking Documents in SAP S/4HANA Finance</strong><ul><li>Holding and Parking Documents for G/L, A/R, A/P</li></ul>",
        "<strong>Module 15: Documents Posting, Display Line Items & Prima Nota</strong><ul><li>G/L, Customer, and Vendor Invoice Posting and Balances</li><li>Posting of the invoice with document splitting</li><li>SAP Fiori Document Posting and Universal Journal (ACDOCA)</li><li>Prima Nota</li></ul>",
        "<strong>Module 16: Reference Documents and Recurring Model</strong><ul><li>Recurring Document and Periodic Processing</li></ul>",
        "<strong>Module 17: Payment Terms and Cash Discounts - A/R & A/P</strong><ul><li>Payment Terms Setup</li><li>Customer/Vendor Invoice Posting With/Without Terms of Payment</li><li>Define Cash Discount G/L Accounts</li></ul>",
        "<strong>Module 18: Documents Clearing for General Ledger, Customer and Vendor</strong><ul><li>Account Clearing for G/L, Customer (A/R), Vendor (A/P)</li><li>Post With Clearing, Partial and Residual Payments</li><li>Post Exchange Rate Differences for Foreign Customer Payment</li></ul>",
        "<strong>Module 19: Automatic Payment Program</strong><ul><li>Automatic Payment Program Configuration and Execution</li><li>Update Customers and Vendors for APP</li><li>Debit Balance Check, Printout and Scheduled Payment Run</li></ul>",
        "<strong>Module 20: Special G/L Transactions (Down Payment Received and Made)</strong><ul><li>G/L Creation, Vendor Down Payment Configuration and Execution</li><li>Other Special G/L Indicators for Customer/Vendor Invoices</li></ul>",
        "<strong>Module 21: Document Reversal Posting and Reset Cleared Items</strong><ul><li>Normal Reversal Posting</li><li>Reset Cleared Items Execution</li><li>Reset Clearing Document with Exchange Rate Differences</li></ul>",
        "<strong>Module 22: Bank Accounting - Cash Journal and Bank Reconciliation</strong><ul><li>Cash Journal Configuration and Execution</li><li>Manual Bank Reconciliation Configuration and Execution</li></ul>",
        "<strong>Module 23: Automatic Dunning - A/R and A/P</strong><ul><li>Define Dunning Procedure</li><li>Update Customers and Vendors with Dunning Procedure</li><li>Check Overdue Items and Automatic Dunning Execution</li></ul>",
        "<strong>Module 24: Correspondence - A/R and A/P</strong><ul><li>Individual Correspondence</li><li>Account Statements - Correspondence</li></ul>",
        "<strong>Module 25: Financial Statement Version for Balance Sheet and P&L</strong><ul><li>Financial Statement Version Hierarchy Levels</li><li>Assign G/L Accounts to FSV</li><li>SAP S/4HANA Finance - Information System</li></ul>",
        "<strong>Module 26: New Asset Accounting in SAP S/4HANA Finance (Configuration)</strong><ul><li>Activate New Asset Accounting and Chart of Depreciation</li><li>Depreciation Areas, Asset Classes, Account Determination</li><li>Integration between New Asset Accounting and G/L Accounting</li><li>Determine Depreciation Areas, Transaction types for Acquisitions</li></ul>",
        "<strong>Module 27: New Asset Accounting in SAP S/4HANA Finance (End-User)</strong><ul><li>Creation of Asset Master Record & Asset Explorer</li><li>Asset Acquisitions, Retirements, and Revaluation</li><li>Execute Depreciation Run & Year-End Closing</li></ul>",
        "<strong>Module 28: Integration of SAP S/4HANA FICO with MM</strong><ul><li>Enterprise Structure and MM Hierarchy</li><li>Material Master Data, Valuation Class, Procurement to Payment Cycle</li><li>Asset Acquistion and Posting into Cost Center with MM</li></ul>",
        "<strong>Module 29: Integration of SAP S/4HANA FICO with Sales & Distribution (SD)</strong><ul><li>SD Enterprise Structure and Customer/Material Master Data</li><li>Define Revenue G/L Accounts, Condition Records</li><li>Order to Cash Cycle and Accounting Documents</li></ul>",
        "<strong>Module 30: Projects And Interviews</strong><ul><li>Covering all the concepts with Project Work</li><li>Resume Preparation & Interview Question Preparation</li></ul>",
      ],
      conclusion:
        "<strong>Key Benefits of the Training:</strong><br>• Our complete training is constructed as per current industry standards.<br>• Live Project & Industrial Based Training.<br>• Led by Certified Expert & Competent Trainers.<br>• Easy to understand study material with Smart Labs access.<br>• Globally Recognized Course Completion Certificate.<br>• Personality Development, Resume Prep, and Interview Preparation classes.<br>• Dedicated training & placement assistance.",
      suggested: [],
    },
    "M M Material Management": {
      title: "M M Material Management",
      duration: "2 to 3 Months (Online / Offline, Flexible batches - Weekday / Weekend)",
      description:
        "<strong>Course Overview:</strong><br>This course provides a strong foundation in SAP S/4HANA and Materials Management (MM), focusing on procurement, inventory management, and supply chain processes. Learn how top companies manage purchasing, vendor management, and stock using SAP — widely used by organizations like Amazon, Wipro, and Capgemini. The training includes real-time scenarios and hands-on SAP practice to make you job-ready.<br><br><strong>Course Objectives:</strong><br>By the end of this course, you will be able to: Understand SAP S/4HANA system basics, Work with procurement lifecycle in SAP, Create and manage purchase orders, Handle inventory and stock management, Work with vendors and material master data, and Perform real-time business transactions.",
      list: [
        "🧾 <strong>Module 1: SAP S/4HANA Fundamentals:</strong> Introduction to ERP & SAP, SAP S/4HANA overview, SAP GUI & Fiori navigation, Organizational structure",
        "📦 <strong>Module 2: Materials Management (MM) Basics:</strong> Introduction to SAP MM, Procurement process overview, Master data (Material Master, Vendor Master)",
        "🛒 <strong>Module 3: Procurement Process:</strong> Purchase Requisition (PR), Request for Quotation (RFQ), Purchase Order (PO), Vendor selection process",
        "📊 <strong>Module 4: Inventory Management:</strong> Goods Receipt (GR), Goods Issue (GI), Stock transfer, Inventory valuation",
        "🧮 <strong>Module 5: Invoice Verification:</strong> Invoice processing, 3-way matching (PO, GR, Invoice), Payment process overview",
        "🔄 <strong>Module 6: Integration:</strong> MM-FI Integration (Finance), MM-SD Integration (Sales), Real-time business scenarios",
        "🧠 <strong>Module 7: Practical Training:</strong> Live SAP server practice, End-to-end procurement cycle, Case studies & projects",
      ],
      conclusion:
        "<strong>👨‍🎓 Who Can Join?</strong><br>B.Com / BBA / MBA Students, Freshers looking for SAP careers, Supply chain & logistics professionals, Warehouse / inventory executives, Anyone interested in ERP systems.<br><br><strong>🛠️ Tools & Access:</strong><br>• SAP S/4HANA System Access<br>• SAP Fiori Interface<br>• Real-time Server Practice<br><br><strong>🎓 Certification:</strong><br>Course Completion Certificate, Guidance for SAP Global Certification (Optional).<br><br><strong>💼 Career Opportunities:</strong><br>SAP MM Consultant, Procurement Executive, Supply Chain Analyst, Inventory Controller, SAP End User (MM).",
      suggested: [],
    },

    "Tally Prime with GST": {
      title: "Tally Prime with GST",
      isCategory: true,
      description:
        "Our Tally Prime programs are designed to cater to different career goals, from basic office accounting to advanced professional certifications.",
      subCourses: [
        "DCA – Diploma in Computer Application",
        "PGDCA – Post Graduate Diploma in Computer Applications",
        "Payroll Management with Tally, EPF & ESI",
        "Gst Return Filing and income Tax Filing Master Course",
      ],
      suggested: [],
    },
    "DCA – Diploma in Computer Application": {
      title: "DCA – Diploma in Computer Application",
      duration: "3 Months",
      fee: "₹5,500",
      description:
        "A comprehensive diploma program focused on core computer skills and computerized accounting with Tally Prime and GST compliance.",
      list: [
        "Computer Fundamentals (MS Windows)",
        "MS Word – Letter Drafting & Formatting",
        "MS Excel (Basic) – Formulas & Simple Reports",
        "MS PowerPoint – Presentation Basics",
        "Basic Accounting Concepts: Journal, Ledger, Trial Balance",
        "Financial Statements: Profit & Loss & Balance Sheet (Basic)",
        "Tally Prime: Company Creation & Ledger Management",
        "Voucher Entries: Sales & Purchase Processes",
        "GST Setup: CGST, SGST, IGST Configuration",
        "GST Invoicing: Basic Overview & Reporting",
      ],
      conclusion:
        "<strong>Career Opportunities:</strong> Accounts Assistant | Billing Executive | Junior Accountant",
      suggested: [],
    },
    "PGDCA – Post Graduate Diploma in Computer Applications": {
      title: "PGDCA – Post Graduate Diploma in Computer Applications",
      duration: "6 – 12 Months",
      fee: "₹9,000",
      description:
        "Advanced post-graduate program covering comprehensive IT skills, programming logic, database management, and professional accounting with Tally Prime.",
      list: [
        "🖥 Computer Fundamentals: Hardware, Software & MS Windows OS",
        "📄 MS Office Professional: Advanced Word, Excel, PowerPoint & Outlook",
        "🌐 Internet & Digital Skills: Online Services, Email & Cloud Tools",
        "💻 Basic Programming Concepts: Introduction to Logic, C / Python basics",
        "🗄 Database Management: Concepts, Introduction to SQL, Data Retrieval",
        "📊 Accounting Software Advantage: Tally Prime Advanced & GST Overview",
      ],
      conclusion:
        "<strong>Suitable For:</strong> Degree Students, Graduates, and IT Beginners. <br><strong>Career Opportunities:</strong> Computer Operator | Office Executive | Data Entry Specialist | MIS Executive | Accounts Assistant",
      suggested: [],
    },
    "Payroll Management with Tally, EPF & ESI": {
      title: "Payroll Management with Tally, EPF & ESI",
      duration: "1 – 2 Months",
      fee: "₹4,500 – ₹6,000",
      description:
        "A comprehensive course focusing on end-to-end payroll processing, statutory compliance, and hands-on implementation in TallyPrime.",
      list: [
        "👨💼 Payroll Fundamentals: Salary Structure, CTC & Net Salary calculation",
        "💰 Salary Components: Basic, HRA, Allowances, Deductions & Bonus",
        "🧾 EPF (Employees Provident Fund): Registration, Contributions & PF Filing",
        "🏥 ESI (Employees State Insurance): Rules, Calculations & Return Filing",
        "💻 Payroll in TallyPrime: Setup, Employee Masters & Payslip Generation",
      ],
      conclusion:
        "<strong>Suitable For:</strong> Accountants, HR Executives, B.Com/MBA Students. <br><strong>Career Opportunities:</strong> Payroll Executive | HR Payroll Officer | Compliance Executive",
      suggested: [],
    },
    "Gst Return Filing and income Tax Filing Master Course": {
      title: "Gst Return Filing and income Tax Filing Master Course",
      duration: "1.5 to 3 Months (Online / Offline, Flexible batch timings available)",
      description:
        "<strong>Course Overview:</strong><br/>This comprehensive course is designed to provide practical knowledge of GST and Income Tax filing. Learn how to handle real-world taxation tasks, file returns, and ensure compliance with current tax laws. Ideal for students, job seekers, accountants, and business owners who want hands-on expertise in taxation.<br/><br/><strong>Course Objectives:</strong><br/>Understand GST structure and taxation system, File GST returns (GSTR-1, GSTR-3B, etc.), Handle input tax credit (ITC), Prepare and file Income Tax returns, Work on real-time client data, and Understand compliance and penalties.",
      list: [
        "🧾 <strong>Module 1: GST Fundamentals:</strong> Introduction to GST, Types of GST (CGST, SGST, IGST), GST registration process, GST portal overview",
        "📊 <strong>Module 2: GST Return Filing:</strong> GSTR-1 (Sales Return), GSTR-3B (Monthly Return), Input Tax Credit (ITC), E-invoicing & E-way bill, GST reconciliation",
        "💼 <strong>Module 3: Practical GST Training:</strong> Live GST portal filing, Real business case studies, Error handling & corrections",
        "💰 <strong>Module 4: Income Tax Basics:</strong> Introduction to Income Tax, Types of taxpayers, Income heads (Salary, Business, etc.), Deductions (80C, 80D, etc.)",
        "📄 <strong>Module 5: Income Tax Return Filing:</strong> ITR forms (ITR-1, ITR-2, ITR-3), Filing returns online, TDS & Form 26AS, Advance tax & self-assessment",
        "🧠 <strong>Module 6: Advanced Practical Training:</strong> Real-time ITR filing, Tax planning strategies, Client handling, Compliance & notices",
      ],
      conclusion:
        "<strong>👨‍🎓 Who Can Join?</strong><br/>B.Com / M.Com / MBA Students, Job seekers in accounting field, Accountants & professionals, Business owners, Anyone interested in taxation.<br/><br/><strong>🛠️ Tools Covered:</strong><br/>• GST Portal (www.gst.gov.in)<br/>• Income Tax Portal (www.incometax.gov.in)<br/>• Tally (optional integration)",
      suggested: [],
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
      suggested: [],
    },
    "IAF(Indian And Foreign accounting)": {
      title: "IAF – Indian & Foreign Accounting Master Course",
      duration: "3 to 6 Months (Online / Offline, Flexible batches available)",
      description:
        "<strong>Course Overview:</strong><br>This course is designed to provide complete knowledge of both Indian Accounting and Foreign (International) Accounting practices. Learn how accounting works in India as well as in global markets like United Arab Emirates, Saudi Arabia, United Kingdom, and United States. This course focuses on practical training, real-time business scenarios, and global accounting standards, making you job-ready for both Indian and international careers.<br><br><strong>Course Objectives:</strong><br>By the end of this course, you will be able to: Understand Indian accounting concepts and taxation, Work with GST, TDS, and Income Tax, Learn foreign accounting practices and VAT systems, Understand international accounting standards (IFRS basics), Handle real-time accounting tasks for global clients, and Prepare financial statements as per global standards.",
      list: [
        "🇮🇳 <strong>Module 1: Indian Accounting Fundamentals:</strong> Basics of Accounting, Journal, Ledger, Trial Balance, Final Accounts, Accounting standards (basic overview)",
        "📊 <strong>Module 2: Indian Taxation:</strong> GST (Goods & Services Tax), Income Tax Filing, TDS concepts, Practical return filing",
        "💻 <strong>Module 3: Accounting Software:</strong> Tally with GST, Excel for accounting, Practical data entry & reporting",
        "🌍 <strong>Module 4: Foreign Accounting Fundamentals:</strong> Introduction to International Accounting, IFRS (Basics), Differences between Indian GAAP & IFRS, Currency & foreign transactions",
        "🧾 <strong>Module 5: GCC & Foreign Taxation:</strong> VAT in GCC countries, VAT return filing, International compliance basics",
        "💼 <strong>Module 6: Practical Training:</strong> Real-time accounting entries, Client-based scenarios, Invoice, billing & reconciliation",
        "🧠 <strong>Module 7: Advanced & Job-Oriented Skills:</strong> Financial statement preparation, MIS Reporting, Bank reconciliation, Client handling & communication",
      ],
      conclusion:
        "<strong>👨‍🎓 Who Can Join?</strong><br>B.Com / M.Com / MBA Students, Job seekers in accounting field, Accountants looking for abroad jobs, Freshers & working professionals, Anyone interested in global accounting.",
      suggested: [],
    },
    "GCC VAT": {
      title: "GCC VAT Master Course – UAE, Saudi & Gulf Taxation Training",
      duration: "1 to 2 Months (Online / Offline, Flexible batches available)",
      description:
        "<strong>Course Overview:</strong><br>This course is designed to provide complete practical knowledge of VAT (Value Added Tax) applicable in GCC countries. Learn how taxation works in countries like United Arab Emirates, Saudi Arabia, Qatar, and Oman. Gain hands-on experience in VAT registration, return filing, compliance, and real-world business scenarios — making you job-ready for Gulf accounting roles.<br><br><strong>Course Objectives:</strong><br>By the end of this course, you will be able to: Understand GCC VAT structure and regulations, Register businesses for VAT in GCC countries, File VAT returns accurately, Handle input/output VAT calculations, Maintain VAT records and compliance, and Work on real-time VAT case studies.",
      list: [
        "🧾 <strong>Module 1: VAT Fundamentals:</strong> Introduction to VAT, VAT in GCC countries, VAT concepts & terminology, Difference between VAT & GST",
        "🌍 <strong>Module 2: GCC VAT Framework:</strong> VAT laws in UAE & Saudi Arabia, Taxable vs exempt supplies, Zero-rated supplies, VAT registration criteria",
        "📊 <strong>Module 3: VAT Calculations:</strong> Input VAT vs Output VAT, VAT payable calculation, Reverse charge mechanism, Adjustments & corrections",
        "📄 <strong>Module 4: VAT Return Filing:</strong> VAT return formats, Filing returns (UAE & Saudi portals), Deadlines & compliance, Penalties & fines",
        "💼 <strong>Module 5: Practical Training:</strong> Real-time VAT return filing, Case studies (trading & service companies), Invoice preparation as per GCC VAT rules",
        "🧠 <strong>Module 6: Advanced Concepts:</strong> VAT audit basics, Record keeping requirements, VAT for imports & exports, Multi-country VAT scenarios",
      ],
      conclusion:
        "<strong>👨‍🎓 Who Can Join?</strong><br>B.Com / M.Com / MBA Students, Accountants & Finance professionals, Job seekers targeting Gulf countries, Business owners dealing with GCC clients, Anyone interested in international taxation.",
      suggested: [],
    },
    "Quick Books": {
      title: "QuickBooks Accounting Master Course",
      duration: "1 to 2 Months (Online / Offline, Flexible batch timings)",
      description:
        "<strong>Course Overview:</strong><br>This course is designed to provide complete hands-on training in QuickBooks, one of the world’s most widely used accounting software developed by Intuit. Learn how to manage business accounts, track income & expenses, generate reports, and handle real-time accounting tasks using QuickBooks. Ideal for students, accountants, freelancers, and business owners who want practical accounting skills.<br><br><strong>Course Objectives:</strong><br>By the end of this course, you will be able to: Understand QuickBooks interface and features, Create and manage company accounts, Record sales, purchases, and expenses, Manage customers and vendors, Generate financial reports, and Handle real-time business transactions.",
      list: [
        "🧾 <strong>Module 1: Introduction to QuickBooks:</strong> Overview of QuickBooks, Types (QuickBooks Online & Desktop), Company setup",
        "📊 <strong>Module 2: Basic Accounting in QuickBooks:</strong> Chart of Accounts, Journal Entries, Invoices & Billing, Expense tracking",
        "💼 <strong>Module 3: Sales & Purchase Management:</strong> Customer management, Vendor management, Purchase orders, Payment tracking",
        "📦 <strong>Module 4: Banking & Reconciliation:</strong> Bank transactions, Bank reconciliation, Online banking integration",
        "📄 <strong>Module 5: Reports & Financial Statements:</strong> Profit & Loss Statement, Balance Sheet, Cash Flow Reports, Custom reports",
        "🌍 <strong>Module 6: Advanced Features:</strong> Multi-currency accounting, Tax setup (basic GST/VAT overview), Payroll basics, Automation features",
        "🧠 <strong>Module 7: Practical Training:</strong> Real-time data entry, Case studies (service & trading business), Live projects",
      ],
      conclusion:
        "<strong>👨‍🎓 Who Can Join?</strong><br>B.Com / M.Com / MBA Students, Accountants & finance professionals, Freelancers & remote workers, Small business owners, Anyone interested in accounting software.",
      suggested: [],
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
        "PowerBi",
        "Technical Business Analyst",
        "Data Analysis and Visualization with SQL, Excel and Power BI",
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

    if (data.isCategory) {
      let subCardsHtml = "";
      data.subCourses.forEach((sub) => {
        subCardsHtml += `
          <div class="sub-course-card" onclick="openCourseCurriculum('${sub}', '${data.title}')" style="cursor: pointer; background: white; margin-bottom: 15px;">
            <h4 style="color: var(--primary-dark-blue);">${sub}</h4>
            <span class="know-more" style="color: #a83232;">View Details ></span>
          </div>
        `;
      });

      content.innerHTML = `
        <div class="breadcrumbs">Home / Courses / ${categoryTitle} / ${courseName}</div>
        <div class="curriculum-header">
          <h1>${data.title}</h1>
          <div class="details-divider"></div>
        </div>
        <div class="curriculum-body">
          <p style="font-size: 18px; margin-bottom: 40px; text-align: center;">${data.description}</p>
          <div class="details-grid">
            ${subCardsHtml}
          </div>
        </div>
      `;
    } else {
      let listHtml = "";
      data.list.forEach((item) => {
        listHtml += `<li>${item}</li>`;
      });

      let metaInfoHtml = "";
      if (data.duration || data.fee) {
        metaInfoHtml = `
          <div class="course-meta-info" style="display: flex; gap: 30px; margin-bottom: 25px; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
            ${data.duration ? `<div><i class="far fa-clock"></i> <strong>Duration:</strong> ${data.duration}</div>` : ""}
            ${data.fee ? `<div><i class="fas fa-tag"></i> <strong>Course Fees:</strong> ${data.fee}</div>` : ""}
          </div>
        `;
      }

      content.innerHTML = `
        <div class="breadcrumbs">
          Home / Courses / ${categoryTitle} / ${courseName}
        </div>
        <div class="curriculum-header" style="text-align: center;">
          <h1 style="text-transform: uppercase; font-size: 42px; letter-spacing: 2px;">${data.title}</h1>
          <div class="details-divider" style="margin: 20px auto;"></div>
          ${metaInfoHtml}
        </div>
        <div class="curriculum-body">
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px;">${data.description}</p>
          <h3 style="font-size: 28px; margin-bottom: 20px;">What You Will Learn</h3>
          <ul class="curriculum-list" style="margin-bottom: 30px;">
            ${listHtml}
          </ul>
          <p style="font-size: 18px; line-height: 1.6;">${data.conclusion}</p>
          
          <div class="curriculum-social" style="text-align: right; margin: 40px 0;">
            <i class="fab fa-x-twitter" style="margin-left: 15px; cursor: pointer;"></i>
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
  window.closeAllModals = function (shouldPopHistory = false) {
    const detailsModal = document.getElementById("courseDetailsModal");
    const curriculumModal = document.getElementById("courseCurriculumModal");
    const imageModal = document.getElementById("imageModal");

    // Close Modals
    if (detailsModal) detailsModal.style.display = "none";
    if (curriculumModal) curriculumModal.style.display = "none";
    if (imageModal) imageModal.style.display = "none";

    // Close Mobile Menu
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

    document.body.style.overflow = "auto";
  };

  // Listen for back button
  window.addEventListener("popstate", (event) => {
    const state = event.state;

    // First, close whatever is currently open without any side effects
    window.closeAllModals();

    if (state) {
      // Re-open the specific modal based on the history state
      if (state.modal === "details") {
        window.openCourseDetails(state.category, true);
      } else if (state.modal === "curriculum") {
        window.openCourseCurriculum(
          state.courseName,
          state.categoryTitle,
          true,
        );
      } else if (state.modal === "image") {
        window.openModal(state.src, true);
      } else if (state.modal === "menu") {
        navContainer.classList.add("active");
        document.body.classList.add("menu-open");
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        }
      }
    }
  });

  // Updated Open Functions to push history state
  const internalOpenDetails = window.openCourseDetails;
  window.openCourseDetails = function (category, isBackAction = false) {
    if (!isBackAction) {
      history.pushState({ modal: "details", category: category }, "");
    }
    internalOpenDetails(category);
  };

  const internalOpenCurriculum = window.openCourseCurriculum;
  window.openCourseCurriculum = function (
    courseName,
    categoryTitle,
    isBackAction = false,
  ) {
    if (!isBackAction) {
      history.pushState(
        {
          modal: "curriculum",
          courseName: courseName,
          categoryTitle: categoryTitle,
        },
        "",
      );
    }
    internalOpenCurriculum(courseName, categoryTitle);
  };

  const internalOpenImage = window.openModal;
  window.openModal = function (src, isBackAction = false) {
    if (!isBackAction) {
      history.pushState({ modal: "image", src: src }, "");
    }
    internalOpenImage(src);
  };

  // Handle mobile menu history state
  mobileMenuBtn.addEventListener("click", (e) => {
    // Check if we are OPENING the menu
    if (!navContainer.classList.contains("active")) {
      // The toggle logic in step 1 will run AFTER this or at the same time
      // But we check current state: if not active, it's about to be.
      // Wait a tiny bit to let the toggle finish or just push
      history.pushState({ modal: "menu" }, "");
    } else {
      // If closing manually, we don't necessarily go back in history here
      // But if user clicks 'X', we might want to pop.
      // Simplified: let popstate handle browser back.
    }
  });
});
