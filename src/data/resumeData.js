export const resumeData = {
  personal: {
    name: "CERYL TEJAS CHUKKA",
    title: "Data Engineer",
    experience: "4+ Years",
    location: "Denver, CO",
    relocation: "Open to Relocate",
    phone: "+1 (983) 218-2852",
    email: "ceryl.chukka@applywizard.ai",
    portfolio: "Portfolio",
    summary: `Data Engineer with 4+ years of experience building reliable data pipelines, warehouse models, and reporting datasets across network operations, banking, recruitment analytics, and business reporting environments. Experienced in turning raw logs, KPI feeds, customer records, transaction data, and operational inputs into clean, structured datasets for reporting, SLA tracking, and business decision-making. Works closely with operations, analytics, and business teams to strengthen data quality, query performance, and visibility into key performance trends. Completed an M.S. in Information Systems from the University of Colorado Denver, with a strong foundation in database management, data warehousing, business intelligence, and systems analysis.`
  },

  keyMetrics: [
    { value: "+25%", label: "Query Performance Boost", desc: "Tuned partitioned SQL transformations with indexing, CTEs, & window functions (Google / Star Tech)" },
    { value: "+22%", label: "Dashboard Refresh Gain", desc: "Tuned SQL joins, filters, & batch processing logic for financial operations (Truist Bank)" },
    { value: "-18%", label: "Query Scan Reduction", desc: "Organized AWS S3 partitions by business unit, source, and load date (Truist Bank)" },
    { value: "+18%", label: "Reporting Accuracy Gain", desc: "Standardized recruitment records with Python, SQL, and cleansing rules (Augur Talentcare)" },
    { value: "8 Feeds", label: "Automated KPI Feeds", desc: "Automated exception tracking with Python, SQL checks, & OpenAI API review prompts" }
  ],

  technicalSkills: [
    {
      category: "Programming & Query Languages",
      skills: ["Python", "SQL", "PySpark", "Spark SQL"]
    },
    {
      category: "SQL Development & Optimization",
      skills: ["SQL Joins", "CTEs", "Window Functions", "Query Optimization", "Indexing", "Partitioning", "Aggregations", "Schema Validation"]
    },
    {
      category: "Data Engineering & ETL",
      skills: ["ETL/ELT Pipelines", "Data Integration", "Data Cleansing", "Data Validation", "Incremental Loads", "Batch Processing", "Streaming Pipelines", "Data Reconciliation", "Source-to-Target Mapping"]
    },
    {
      category: "Big Data & Lakehouse Processing",
      skills: ["Apache Spark", "Databricks", "Delta Lake", "Kafka", "Spark Structured Streaming", "Medallion Architecture", "Bronze/Silver/Gold Layers"]
    },
    {
      category: "Cloud Data Platforms",
      skills: ["AWS S3", "AWS Glue", "AWS Lambda", "AWS CloudWatch"]
    },
    {
      category: "Databases & Data Warehousing",
      skills: ["MySQL", "PostgreSQL", "Amazon Redshift", "Google BigQuery", "Data Warehousing"]
    },
    {
      category: "Data Modeling & Analytics Engineering",
      skills: ["Dimensional Modeling", "Star Schema", "Fact Tables", "Dimension Tables", "KPI Data Models", "Business Intelligence"]
    },
    {
      category: "Workflow Orchestration & DataOps",
      skills: ["Apache Airflow", "dbt", "Git", "GitHub", "Pipeline Monitoring", "Metadata Documentation"]
    },
    {
      category: "AI Data Integration",
      skills: ["Amazon Bedrock", "OpenAI API", "Vector Embeddings", "AI-Assisted SQL Validation"]
    },
    {
      category: "Reporting & Visualization",
      skills: ["Power BI", "Tableau", "Advanced Excel", "Operational Dashboards"]
    }
  ],

  professionalExperience: [
    {
      id: "startech-google",
      role: "Data Engineer",
      period: "Jul 2026 - Present",
      company: "Star Tech Networks Inc.",
      client: "Google",
      location: "USA",
      metrics: [
        { label: "Query Speed", value: "+25%" },
        { label: "KPI Feeds", value: "8 Automated" }
      ],
      bullets: [
        "Engineered Python and SQL ETL pipelines for network KPI, telemetry, and service-performance inputs, giving operations teams reliable SLA data for daily reviews.",
        "Tuned partitioned SQL transformations with indexing, CTEs, and window functions, boosting query performance by 25% for high-volume network log analysis.",
        "Defined source-to-target mappings and KPI logic with product and network operations teams, using AI-assisted SQL validation to review transformation rules before SLA reporting refreshes.",
        "Automated exception tracking for 8 network KPI feeds using Python, SQL checks, GitHub-managed scripts, and OpenAI API review prompts, helping engineers catch missing records before dashboard refreshes.",
        "Curated incremental SQL datasets for availability, latency, throughput, and service trends, publishing selected aggregates into Google BigQuery for clearer network performance analysis."
      ]
    },
    {
      id: "truist-bank",
      role: "Cloud Data Engineer",
      period: "May 2025 - May 2026",
      company: "Truist Bank",
      client: null,
      location: "Charlotte, NC / Remote",
      metrics: [
        { label: "Refresh Speed", value: "+22%" },
        { label: "Scan Reduction", value: "-18%" },
        { label: "Pipelines", value: "6 Datasets" }
      ],
      bullets: [
        "Developed AWS S3, Glue, Lambda, Python, and SQL pipeline components for 6 banking operational datasets, preparing customer, account, and transaction data for reporting use cases.",
        "Tuned SQL queries with joins, filters, aggregations, and batch processing logic, boosting dashboard refresh performance by 22% for financial operations reporting.",
        "Applied Python and SQL validation checks to identify duplicate customer records, missing account IDs, invalid timestamps, and transaction status mismatches before business review cycles.",
        "Modeled fact and dimension tables for 4 operational dashboards using SQL and dimensional modeling, giving analysts clearer views of customer activity, transaction trends, and branch performance.",
        "Monitored recurring refresh workflows through AWS Lambda, Glue jobs, GitHub scripts, and AWS CloudWatch, helping maintain dependable cloud reporting outputs without manual file movement.",
        "Organized AWS S3 partitions by business unit, source, and load date, decreasing unnecessary query scans by 18% across large banking reporting datasets.",
        "Documented metric logic, table structures, refresh dependencies, and data notes with analysts and operations teams, using Amazon Bedrock and vector embeddings to support searchable documentation."
      ]
    },
    {
      id: "augur-talentcare",
      role: "Data Engineering Associate",
      period: "May 2021 - Jun 2024",
      company: "Augur Talentcare Pvt Ltd",
      client: "Domain: Data Engineering / Big Data / Analytics (Project: Data Warehouse Model)",
      location: "India / Remote",
      metrics: [
        { label: "Reporting Accuracy", value: "+18%" },
        { label: "Handoff Time", value: "-15%" },
        { label: "Sources", value: "5 Reconciled" }
      ],
      bullets: [
        "Developed SQL ETL workflows to load candidate, client, job requisition, submission, and interview data into warehouse tables, giving recruitment teams consistent pipeline reporting.",
        "Standardized recruitment records with Python, SQL, and cleansing rules, raising reporting accuracy by 18% across hiring funnel and recruiter activity datasets.",
        "Shaped MySQL and PostgreSQL staging, lookup, fact, and dimension tables for candidate activity, client demand, interview progress, and placement tracking, making warehouse reporting easier to maintain.",
        "Reconciled records across 5 operational data sources with SQL validation and Advanced Excel checks, helping analysts catch duplicate profiles, missing IDs, and status mismatches before delivery.",
        "Prepared SQL datasets with joins, CTEs, filters, and aggregations for recruiter productivity, submissions, conversions, and turnaround-time reporting, giving business users clearer performance views.",
        "Organized source-to-target mappings in Git with field rules, table definitions, and transformation notes, shortening handoff time by 15% between data engineering and reporting teams.",
        "Automated weekly preparation logic with Python scripts, SQL transformations, and Apache Airflow scheduling for 3 reporting datasets, helping users receive consistent outputs without repeated cleanup.",
        "Worked with senior data engineers, analysts, and business users to confirm metric definitions, warehouse rules, and reporting needs, converting recruitment questions into structured SQL outputs."
      ]
    }
  ],

  projects: [
    {
      id: "kpi-streaming",
      title: "Real-Time Network KPI Streaming Pipeline",
      tags: ["Kafka", "Databricks", "PySpark", "Spark Structured Streaming", "Delta Lake", "Medallion Architecture", "SQL Views"],
      bullets: [
        "Built a Kafka-to-Databricks streaming pipeline with PySpark and Spark Structured Streaming to process telemetry events into Delta Lake tables for faster KPI analysis.",
        "Parsed semi-structured event payloads using PySpark, timestamp validation, duplicate handling, and schema checks, increasing trust in device, region, and hourly performance metrics.",
        "Structured Delta Lake bronze, silver, and gold layers with SQL views, giving analytics users clear separation between raw events, cleansed records, and reporting-ready KPI outputs."
      ]
    },
    {
      id: "cloud-warehouse-bi",
      title: "Cloud Data Warehouse and BI Reporting Model",
      tags: ["Amazon Redshift", "SQL", "dbt", "Star-Schema", "AWS S3", "AWS Glue", "Power BI", "Tableau"],
      bullets: [
        "Designed a Redshift data warehouse using SQL, dbt, and star-schema modeling to organize sales, customer, product, and regional data into reporting-ready fact and dimension tables.",
        "Loaded raw CSV and database extracts from AWS S3 through AWS Glue transformations, creating curated Redshift tables that supported consistent Power BI reporting.",
        "Created dbt SQL models and Tableau-ready reporting datasets for revenue trends, customer activity, and product performance, giving stakeholders cleaner metrics for recurring business reviews."
      ]
    },
    {
      id: "iot-healthcare",
      title: "Healthcare IoT Data Pipeline for Smart Pill Box Monitoring",
      tags: ["MySQL", "Python", "SQL", "IoT Sensor Data", "Timestamp Alignment", "Data Cleansing", "Adherence Tracking", "Advanced Excel"],
      bullets: [
        "Modeled MySQL tables for dosage schedules, device events, adherence status, and timestamped activity, giving healthcare monitoring data a structured reporting foundation.",
        "Developed Python and SQL logic to clean sensor event records, align dosage timestamps, and classify adherence activity, strengthening daily and weekly monitoring outputs.",
        "Generated Advanced Excel and SQL-based adherence reports from MySQL datasets, helping demonstrate how healthcare device data can support patient follow-up and usage tracking."
      ]
    }
  ],

  education: [
    {
      degree: "Master of Science in Information Systems",
      institution: "University of Colorado Denver",
      location: "Denver, CO",
      period: "Aug 2024 - May 2026"
    },
    {
      degree: "Bachelor of Engineering in Instrumentation Engineering",
      institution: "Andhra University, University College of Engineering",
      location: "Vizag, India",
      period: "Aug 2019 - May 2023"
    }
  ],

  certifications: [
    { title: "IBM Data Engineering Professional Certificate", issuer: "Coursera" },
    { title: "IBM Data Warehouse Engineer Professional Certificate", issuer: "Coursera" },
    { title: "Data Engineering, Big Data, and Machine Learning on GCP", issuer: "Coursera" },
    { title: "Introduction to Data Engineering on Google Cloud", issuer: "Coursera" },
    { title: "Data Engineering Foundations", issuer: "LinkedIn Learning" },
    { title: "Apache Spark Essential Training: Big Data Engineering", issuer: "LinkedIn Learning" }
  ],

  leadership: [
    {
      role: "Coordinator",
      period: "Feb 2020",
      event: "SPIKES ’20 National Technical Symposium",
      description: "Managed logistics, schedules, participant registration records, and event coordination workflows for a national technical symposium, ensuring clean data collection and smooth participant tracking."
    },
    {
      role: "Volunteer Coordinator",
      period: "Dec 2019",
      event: "Global Alumni Meet",
      description: "Organized guest coordination, scheduling support, and database tracking for institutional alumni engagement activities, improving event preparation and communication flow."
    },
    {
      role: "Volunteer",
      period: "June 2020",
      event: "National Service Scheme",
      description: "Supported community outreach activities by coordinating resources, communication, and volunteer participation for local service initiatives."
    }
  ]
};
