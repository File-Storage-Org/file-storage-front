"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/services/auth/AuthProvider";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Brain, Minus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchBarSkeleton from "./skeletons/SearchBarSkeleton";


const formSchema = z.object({
  q: z.string().max(200, { message: "" }),
  searchType: z.string(),
});


const SearchBar = () => {
  const { loading } = useAuth()
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: "",
      searchType: "default",
    },
  });

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, [form]);

  const searchFiles = (values: z.infer<typeof formSchema>) => {
    const searchQuery = values.q.toLowerCase().trim()
    if (searchQuery) {
      router.push(`/dashboard/search?q=${searchQuery}&sType=${values.searchType}`);
    }
  };

  return (
    <nav className="h-full w-full mb-4 flex justify-center">
      {loading && <SearchBarSkeleton />}
      <div className="shadow-md rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(searchFiles)} className="flex">
            <FormField
              name="searchType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="
                            w-[60px]
                            bg-orange-500
                            text-white
                            border-none
                            rounded-none
                            rounded-l-lg
                            focus:ring-offset-0
                            focus:ring-0"
                      >
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="min-w-0">
                      <SelectGroup>
                        <SelectItem value="default"><Minus className="w-5" /></SelectItem>
                        <SelectItem value="ai"><Brain className="w-5" /></SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="q"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-[450px]">
                      <Input
                        {...field}
                        value={form.getValues("q")}
                        onChange={(e) => {
                          form.setValue("q", e.target.value)
                        }}
                        className="
                        w-full
                        pr-8
                        bg-white
                        rounded-none
                        focus-visible:ring-offset-0
                        focus-visible:ring-0
                        focus-visible:border-orange-500
                      "
                        placeholder="Search your files here..."
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900"
                        onClick={() => {
                          form.setValue("q", "")
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="rounded-none rounded-r-lg" type="submit">
              <Search />
            </Button>
          </form>
        </Form>
      </div>
    </nav>
  );
};

export default SearchBar;
