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
    "avatar": "",
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
    "bio": "I'm a Data Scientist and ML Engineer with 6 years of experience building end-to-end machine learning systems — from exploratory analysis and model development to production deployment and monitoring. I specialize in Reinforcement Learning and computer vision, with a strong focus on making models that are not just accurate, but interpretable, scalable, and maintainable.\n\nI care deeply about the full lifecycle: understanding the problem, cleaning the data, shipping the model, and measuring real-world impact."
  },
  "skills": [
    {
      "category": "Languages",
      "items": [
        "Python",
        "R",
        "SQL",
        "Bash",
        "Julia"
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
        "LightGBM",
        "HuggingFace Transformers",
        "LangChain"
      ]
    },
    {
      "category": "MLOps & Infra",
      "items": [
        "MLflow",
        "DVC",
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
      "title": "LLM-Powered Document Intelligence",
      "description": "Built a retrieval-augmented generation (RAG) pipeline to extract structured insights from unstructured legal documents. Reduced analyst review time by 68% in production.",
      "tags": [
        "LangChain",
        "OpenAI",
        "FAISS",
        "FastAPI",
        "Docker"
      ],
      "githubUrl": "",
      "liveUrl": "",
      "image": "",
      "featured": true,
      "wide": true
    },
    {
      "id": 2,
      "title": "Real-Time Fraud Detection System",
      "description": "Designed and deployed a gradient-boosted ensemble model with sub-50ms inference latency. Integrated with Kafka for streaming data and served via a custom FastAPI microservice.",
      "tags": [
        "XGBoost",
        "Kafka",
        "FastAPI",
        "AWS",
        "MLflow"
      ],
      "githubUrl": "",
      "liveUrl": "",
      "image": "",
      "featured": true,
      "wide": false
    },
    {
      "id": 3,
      "title": "Medical Image Segmentation",
      "description": "Implemented a U-Net variant for multi-class segmentation of MRI scans. Achieved 0.91 Dice coefficient on the validation set, outperforming the clinical baseline by 12%.",
      "tags": [
        "PyTorch",
        "MONAI",
        "OpenCV",
        "Weights & Biases"
      ],
      "githubUrl": "",
      "liveUrl": "",
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
      "degree": "M.Sc. in Machine Learning",
      "institution": "Carnegie Mellon University",
      "period": "2015 — 2017",
      "location": "Pittsburgh, PA",
      "description": "Thesis: 'Attention Mechanisms for Multi-Label Text Classification in Low-Resource Settings'. GPA: 3.92/4.0."
    },
    {
      "id": 2,
      "degree": "B.Sc. in Computer Science",
      "institution": "University of Michigan",
      "period": "2011 — 2015",
      "location": "Ann Arbor, MI",
      "description": "Minor in Statistics. Dean's List all semesters."
    }
  ],
  "interests": [
    {
      "icon": "🧠",
      "title": "Large Language Models",
      "description": "RAG pipelines, fine-tuning, and prompt engineering at scale — making LLMs reliable in production."
    },
    {
      "icon": "👁️",
      "title": "Computer Vision",
      "description": "Segmentation, detection, medical imaging — teaching machines to see what matters."
    },
    {
      "icon": "⚙️",
      "title": "MLOps & Systems",
      "description": "Feature stores, model registries, drift monitoring — making models survive the real world."
    },
    {
      "icon": "🔍",
      "title": "Interpretability",
      "description": "SHAP, LIME, causal inference — building models that humans can actually trust and audit."
    },
    {
      "icon": "📡",
      "title": "Streaming & Real-Time ML",
      "description": "Kafka, Flink, sub-100ms inference — ML at the speed of events."
    },
    {
      "icon": "🧬",
      "title": "Biomedical AI",
      "description": "Applying deep learning to genomics, pathology slides, and clinical decision support."
    },
    {
      "icon": "📚",
      "title": "Research & Papers",
      "description": "Reading 2–3 papers a week. Currently obsessed with mechanistic interpretability and sparse autoencoders."
    },
    {
      "icon": "🌐",
      "title": "Open Source",
      "description": "Contributing to the tools that the community depends on — and building small utilities no one asked for."
    }
  ],
  "contact": {
    "heading": "Let's build something intelligent.",
    "subtext": "Open to senior IC roles, research collaborations, and consulting engagements. Response time: under 24 hours."
  }
}
