import {
  IconExcelColorful,
  IconFileColorful,
  IconImageColorful,
  IconPdfColorful,
  IconPptColorful,
  IconVideoColorful,
  IconWordColorful,
  IconZipColorful,
} from "@iimm/icons";
import { type UrlItem } from "./ItemBar";

export const getFileInfo = (file: UrlItem, iconSize = 24) => {
  const url = typeof file === "string" ? file : file?.url;
  if (!url || typeof url !== "string") return null;
  const urlPure = url.replace(/\?.*$/, "");
  const fileName = typeof file === "object" && !!file?.name ? file.name : null;

  const info = {
    fileName: fileName || urlPure.slice(urlPure.lastIndexOf("/") + 1),
    icon: <IconFileColorful size={iconSize} />,
    view: false,
    type: "file",
    url,
  };
  const last = urlPure.lastIndexOf(".");
  if (last !== -1) {
    const ext = urlPure.slice(last + 1).toLowerCase();
    switch (ext) {
      case "pdf":
        info.type = "pdf";
        info.view = true;
        info.icon = <IconPdfColorful size={iconSize} />;
        break;
      case "jpg":
      case "jpeg":
      case "png":
      case "bmp":
      case "ico":
        info.type = "image";
        info.view = true;
        info.icon = <IconImageColorful size={iconSize} />;
        break;
      case "mp4":
        info.type = "video";
        info.view = true;
        info.icon = <IconVideoColorful size={iconSize} />;
        break;
      case "doc":
      case "docx":
        info.type = "word";
        info.icon = <IconWordColorful size={iconSize} />;
        break;
      case "xls":
      case "xlsx":
        info.type = "excel";
        info.icon = <IconExcelColorful size={iconSize} />;
        break;
      case "ppt":
      case "pptx":
        info.type = "ppt";
        info.icon = <IconPptColorful size={iconSize} />;
        break;
      case "zip":
      case "rar":
      case "7z":
      case "rar4":
        info.type = "zip";
        info.icon = <IconZipColorful size={iconSize} />;
        break;
      default:
        break;
    }
  }
  return info;
};
