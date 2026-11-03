export const projects = [
  {
    title: "Enterprise Knowledge Assistant",
    category: "GENERATIVE AI / RAG",
    icon: "⌘",
    flow: ["Documents", "Retrieval", "Grounded answers"],
    challenge:
      "Finding trustworthy answers across large collections of documents.",
    solution:
      "Built PDF and article ingestion with cleaning, chunking, embeddings and metadata. Semantic retrieval supplies relevant passages for source-grounded answers through a REST API.",
    outcome:
      "An end-to-end RAG workflow with semantic search and source references.",
    stack: ["Python", "FastAPI", "LangChain", "FAISS"],
    detail:
      "Evaluation considerations include retrieval relevance, answer faithfulness, latency and failure cases. No quantified performance results are supplied.",
  },
  {
    title: "AI Investigation Agent",
    category: "AGENTIC AI / TOOL USE",
    icon: "◇",
    flow: ["Question", "Read-only tools", "Evidence"],
    challenge:
      "Answering operational questions that span multiple structured records.",
    solution:
      "Designed a multi-step agent that selects read-only tools, retrieves records and produces auditable explanations, with typed schemas, bounded execution and error handling.",
    outcome: "A prototype for traceable, tool-assisted investigation.",
    stack: ["Python", "LangGraph", "PostgreSQL"],
    detail:
      "Includes human approval for sensitive operations. This is a prototype; no production use or measured business impact is claimed.",
  },
  {
    title: "Customer Churn Prediction",
    category: "MACHINE LEARNING / MLOPS",
    icon: "↗",
    flow: ["Tabular data", "Experiments", "Inference API"],
    challenge:
      "Predicting which customers may be at risk of leaving a service.",
    solution:
      "Prepared tabular data, handled missing values and class imbalance, compared classifiers, tracked experiments in MLflow and built an inference API.",
    outcome: "Reproducible ML experimentation and model serving.",
    stack: ["scikit-learn", "pandas", "MLflow", "FastAPI", "Docker"],
    detail:
      "Evaluation criteria include ROC-AUC, F1, precision and recall. The dataset name and exact scores have not been provided.",
  },
  {
    title: "Visual Quality Inspection",
    category: "COMPUTER VISION / DEEP LEARNING",
    icon: "⊞",
    flow: ["Images", "Transfer learning", "Classification"],
    challenge: "Exploring image-based classification for visual inspection.",
    solution:
      "Developed a CNN classification prototype with augmentation and transfer learning, reviewing misclassifications and class imbalance.",
    outcome: "A computer vision inference workflow at prototype stage.",
    stack: ["Python", "PyTorch", "OpenCV"],
    detail: "No industrial validation or accuracy figure is claimed.",
  },
];
export const skills = [
  [
    "01",
    "Generative AI & agents",
    "RAG · LLM APIs · LangChain · LangGraph · FAISS · Embeddings · Tool calling · Structured outputs · Prompt engineering",
  ],
  [
    "02",
    "Machine learning & data",
    "scikit-learn · pandas · NumPy · Feature engineering · Cross-validation · Model evaluation · Experiment tracking",
  ],
  [
    "03",
    "Deep learning & vision",
    "PyTorch · TensorFlow / Keras · OpenCV · CNNs · Transfer learning · Data augmentation",
  ],
  [
    "04",
    "Backend & data engineering",
    "FastAPI · Flask · Pydantic · PostgreSQL · MongoDB · ETL · Data validation",
  ],
  [
    "05",
    "Software engineering",
    "Python · SQL · Java · JavaScript · Bash · Git · REST APIs · Object-oriented programming",
  ],
  [
    "06",
    "MLOps & development",
    "Docker · GitHub Actions · MLflow · Unit testing · Linux · CI/CD fundamentals",
  ],
];
export const navigation = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["education", "Education"],
];
