"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/services/auth/AuthProvider";
import { FilesFavorite } from "@/types/types";
import { axiosInstance } from "@/services/axios";
import FileCards from "@/components/FileCards";
import { AxiosResponse } from "axios";
import Header from "@/components/Header";

const Favorites = () => {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState<FilesFavorite[] | []>([]);
  const [filesLoading, setFilesLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const fetchFiles = async () => {
        const response: AxiosResponse<FilesFavorite[]> =
          await axiosInstance.get<FilesFavorite[]>("/api/v1/favorites");
        if (response.status === 200) {
          setFavorites(response.data);
        }
      };
      fetchFiles().then();
    } catch (e) {
      console.log("Error fetching favorites", e);
    } finally {
      setFilesLoading(false);
    }
  }, []);

  return (
    <>
      <div className="my-8">
        <Header
          title="Favorites"
          setFiles={setFavorites}
        />
      </div>
      <div className="grid grid-cols-5 gap-5">
        {filesLoading ? (
          <div className="col-span-5 flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : favorites.length ? (
          favorites.map((file, i) => (
            <React.Fragment key={i}>
              <FileCards
                user={user}
                file={file.data}
                fav={!!file.fav}
                files={favorites}
                setFiles={setFavorites}
              />
            </React.Fragment>
          ))
        ) : (
          <div className="col-span-5 flex justify-center items-center">
            <img
              className="max-w-[400px]"
              src="/no-data.png"
              alt=" "
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
