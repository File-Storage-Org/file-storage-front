"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/services/auth/AuthProvider";
import { Files } from "@/types/types";
import { AxiosResponse } from "axios";
import { axiosInstance } from "@/services/axios";
import FileCards from "@/components/FileCards";
import Header from "@/components/Header";

const Deleted = () => {
  const { user } = useAuth();

  const [deleted, setDeleted] = useState<Files[] | []>([]);
  const [filesLoading, setFilesLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const fetchFiles = async () => {
        const response: AxiosResponse<Files[]> =
          await axiosInstance.get<Files[]>("/api/v1/deleted");
        if (response.status === 200) {
          setDeleted(response.data);
        }
      };
      fetchFiles().then();
    } catch (e) {
      console.log("Error with fetching deleted files.", e);
    } finally {
      setFilesLoading(false);
    }
  }, []);

  return (
    <>
      <div className="my-8">
        <Header
          title="Trash"
          setFiles={setDeleted}
        />
      </div>
      <div className="grid grid-cols-5 gap-5">
        {filesLoading ? (
          <div className="col-span-5 flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : deleted.length ? (
          deleted.map((file, i) => (
            <React.Fragment key={i}>
              <FileCards user={user} file={file.data} setFiles={setDeleted} />
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

export default Deleted;
