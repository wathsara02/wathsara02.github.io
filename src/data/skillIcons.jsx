import {
  SiPython, SiR, SiGnubash, SiJulia,
  SiPytorch, SiTensorflow, SiKeras, SiScikitlearn,
  SiDocker, SiKubernetes, SiApacheairflow, SiFastapi,
  SiGooglecloud, SiPandas, SiApachespark, SiDbt, SiSnowflake, SiApachekafka,
  SiPlotly, SiStreamlit,
  SiPostgresql, SiGit, SiGithub, SiJupyter, SiAnaconda,
  SiGrafana, SiTerraform, SiRedis, SiLinux,
} from "react-icons/si"
import { FaDatabase, FaCloud } from "react-icons/fa"
import { BsCloud, BsBarChartFill } from "react-icons/bs"
import { TbChartBar, TbBrain, TbChartHistogram } from "react-icons/tb"
import { VscAzure } from "react-icons/vsc"
import {
  SiHuggingface, SiLangchain, SiMlflow as SiMlflow2, SiDvc as SiDvc2,
  SiPrefect as SiPrefect2, SiRay as SiRay2, SiGooglebigquery, SiGradio,
} from "@icons-pack/react-simple-icons"

const AWS_ICON   = BsCloud
const CHART_ICON = TbChartHistogram

export const SKILL_ICONS = {
  // Languages
  "Python":   { icon: SiPython,     color: "#3776AB" },
  "R":        { icon: SiR,          color: "#276DC3" },
  "SQL":      { icon: FaDatabase,   color: "#DFE104" },
  "Bash":     { icon: SiGnubash,    color: "#4EAA25" },
  "Julia":    { icon: SiJulia,      color: "#9558B2" },

  // ML / DL
  "PyTorch":                  { icon: SiPytorch,     color: "#EE4C2C" },
  "TensorFlow":               { icon: SiTensorflow,  color: "#FF6F00" },
  "Keras":                    { icon: SiKeras,       color: "#D00000" },
  "scikit-learn":             { icon: SiScikitlearn, color: "#F7931E" },
  "HuggingFace Transformers": { icon: SiHuggingface, color: "#FFD21E" },
  "XGBoost":                  { icon: TbBrain,       color: "#10B981" },
  "LightGBM":                 { icon: TbChartBar,    color: "#3B82F6" },
  "LangChain":                { icon: SiLangchain,   color: "#00A67E" },

  // MLOps
  "MLflow":     { icon: SiMlflow2,       color: "#0194E2" },
  "Docker":     { icon: SiDocker,        color: "#2496ED" },
  "Kubernetes": { icon: SiKubernetes,    color: "#326CE5" },
  "Airflow":    { icon: SiApacheairflow, color: "#017CEE" },
  "FastAPI":    { icon: SiFastapi,       color: "#009688" },
  "DVC":        { icon: SiDvc2,          color: "#945DD6" },
  "Prefect":    { icon: SiPrefect2,      color: "#DFE104" },
  "Ray":        { icon: SiRay2,          color: "#028CF0" },

  // Cloud
  "AWS SageMaker": { icon: AWS_ICON,         color: "#FF9900" },
  "GCP Vertex AI": { icon: SiGooglecloud,    color: "#4285F4" },
  "Azure ML":      { icon: VscAzure,         color: "#0089D6" },
  "Lambda":        { icon: AWS_ICON,         color: "#FF9900" },
  "S3":            { icon: AWS_ICON,         color: "#FF9900" },
  "EC2":           { icon: FaCloud,          color: "#FF9900" },

  // Data Engineering
  "Pandas":    { icon: SiPandas,         color: "#150458" },
  "PySpark":   { icon: SiApachespark,    color: "#E25A1C" },
  "dbt":       { icon: SiDbt,            color: "#FF694B" },
  "BigQuery":  { icon: SiGooglebigquery, color: "#4285F4" },
  "Snowflake": { icon: SiSnowflake,      color: "#29B5E8" },
  "Kafka":     { icon: SiApachekafka,    color: "#F5F5F5" },
  "Redshift":  { icon: FaDatabase,       color: "#8C4FFF" },

  // Visualization
  "Matplotlib": { icon: CHART_ICON,     color: "#4FC3F7" },
  "Seaborn":    { icon: CHART_ICON,     color: "#7EB8F7" },
  "Plotly":     { icon: SiPlotly,       color: "#A0AADD" },
  "Streamlit":  { icon: SiStreamlit,    color: "#FF4B4B" },
  "Gradio":     { icon: SiGradio,       color: "#F97316" },
  "Tableau":    { icon: BsBarChartFill, color: "#E97627" },
}

export function SkillIcon({ name, size = 28 }) {
  const entry = SKILL_ICONS[name]
  if (!entry) {
    return (
      <span style={{
        fontSize: size * 0.48, fontFamily: "JetBrains Mono",
        color: "#DFE104", fontWeight: 700, lineHeight: 1
      }}>
        {name.slice(0,3).toUpperCase()}
      </span>
    )
  }
  const Icon = entry.icon
  return <Icon size={size} color={entry.color} />
}





