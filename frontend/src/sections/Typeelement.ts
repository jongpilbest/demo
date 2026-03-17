export interface Feature {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  color: string;
  bgGradient: string;
  backgroundImage?:string;
  background_border?: string;
}

