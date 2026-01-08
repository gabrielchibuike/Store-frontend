"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Category, SubCategory } from "./StoreContext";

interface CategoryConfigurationProps {
  categories: Category[];
  onUpdate: (categories: Category[]) => void;
}

export function CategoryConfiguration({
  categories,
  onUpdate,
}: CategoryConfigurationProps) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  // Key: categoryId-genderName
  const [newSubCategoryNames, setNewSubCategoryNames] = useState<
    Record<string, string>
  >({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const transformCharacter = (str: string): string => {
    if (!str) return "";

    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/(^[a-z])|(-[a-z])/g, (match) => match.toUpperCase()); // capitalize first letter + letters after hyphen
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory: Category = {
      // id: crypto.randomUUID(),
      name: transformCharacter(newCategoryName),
      genderGroups: [
        { name: "Men", subCategories: [] },
        { name: "Women", subCategories: [] },
        { name: "Unisex", subCategories: [] },
      ],
    };
    onUpdate([...categories, newCategory]);
    setNewCategoryName("");
  };

  const deleteCategory = (id: string) => {
    onUpdate(categories.filter((c) => c._id !== id));
  };

  const startEditCategory = (category: Category) => {
    setEditingCategory(category._id as string);
    setEditCategoryName(category.name);
  };

  const saveEditCategory = () => {
    if (!editingCategory || !editCategoryName.trim()) return;
    onUpdate(
      categories.map((c) =>
        c._id === editingCategory ? { ...c, name: editCategoryName.trim() } : c
      )
    );
    setEditingCategory(null);
    setEditCategoryName("");
  };

  const cancelEditCategory = () => {
    setEditingCategory(null);
    setEditCategoryName("");
  };

  const addSubCategory = (categoryId: string, genderName: string) => {
    const key = `${categoryId}-${genderName}`;
    const name = newSubCategoryNames[key];
    if (!name?.trim()) return;

    onUpdate(
      categories.map((c) => {
        if (c._id === categoryId) {
          return {
            ...c,
            genderGroups: c.genderGroups.map((g) => {
              if (g.name === genderName) {
                return {
                  ...g,
                  subCategories: [
                    ...g.subCategories,
                    { name: transformCharacter(name) },
                  ],
                };
              }
              return g;
            }),
          };
        }
        return c;
      })
    );
    setNewSubCategoryNames((prev) => ({ ...prev, [key]: "" }));
  };

  const deleteSubCategory = (
    categoryId: string,
    genderName: string,
    subCategoryId: string
  ) => {
    onUpdate(
      categories.map((c) => {
        if (c._id === categoryId) {
          return {
            ...c,
            genderGroups: c.genderGroups.map((g) => {
              if (g.name === genderName) {
                return {
                  ...g,
                  subCategories: g.subCategories.filter(
                    (s) => s._id !== subCategoryId
                  ),
                };
              }
              return g;
            }),
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories & Subcategories</CardTitle>
          <CardDescription>
            Manage the structure of your store's products.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="New Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
            />
            <Button onClick={addCategory}>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </div>

          <div className="space-y-2">
            {categories.map((category: Category) => (
              <div className="border rounded-lg p-3 bg-card" key={category._id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-6 w-6"
                      onClick={() => toggleCategory(category._id as string)}
                    >
                      {expandedCategories[category._id as string] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>

                    {editingCategory === category._id ? (
                      <div className="flex items-center gap-2 flex-1 max-w-sm">
                        <Input
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="h-8"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={saveEditCategory}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={cancelEditCategory}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      <span className="font-medium">{category.name}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEditCategory(category)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteCategory(category._id as string)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                {expandedCategories[category._id as string] && (
                  <div className="ml-8 mt-3 space-y-3 border-l-2 pl-4">
                    <Tabs defaultValue="Men" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="Men">Men</TabsTrigger>
                        <TabsTrigger value="Women">Women</TabsTrigger>
                        <TabsTrigger value="Unisex">Unisex</TabsTrigger>
                      </TabsList>
                      {category.genderGroups?.map((group) => (
                        <TabsContent
                          key={group.name}
                          value={group.name}
                          className="space-y-3"
                        >
                          <div className="flex gap-2">
                            <Input
                              placeholder={`New ${group.name} Subcategory`}
                              value={
                                newSubCategoryNames[
                                  `${category._id}-${group.name}`
                                ] || ""
                              }
                              onChange={(e) =>
                                setNewSubCategoryNames((prev) => ({
                                  ...prev,
                                  [`${category._id}-${group.name}`]:
                                    e.target.value,
                                }))
                              }
                              className="h-8"
                              onKeyDown={(e) =>
                                e.key === "Enter" &&
                                addSubCategory(
                                  category._id as string,
                                  group.name
                                )
                              }
                            />
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() =>
                                addSubCategory(
                                  category._id as string,
                                  group.name
                                )
                              }
                            >
                              <Plus className="h-3 w-3 mr-1" /> Add
                            </Button>
                          </div>
                          <div className="space-y-1">
                            {group.subCategories.map((sub) => (
                              <div
                                key={sub._id}
                                className="flex items-center justify-between bg-muted/50 p-2 rounded text-sm"
                              >
                                <span>{sub.name}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0"
                                  onClick={() =>
                                    deleteSubCategory(
                                      category._id as string,
                                      group.name,
                                      sub._id as string
                                    )
                                  }
                                >
                                  <Trash2 className="h-3 w-3 text-destructive" />
                                </Button>
                              </div>
                            ))}
                            {group.subCategories.length === 0 && (
                              <p className="text-xs text-muted-foreground italic">
                                No subcategories for {group.name}
                              </p>
                            )}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )}
              </div>
            ))}
            {categories.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No categories configured yet. Add one above.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
