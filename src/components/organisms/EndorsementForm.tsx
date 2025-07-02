"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Card, CardContent } from "@/components/atoms/card";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import React from "react";
import type { Endorsement } from "@/types";
import { useRouter } from "next/navigation";

const endorsementSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters."),
  company: z.string().min(2, "Company name is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  link: z.string().url("Must be a valid URL."),
  imageUrl: z.string().url("Image URL must be a valid URL."),
  status: z.enum(["active", "inactive"]),
});

type EndorsementFormValues = z.infer<typeof endorsementSchema>;

interface EndorsementFormProps {
  endorsement?: Endorsement;
}

export function EndorsementForm({ endorsement }: EndorsementFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const isEditMode = !!endorsement;

  const form = useForm<EndorsementFormValues>({
    resolver: zodResolver(endorsementSchema),
    defaultValues: isEditMode ? endorsement : {
      productName: "",
      company: "",
      description: "",
      link: "",
      imageUrl: "https://placehold.co/300x300.png",
      status: "inactive",
    },
  });

  async function onSubmit(data: EndorsementFormValues) {
    setIsLoading(true);
    // Simulate API call for demo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Endorsement data:", data);

    toast({
      title: isEditMode ? "Endorsement Updated!" : "Endorsement Created!",
      description: `The endorsement for "${data.productName}" has been saved.`,
    });
    
    setIsLoading(false);
    router.push('/admin/endorsements');
    router.refresh(); // To reflect changes if we were using a real database
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="DevBoost AI Assistant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="CodeCrafters Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/product" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short description of the product..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="active" />
                          </FormControl>
                          <FormLabel className="font-normal">Active</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="inactive" />
                          </FormControl>
                          <FormLabel className="font-normal">Inactive</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEditMode ? 'Save Changes' : 'Create Endorsement'}
                    </>
                  )}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
