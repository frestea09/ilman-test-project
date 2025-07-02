"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card";
import { useToast } from "@/hooks/use-toast";
import { summarizeArticle, type SummarizeArticleOutput } from '@/ai/flows/summarize-article';
import React from "react";
import { Loader2, WandSparkles } from "lucide-react";

const summarizeFormSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

type SummarizeFormValues = z.infer<typeof summarizeFormSchema>;

export function SummarizeForm() {
  const { toast } = useToast();
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<SummarizeFormValues>({
    resolver: zodResolver(summarizeFormSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(data: SummarizeFormValues) {
    setIsLoading(true);
    setSummary(null);
    setError(null);
    try {
      const result: SummarizeArticleOutput = await summarizeArticle({ url: data.url });
      setSummary(result.summary);
      toast({
        title: "Summarization Complete!",
        description: "The article summary has been generated.",
      });
    } catch (e) {
      console.error("Summarization error:", e);
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(`Failed to summarize article. ${errorMessage}`);
      toast({
        title: "Error",
        description: `Failed to summarize article. ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-headline flex items-center">
          <WandSparkles className="mr-2 h-6 w-6 text-primary" />
          Article & Project Summarizer
        </CardTitle>
        <CardDescription>
          Enter the URL of an article or project to generate a concise summary using AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/article" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                "Generate Summary"
              )}
            </Button>
          </form>
        </Form>

        {error && (
          <div className="mt-6 p-4 bg-destructive/10 text-destructive border border-destructive rounded-md">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {summary && (
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-semibold font-headline">Summary:</h3>
            <Textarea value={summary} readOnly rows={8} className="bg-muted/50" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
