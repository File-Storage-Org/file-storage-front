"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/services/axios";
import { useAuth } from "@/services/auth/AuthProvider";
import { FilesFavorite } from "@/types/types";
import FileCards from "@/components/FileCards";
import Header from "@/components/Header";

const Search = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const [files, setFiles] = useState<FilesFavorite[] | []>([]);
  const [filesLoading, setFilesLoading] = useState<boolean>(false);

  const getUrl = (sType: string) => {
    const url: { [key: string]: string } = {
      "default": "/api/v1/search",
      "ai": "/api/v1/ai-search"
    }
    return url[sType];
  };

  useEffect(() => {
    const sType = searchParams.get("sType")
    const query = searchParams.get("q")
    if (sType && query) {
      const url = getUrl(sType)
      try {
        setFilesLoading(true)
        const fetchFiles = async () => {
          const response =
            await axiosInstance.get<FilesFavorite[]>(`${url}?q=${query}`);
          if (response.status === 200) {
            setFiles(response.data);
          }
        };
        fetchFiles().then();
      } catch (e) {
        console.log("Error with file request.");
      } finally {
        setFilesLoading(false);
      }
    }
  }, [searchParams.toString()]);

  useEffect(() => {
    if (files.length) {
      setFiles([])
    }
  }, [searchParams.toString()]);

  return (
    <>
      <div className="my-8">
        <Header
          title="Search results"
          disableUpload
        />
      </div>
      <div className="grid grid-cols-5 gap-5">
        {!filesLoading && !files.length && (
          <div className="col-span-5 flex justify-center items-center">
            <img
              className="w-[400px]"
              src="/no-data.png"
              alt=" "
            />
          </div>
        )}
        {filesLoading && !files.length ? (
          <div className="col-span-5 flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          files.map((file, i) => (
            <React.Fragment key={i}>
              <FileCards
                user={user}
                file={file.data}
                fav={!!file.fav}
                files={files}
                setFiles={setFiles}
              />
            </React.Fragment>
          ))
        )}
      </div>
    </>
  );
};
export default Search;
