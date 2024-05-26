"use client";
import React, { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { File, Star, Trash2 } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>("files");

  const menuItems = [
    {
      link: "/dashboard",
      text: "Files",
      icon: (
        <File
          width={18}
          fill={activeItem === "files" ? "rgb(234, 88, 12, .3)" : "transparent"}
          className="mx-2"
        />
      ),
    },
    {
      link: "/dashboard/favorites",
      text: "Favorites",
      icon: (
        <Star
          width={18}
          fill={
            activeItem === "favorites" ? "rgb(234, 88, 12, .3)" : "transparent"
          }
          className="mx-2"
        />
      ),
    },
    {
      link: "/dashboard/deleted",
      text: "Trash",
      icon: (
        <Trash2
          width={18}
          fill={
            activeItem === "trash" ? "rgb(234, 88, 12, .3)" : "transparent"
          }
          className="mx-2"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col w-[300px] min-w-[300px] min-h-[calc(100vh-55px)] p-4">
      <div className="grow">
        <Command>
          <CommandList>
            <CommandGroup heading="Menu">
              {menuItems.map((item) => (
                <CommandItem
                  key={item.link}
                  className={`
                    ${
                      item.text.toLowerCase() === activeItem
                        ? "bg-accent text-accent-foreground text-orange-600"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                    cursor-pointer text-md 
                  `}
                >
                  <Link
                    onClick={() => setActiveItem(item.text.toLowerCase())}
                    className="flex w-full h-full"
                    href={item.link}
                  >
                    {item.icon} {item.text}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default Sidebar;
