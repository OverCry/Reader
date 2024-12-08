import { FileWithPath } from 'react-dropzone';

export const cleanLocal = () => {
  localStorage.removeItem('Directory');
  localStorage.removeItem('Last');
};

export const cleanAll = () => {
  localStorage.clear();
};

export const setLastDirectory = (path: string) => {
  localStorage.setItem('Directory', path);
};

function isSerializableFile(value: unknown): value is FileWithPath {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'size' in value &&
    'type' in value &&
    'lastModified' in value &&
    'relativePath' in value &&
    'path' in value &&
    'webkitRelativePath' in value
  );
}

const fileReplacer = (key: string, value: unknown) => {
  if (isSerializableFile(value)) {
    return {
      name: value.name,
      size: value.size,
      type: value.type,
      lastModified: value.lastModified,
      relativePath: value.relativePath,
      path: value.path,
      webkitRelativePath: value.webkitRelativePath,
    };
  }
  return value;
};

export const stringifyInputs = (input: FileWithPath[]) => {
  const stringified = JSON.stringify(input, fileReplacer, 2);
  localStorage.setItem('FileList', stringified);
};

// function customReviver(key: string, value: unknown): unknown {
//   if (isSerializableFile(value)) {
//     // Convert the plain object back to a SerializableFile-like object
//     return {
//       ...value,
//       // Optionally, ensure `lastModified` is a number in case it's parsed differently
//       lastModified: Number(value.lastModified),
//     };
//   }
//   return value;
// }

// export const getStringifiedInputs = (): FileWithPath[] => {
//   const found = localStorage.getItem('FileList');
//   if (found) {
//     // const condensed = JSON.parse(found) as FileWithPath[];
//     // const condensed = JSON.parse(found, customReviver) as File[];
//     const condensed = JSON.parse(found, customReviver) as FileWithPath[];

//     console.log('condensed ', condensed);
//     const providedFormattedList: FileWithPath[] = condensed.map((file: File) => {
//       const blob = new Blob([file], { type: file.type });
//       console.log('blob', blob);
//       // Create a new File instance
//       const newFile = new File([blob], file.name, {
//         type: file.type,
//         lastModified: file.lastModified,
//       });
//       const fileMap = toFileWithPath(newFile)
//       return fileMap;
//     });
//     console.log('From ', providedFormattedList);
//     return providedFormattedList;
//   } else {
//     return [];
//   }
// };
