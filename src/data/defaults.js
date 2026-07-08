export const defaults = {
  "meta": {
    "name": "Wathsara Kalhara",
    "title": "Data Scientist & ML Engineer",
    "roles": [
      "Data Scientist",
      "ML Engineer",
      "AI Researcher",
      "Deep Learning Practitioner"
    ],
    "tagline": "I build intelligent systems that turn complex data into decisions that matter.",
    "email": "wathsarakalharas@gmail.com",
    "location": "",
    "avatar": "/about.png",
    "resumeUrl": "",
    "socials": {
      "github": "https://github.com/wathsara02",
      "linkedin": "https://linkedin.com/in/wathsara",
      "twitter": "",
      "kaggle": ""
    }
  },
  "stats": [
    {
      "label": "Years Experience",
      "value": 3
    },
    {
      "label": "Models Deployed",
      "value": 14
    },
    {
      "label": "Projects Completed",
      "value": 9
    }
  ],
  "about": {
    "bio": "I'm a Data Scientist and ML Engineer with 3+ years of experience building end-to-end machine learning systems from exploratory analysis and model development to production deployment and monitoring. I specialize in Reinforcement Learning and computer vision, with a strong focus on making models that are not just accurate, but interpretable, scalable, and maintainable.\n\nI care deeply about the full lifecycle: understanding the problem, cleaning the data, shipping the model, and measuring real-world impact."
  },
  "skills": [
    {
      "category": "Languages",
      "items": [
        "Python",
        "R",
        "SQL"
      ]
    },
    {
      "category": "ML / Deep Learning",
      "items": [
        "PyTorch",
        "TensorFlow",
        "Keras",
        "scikit-learn",
        "XGBoost",
        "HuggingFace Transformers"
      ]
    },
    {
      "category": "MLOps & Infra",
      "items": [
        "MLflow",
        "Docker",
        "Kubernetes",
        "Airflow",
        "Prefect",
        "FastAPI",
        "Ray"
      ]
    },
    {
      "category": "Cloud",
      "items": [
        "AWS SageMaker",
        "GCP Vertex AI",
        "Azure ML",
        "Lambda",
        "S3",
        "EC2"
      ]
    },
    {
      "category": "Data Engineering",
      "items": [
        "Pandas",
        "PySpark",
        "dbt",
        "BigQuery",
        "Snowflake",
        "Kafka",
        "Redshift"
      ]
    },
    {
      "category": "Visualization & BI",
      "items": [
        "Matplotlib",
        "Seaborn",
        "Plotly",
        "Streamlit",
        "Gradio",
        "Tableau"
      ]
    }
  ],
  "projects": [
    {
      "id": 1,
      "title": "Intelligent Omi",
      "description": "Designed and trained a MAPPO (Multi-Agent PPO) reinforcement learning agent from scratch in a custom Gymnasium environment to play Omi, achieving a ~59% win rate against a random baseline over 2 million training episodes (195-dimension observation space, 36-action space). Deployed the trained PyTorch policy behind a FastAPI backend with WebSocket-based real-time inference, paired with a React 19 + TypeScript frontend where users can play live against the AI.",
      "tags": [
        "PyTorch",
        "PettingZoo",
        "Gymnasium",
        "MAPPO",
        "FastAPI",
        "Websockets",
        "React",
        "TypeScript"
      ],
      "githubUrl": "https://github.com/wathsara02/PUSL3190",
      "liveUrl": "https://omilk.vercel.app/",
      "image": "",
      "featured": true,
      "wide": true
    },
    {
      "id": 2,
      "title": "Niffler - COC game Automation",
      "description": "Built a full-stack automation platform for Clash of Clans consisting of a Python/tkinter desktop bot and a React web app. The bot uses OpenCV/Tesseract OCR to read on-screen loot values and Pyautogui to automate attack cycles, troop deployment, and wall upgrades on BlueStacks. A shared Firebase Realtime Database powers device-bound license validation, real-time stat syncing, and a public leaderboard, while the React/Vite website handles downloads, free trials, and Google AdSense monetization.",
      "tags": [
        "Python",
        "Tkinter",
        "OpenCV",
        "Tesseract OCR",
        "React",
        "Firebase"
      ],
      "githubUrl": "",
      "liveUrl": "https://vercel.com/wathsara02s-projects/coc",
      "image": "",
      "featured": true,
      "wide": false
    },
    {
      "id": 3,
      "title": "Roomora",
      "description": "Built the interactive 3D layer of Roomora, an HCI/Computer Graphics coursework project that lets users design room layouts on a 2D grid and seamlessly transition into a real-time, WebGL-rendered 3D space. Implemented direct in-scene object manipulation (drag-and-drop repositioning via TransformControls), procedural furniture rendering, and smart wall culling using React Three Fiber, with Zustand managing state sync between the 2D and 3D views.",
      "tags": [
        "React",
        "TypeScript",
        "Three.js",
        "Zustand",
        "TailwindCSS"
      ],
      "githubUrl": "https://github.com/wathsara02/Roomora",
      "liveUrl": "https://roomora-kappa.vercel.app/pre-made-rooms",
      "image": "",
      "featured": true,
      "wide": false
    },
    {
      "id": 4,
      "title": "Customer Churn Prediction Platform",
      "description": "End-to-end ML platform including feature store, model registry, automated retraining pipeline, and a Streamlit dashboard for business stakeholders.",
      "tags": [
        "scikit-learn",
        "Airflow",
        "MLflow",
        "Streamlit",
        "PostgreSQL"
      ],
      "githubUrl": "",
      "liveUrl": "",
      "image": "",
      "featured": false,
      "wide": false
    },
    {
      "id": 5,
      "title": "Multilingual Sentiment Analysis API",
      "description": "Fine-tuned a multilingual BERT model on domain-specific customer feedback data across 8 languages. Packaged as a containerized REST API with auto-scaling on GCP.",
      "tags": [
        "HuggingFace",
        "BERT",
        "GCP",
        "Docker",
        "Kubernetes"
      ],
      "githubUrl": "",
      "liveUrl": "",
      "image": "",
      "featured": false,
      "wide": false
    }
  ],
  "experience": [
    {
      "id": 1,
      "role": "Analyst Programmer",
      "company": "Lanka Electricity Company",
      "period": "March 2026 — Present",
      "location": "Kollupitiya, Colombo 03",
      "description": "Contributing to web application development while assisting the Systems Analyst team with SQL/Python scripting, query optimization, and process automation.",
      "highlights": [
        "Developed Process Cost management system"
      ]
    }
  ],
  "education": [
    {
      "id": 1,
      "degree": "BSC (HONS) IN DATA SCIENCE",
      "institution": "University of Plymouth, UK",
      "period": "2023-2026",
      "location": "Pittsburgh, PA",
      "description": "Coursework covered statistical modelling, machine learning, data mining, database management, and big data analytics, with a final year research project focused on Reinforcement Learning."
    },
    {
      "id": 2,
      "degree": "GCE A/L",
      "institution": "Dharmapala Vidyalaya",
      "period": "2019-2022",
      "location": "Pannipitiya",
      "description": "Physical Science Stream\n3-s Passes"
    }
  ],
  "interests": [
    {
      "icon": "🤖",
      "title": "Agentic AI Systems",
      "description": "AI systems that can reason through tasks, use tools, follow workflows, and produce structured outputs beyond simple chatbot responses."
    },
    {
      "icon": "🔗",
      "title": "Multi-Agent Workflows",
      "description": "Specialized AI agents working together for research, analysis, planning, recommendation, and decision-support tasks."
    },
    {
      "icon": "⚙️",
      "title": "ML Engineering Products",
      "description": "Machine learning models connected with real applications, dashboards, APIs, reports, and user-friendly interfaces."
    },
    {
      "icon": "📚",
      "title": "RAG & Knowledge Systems",
      "description": "AI systems that retrieve useful knowledge from documents, databases, or vector stores to generate more grounded and context-aware answers."
    },
    {
      "icon": "🖥️",
      "title": "AI Product Interfaces",
      "description": "Clean interfaces that make AI outputs understandable, interactive, visual, and useful for real users."
    },
    {
      "icon": "⚡",
      "title": "AI Automation & Decision Support",
      "description": "Workflows that reduce manual effort by combining data, AI reasoning, reports, and recommendations for better decisions."
    }
  ],
  "contact": {
    "heading": "Let's build something intelligent.",
    "subtext": "Open to Data scientist, ML Engineering, Loop Engineering Roles. Response time: under 24 hours."
  }
}
