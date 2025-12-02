export interface ProfessionData {
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  stats: {
    label: string;
    value: string;
    color: string;
  }[];
  roadmap: {
    step: number;
    title: string;
    description: string;
    details: {
      title: string;
      content: string;
    }[];
  }[];
  pedagogy: {
    title: string;
    content: string;
    specialNeeds: string;
    resources: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  specializations?: {
    title: string;
    description: string;
    skills: string[];
    salary: string;
    demand: string;
    link?: string;
  }[];
}
