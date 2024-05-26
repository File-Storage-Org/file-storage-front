"use client";
import React from "react";
import { FileDown } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { File } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";

const DownloadItem = ({ file }: { file: File }) => {
  const { toast } = useToast();

  const download = () => {
    if (file) {
      const link = document.createElement("a");
      link.href = file.file;
      link.download = `${file.name}.${file.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <DropdownMenuItem onClick={download}>
      <FileDown width={18} className="mr-2" /> Download
    </DropdownMenuItem>
  );
};

export default DownloadItem;
