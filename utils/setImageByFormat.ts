import { File } from "@/types/types";

const fileFormats: {[key: string]: string} = {
  ".avi": "/file_types/avi.png",
  ".css": "/file_types/css.png",
  ".csv": "/file_types/csv.png",
  ".docx": "/file_types/doc.png",
  ".exe": "/file_types/exe.png",
  ".html": "/file_types/html.png",
  ".iso": "/file_types/iso.png",
  ".js": "/file_types/javascript.png",
  ".json": "/file_types/json-file.png",
  ".mp3": "/file_types/mp3.png",
  ".mp4": "/file_types/mp4.png",
  ".pdf": "/file_types/pdf.png",
  ".pptx": "/file_types/ppt.png",
  ".psd": "/file_types/psd.png",
  ".txt": "/file_types/txt.png",
  ".xlsx": "/file_types/xls.png",
  ".xls": "/file_types/xls.png",
  ".xml": "/file_types/xml.png",
  ".zip": "/file_types/zip.png",
};

const setImageByFormat = (file: File) => {
  if (file) {
    if (file.format in fileFormats) {
      return fileFormats[file.format]
    } else if ([".jpg", ".png", ".jpeg", ".svg"].includes(file.format)) {
      return file.file
    } else {
      return "/file_types/file.png"
    }
  }
};

export default setImageByFormat;
