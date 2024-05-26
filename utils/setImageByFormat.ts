import { File } from "@/types/types";

const imageFormats = ["jpg", "png", "jpeg", "svg", "gif"];
const fileFormats = ["octet-stream", "plain"];
const docx = "vnd.openxmlformats-officedocument.wordprocessingml.document";

const setImageByFormat = (file: File) => {
  if (file) {
    if (file.format === "pdf") {
      return "/pdf.png";
    } else if (file.format === docx) {
      return "/docx.png";
    } else if (fileFormats.includes(file.format)) {
      return "/txt.png";
    } else if (file.format === "yaml" || file.format === "yml") {
      return "/yaml.png";
    } else if (imageFormats.includes(file.format)) {
      return file.file;
    }
  }
};

export default setImageByFormat;
