import React from "react";
import { Star } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { File, Files, FilesFavorite } from "@/types/types";
import { axiosInstance } from "@/services/axios";

const FavoriteItem = ({
  file,
  fav,
  files,
  setFiles,
}: {
  file: File;
  fav?: boolean;
  files?: FilesFavorite[] | Files[] | [];
  setFiles:
    | React.Dispatch<React.SetStateAction<FilesFavorite[] | []>>
    | React.Dispatch<React.SetStateAction<Files[] | []>>;
}) => {
  const toggleFavorite = async () => {
    if (file) {
      try {
        const response = await axiosInstance.post("/api/v1/favorites/add", {
          file_id: file.id,
        });
        if (response.status === 200) {
          if (files && files.length && setFiles) {
            if (fav) {
              setFiles((prevState: any[]) =>
                prevState.filter((el) => {
                  return el.data.id !== response.data.file_id;
                }),
              );
            } else {
              setFiles((prevState: any[]) =>
                prevState.map((el) => {
                  if (el.data.id === response.data.file_id) {
                    return { data: el.data, fav: response.data.id };
                  } else return el;
                }),
              );
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <DropdownMenuItem onClick={toggleFavorite}>
      <Star width={18} className="mr-2" /> {fav ? "Unfavorite" : "Favorite"}
    </DropdownMenuItem>
  );
};

export default FavoriteItem;
