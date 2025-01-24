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
  pageType = "",
}: {
  user: User | null;
  file: File;
  fav?: boolean;
  files?: FilesFavorite[] | Files[] | [];
  setFiles:
    | React.Dispatch<React.SetStateAction<FilesFavorite[] | []>>
    | React.Dispatch<React.SetStateAction<Files[] | []>>;
  pageType?: string
}) => {
  return (
    <>
      <Card className="h-full shadow-md">
        <CardHeader className="pt-3 pb-0 px-5">
          <CardTitle className="flex justify-between items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-lg font-normal cursor-default max-w-[calc(100%-50px)] overflow-hidden text-ellipsis whitespace-nowrap">
                  {file?.name}{file?.format}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{file?.name}{file?.format}</p>
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
                      pageType={pageType}
                    />
                    <DropdownMenuSeparator />
                    <DeletedItem file={file} setFiles={setFiles} />
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-4">
          <Dialog>
            <DialogTrigger>
              <img
                className="rounded-md max-w-full max-h-[80px]"
                src={setImageByFormat(file)}
                alt="File"
              />
            </DialogTrigger>
            <DialogContent className="p-0">
              <img
                className="rounded-md"
                src={setImageByFormat(file)}
                alt="File"
              />
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardFooter className="flex justify-between pb-3 px-5">
          <div className="flex items-center">
            <Avatar className="w-7 h-7 mr-3">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {user?.username?.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="text-xs text-zinc-500">
            Uploaded {formatDate(file?.created_at)}
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default FileCards;
