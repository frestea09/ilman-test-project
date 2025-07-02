"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple hardcoded check for demo purposes
    if (data.username === "admin" && data.password === "admin") {
      try {
        localStorage.setItem('isLoggedIn', 'true');
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        router.push('/admin/blog');
      } catch (error) {
        console.error("Could not access localStorage", error);
        toast({
            title: "Login Error",
            description: "Could not persist login session. Please enable cookies/localStorage.",
            variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your username and password.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-headline flex items-center">
            <LogIn className="mr-2 h-6 w-6" />
            Admin Login
        </CardTitle>
        <CardDescription>
          Enter your credentials to access the admin panel. (Hint: admin/admin)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="admin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
