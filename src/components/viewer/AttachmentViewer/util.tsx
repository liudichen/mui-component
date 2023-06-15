import { IconExcelColorful, IconFileColorful, IconImageColorful, IconPdfColorful, IconPptColorful, IconVideoColorful, IconWordColorful, IconZipColorful } from '@iimm/icons';

export const getFileInfo = (file: string, iconSize = 24) => {
  const info = {
    fileName: file.slice(file.lastIndexOf('/') + 1),
    icon: <IconFileColorful size={iconSize} />,
    view: false,
    type: 'file',
  };
  const last = file.lastIndexOf('.');
  if (last !== -1) {
    const ext = file.slice(last + 1).toLowerCase();
    switch (ext) {
      case 'pdf':
        info.type = 'pdf';
        info.view = true;
        info.icon = <IconPdfColorful size={iconSize} />;
        break;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'bmp':
      case 'ico':
        info.type = 'image';
        info.view = true;
        info.icon = <IconImageColorful size={iconSize} />;
        break;
      case 'mp4':
        info.type = 'video';
        info.view = true;
        info.icon = <IconVideoColorful size={iconSize} />;
        break;
      case 'doc':
      case 'docx':
        info.type = 'word';
        info.icon = <IconWordColorful size={iconSize} />;
        break;
      case 'xls':
      case 'xlsx':
        info.type = 'excel';
        info.icon = <IconExcelColorful size={iconSize} />;
        break;
      case 'ppt':
      case 'pptx':
        info.type = 'ppt';
        info.icon = <IconPptColorful size={iconSize} />;
        break;
      case 'zip':
      case 'rar':
      case '7z':
      case 'rar4':
        info.type = 'zip';
        info.icon = <IconZipColorful size={iconSize} />;
        break;
      default:
        break;
    }
  }
  return info;
};
