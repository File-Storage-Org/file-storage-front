"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Siren } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { axiosAuthInstance } from "@/services/axios";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: "Username must be at least 5 characters." }),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [axiosError, setAxiosError] = useState<string>("");

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setAxiosError("");
      const response = await axiosAuthInstance.post("/api/v1/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        console.log(response.data);
        router.push("/auth/login");
      }
    } catch (e: any) {
      if (e?.response?.status === 404) {
        setAxiosError(e.response.data.detail);
      }
    }
  }

  return (
    <Form {...form}>
      {axiosError && (
        <Alert variant="destructive">
          <Siren className="w-4 h-4" />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{axiosError}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  {...field}
                />
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
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Sign up
        </Button>
        <Link
          href="login"
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "link",
            }),
            "w-full",
          )}
        >
          Already have an account? Click here.
        </Link>
      </form>
    </Form>
  );
};

export default Register;
