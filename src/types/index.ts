export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl?: string;
  repoUrl?: string;
  dataAiHint?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO string format e.g. "2024-01-15"
  excerpt: string;
  content: string; // Markdown or HTML string
  imageUrl: string;
  author: string;
  tags?: string[];
  dataAiHint?: string;
}

export interface Endorsement {
  id: string;
  productName: string;
  company: string;
  description: string;
  imageUrl: string;
  link: string;
  status: 'active' | 'inactive';
  dataAiHint?: string;
}
