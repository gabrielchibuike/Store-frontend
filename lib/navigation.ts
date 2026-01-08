export interface SubCategory {
  name: string;
  href: string;
}

export interface MegaMenuSection {
  title: string;
  items: SubCategory[];
}

export interface MegaMenuData {
  sections: MegaMenuSection[];
  promo: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    imageColor: string; // Placeholder for image background
  };
}
