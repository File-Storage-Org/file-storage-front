"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/services/axios";
import { useAuth } from "@/services/auth/AuthProvider";
import { FilesFavorite } from "@/types/types";
import FileCards from "@/components/FileCards";
import Header from "@/components/Header";

const Dashboard = () => {
  const { user } = useAuth();

  const [files, setFiles] = useState<FilesFavorite[] | []>([]);
  const [filesLoading, setFilesLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const fetchFiles = async () => {
        const response =
          await axiosInstance.get<FilesFavorite[]>("/api/v1/files");
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
  }, []);

  return (
    <>
      <div className="my-8">
        <Header
          title="Your Files"
          setFiles={setFiles}
        />
      </div>
      <div className="grid grid-cols-5 gap-5">
        {filesLoading ? (
          <div className="col-span-5 flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : files.length ? (
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
        ) : (
          <div className="col-span-5 flex justify-center items-center">
            <img
              className="w-[400px]"
              src="/no-data.png"
              alt=" "
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Dashboard;
