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
import { useAuth } from "@/services/auth/AuthProvider";

const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { login } = useAuth();
  const [axiosError, setAxiosError] = useState<string>("");

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setAxiosError("");
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const response = await axiosAuthInstance.post(
        "/api/v1/login",
        {
          username: values.username,
          password: values.password,
        },
        config,
      );
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("access_token", response.data.access_token);
        login(response.data.user);
        router.push("/dashboard");
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
        <Button className="w-full" type="submit">
          Login
        </Button>
        <Link
          href="register"
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "link",
            }),
            "w-full",
          )}
        >
          Do not have an account? Click here.
        </Link>
      </form>
    </Form>
  );
};

export default Login;
