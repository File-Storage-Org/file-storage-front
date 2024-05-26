import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Undo2 } from "lucide-react";
import { axiosInstance } from "@/services/axios";
import { File, Files, FilesFavorite } from "@/types/types";

const RestoreItem = ({
  file,
  setFiles,
}: {
  file: File;
  setFiles:
    | React.Dispatch<React.SetStateAction<FilesFavorite[] | []>>
    | React.Dispatch<React.SetStateAction<Files[] | []>>;
}) => {
  const restoreItem = async () => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/file-restore/${file.id}`,
      );
      if (response.status === 200) {
        console.log("file has been restored")
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
      className="text-green-600 focus:text-green-600"
      onClick={restoreItem}
    >
      <Undo2 width={18} className="mr-2" /> Restore
    </DropdownMenuItem>
  );
};

export default RestoreItem;
