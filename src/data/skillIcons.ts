import type { ComponentType } from 'react'
import {
  SiApacheairflow, SiApachekafka, SiApachespark, SiDocker, SiFastapi, SiGooglebigquery,
  SiGooglecloud, SiGradio, SiHuggingface, SiKeras, SiKubernetes, SiMlflow, SiPandas,
  SiPlotly, SiPrefect, SiPython, SiPytorch, SiR, SiRay, SiScikitlearn, SiSnowflake,
  SiStreamlit, SiTensorflow,
} from '@icons-pack/react-simple-icons'
import { BrainCircuit, ChartColumn, Cloud, Database } from 'lucide-react'

export type SkillIcon = ComponentType<{ size?: number | string }>

/** Brand marks where one exists, a generic glyph otherwise. Unlisted skills render without an icon. */
export const SKILL_ICONS: Record<string, SkillIcon> = {
  // Languages
  Python: SiPython,
  R: SiR,
  SQL: Database,

  // ML / deep learning
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  Keras: SiKeras,
  'scikit-learn': SiScikitlearn,
  'HuggingFace Transformers': SiHuggingface,
  XGBoost: BrainCircuit,

  // MLOps
  MLflow: SiMlflow,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Airflow: SiApacheairflow,
  FastAPI: SiFastapi,
  Prefect: SiPrefect,
  Ray: SiRay,

  // Cloud
  'AWS SageMaker': Cloud,
  'GCP Vertex AI': SiGooglecloud,
  'Azure ML': Cloud,
  Lambda: Cloud,
  S3: Cloud,
  EC2: Cloud,

  // Data engineering
  Pandas: SiPandas,
  PySpark: SiApachespark,
  dbt: Database,
  BigQuery: SiGooglebigquery,
  Snowflake: SiSnowflake,
  Kafka: SiApachekafka,
  Redshift: Database,

  // Visualization
  Matplotlib: ChartColumn,
  Seaborn: ChartColumn,
  Plotly: SiPlotly,
  Streamlit: SiStreamlit,
  Gradio: SiGradio,
  Tableau: ChartColumn,
}
