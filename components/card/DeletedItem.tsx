import React from "react";
import { Trash2 } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { File, Files, FilesFavorite } from "@/types/types";
import { axiosInstance } from "@/services/axios";

const DeletedItem = ({
  file,
  setFiles,
}: {
  file: File;
  setFiles:
    | React.Dispatch<React.SetStateAction<FilesFavorite[] | []>>
    | React.Dispatch<React.SetStateAction<Files[] | []>>;
}) => {
  const deleteItem = async () => {
    try {
      const response = await axiosInstance.delete(`/api/v1/file/${file.id}`);
      if (response.status === 200) {
        console.log("file was deleted successfully.");
        setFiles((prevState: any[]) =>
          prevState.filter((el) => {
            return el.data.id !== response.data.id;
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DropdownMenuItem
      className="text-red-600 focus:text-red-600"
      onClick={deleteItem}
    >
      <Trash2 width={18} className="mr-2" /> Delete
    </DropdownMenuItem>
  );
};

export default DeletedItem;
