"use client";
import React from "react";
import UploadFile from "@/components/UploadFile";
import { FilesFavorite, Files } from "@/types/types";
import { Separator } from "@/components/ui/separator"

const Header = ({
  title,
  setFiles = () => {},
  disableUpload = false
}: {
  title: string;
  setFiles?:
    | React.Dispatch<React.SetStateAction<FilesFavorite[] | []>>
    | React.Dispatch<React.SetStateAction<Files[] | []>>;
  disableUpload?: boolean;
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        {!disableUpload && <UploadFile setFiles={setFiles} />}
      </div>
      <Separator />
    </>
  );
};

export default Header;
