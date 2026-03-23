export interface Skill {
  category: string;
  name: string;
}

export interface Experience {
  period: string;
  company: string;
  type: "FULL-TIME" | "CONTRACT" | "INTERNSHIP" | "PART-TIME";
  role: string;
  description: string;
  tags: string[];
  num: string;
}

export interface Project {
  num: string;
  tag: string;
  tagColor?: "accent" | "it" | "net" | "purple";
  title: string;
  description: string;
  stack: string[];
  href: string;
  featured?: boolean;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface BlogPost {
  num: string;
  tag: string;
  tagColor?: "accent" | "it" | "net";
  title: string;
  description: string;
  date: string;
  readTime: string;
  views: string;
  href: string;
  featured?: boolean;
}
