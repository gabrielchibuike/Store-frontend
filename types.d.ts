interface SubCategory {
  name: string;
  _id?: string;
}

interface GenderGroup {
  name: "Men" | "Women" | "Unisex";
  subCategories: SubCategory[];
  _id?: string;
}

interface Category {
  name: string;
  genderGroups: GenderGroup[];
  _id?: string;
}
