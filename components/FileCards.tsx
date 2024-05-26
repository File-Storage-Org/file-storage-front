import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EllipsisVertical } from "lucide-react";
import DownloadItem from "@/components/card/DownloadItem";
import FavoriteItem from "@/components/card/FavoriteItem";
import DeletedItem from "@/components/card/DeletedItem";
import RestoreItem from "@/components/card/RestoreItem";
import setImageByFormat from "@/utils/setImageByFormat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import formatDate from "@/utils/formatDate";
import { File, Files, FilesFavorite, User } from "@/types/types";

const FileCards = ({
  user,
  file,
  fav,
  files,
  setFiles,
}: {
  user: User | null;
  file: File;
  fav?: boolean;
  files?: FilesFavorite[] | Files[] | [];
  setFiles:
    | React.Dispatch<React.SetStateAction<FilesFavorite[] | []>>
    | React.Dispatch<React.SetStateAction<Files[] | []>>;
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-xl cursor-default max-w-[calc(100%-50px)] overflow-hidden text-ellipsis whitespace-nowrap">
                  {file?.name}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{file?.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {file?.should_delete ? (
                  <>
                    <RestoreItem file={file} setFiles={setFiles} />
                  </>
                ) : (
                  <>
                    <DownloadItem file={file} />
                    <FavoriteItem
                      file={file}
                      fav={fav}
                      files={files}
                      setFiles={setFiles}
                    />
                    <DropdownMenuSeparator />
                    <DeletedItem file={file} setFiles={setFiles} />
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-full max-h-[120px]">
          <Dialog>
            <DialogTrigger>
              <img
                className="rounded-md max-w-full max-h-[120px]"
                src={setImageByFormat(file)}
                alt=""
              />
            </DialogTrigger>
            <DialogContent className="p-0 max-w-[900px] max-h-[700px] flex justify-center items-center">
              <img
                className="rounded-md max-w-[900px] max-h-[700px]"
                src={setImageByFormat(file)}
                alt=""
              />
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center">
            <Avatar className="w-8 h-8 mr-3">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {user?.username?.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p>{user?.username}</p>
          </div>
          <p className="text-sm text-zinc-500">
            Uploaded {formatDate(file?.created_at)}
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default FileCards;
