"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadFile from "@/components/UploadFile";
import { axiosInstance } from "@/services/axios";
import { FilesFavorite, Files } from "@/types/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  query: z.string().max(200, { message: "" }),
});

const Header = ({
  title,
  setFiles,
  setLoading,
}: {
  title: string;
  setFiles:
    | React.Dispatch<React.SetStateAction<FilesFavorite[] | []>>
    | React.Dispatch<React.SetStateAction<Files[] | []>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, [form]);

  const getUrl = () => {
    let url = "/api/v1/files";

    if (title === "Favorites") {
      url = "/api/v1/favorites";
    } else if (title === "Trash") {
      url = "/api/v1/deleted";
    }

    return url;
  };

  const searchFiles = async (values: z.infer<typeof formSchema>) => {
    const config = {
      params: {
        q: values.query.toLowerCase().trim(),
      },
    };
    try {
      setLoading(true);
      const url = getUrl();
      const response = await axiosInstance.get(url, config);
      if (response.status === 200) {
        setFiles(response.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(searchFiles)} className="flex">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[350px]"
                      type="text"
                      placeholder="Search.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="ml-3 text-[15px]" type="submit">
              Search
            </Button>
          </form>
        </Form>
      </div>
      <UploadFile setFiles={setFiles} />
    </div>
  );
};

export default Header;
