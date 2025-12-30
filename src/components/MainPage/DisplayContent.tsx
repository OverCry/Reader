import DirectoryContext from '@MainContext';
import { FormControlLabel, Slide, Switch } from '@mui/material';
import { Stack } from '@mui/system';
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { FileWithPath } from 'react-dropzone/.';
import { FileWithDeconstruction } from '../../Support/typing';
import style from './DisplayContent.module.css';

const delimiter = '/';

const checkIndexAtDifferent = (checkers: string[][]): number | null => {
  if (checkers.length === 0) {
    return null;
  }
  let index = 0;
  while (checkers[0][index] !== undefined) {
    const checkAgainst = checkers[0][index];
    if (checkers.every(val => val[index] === checkAgainst)) {
      index++;
    } else {
      return index;
    }
  }
  return index;
};

const splitArrayByIndex = (arr: FileWithDeconstruction[], index: number): FileWithDeconstruction[][] => {
  const options = [...new Set(arr.map(val => val.path[index]))];
  const localJoin = options.map(option => {
    const localContainment = arr.filter(val => val.path[index] === option);
    return localContainment;
  });

  return localJoin;
};

const separateFilesByDirectory = (
  content: FileWithPath[],
  updateIndex: Dispatch<SetStateAction<number>>,
): (FileWithDeconstruction[] | FileWithDeconstruction[][])[] => {
  if (content.length === 0) {
    return [];
  }

  const deconstruction: FileWithDeconstruction[] = content.map(file => {
    return {
      file,
      path: file.path?.split(delimiter) ?? [],
    };
  });

  const paths: string[][] = deconstruction.map(val => val.path);
  const indexAtDifferent = checkIndexAtDifferent(paths);

  if (indexAtDifferent === null) {
    return [];
  }
  updateIndex(indexAtDifferent);
  const sortedContent = deconstruction.sort((a, b) => {
    return a.path.join(delimiter).localeCompare(b.path.join(delimiter), undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });

  const firstSplit = splitArrayByIndex(sortedContent, indexAtDifferent);

  const secondSplit = firstSplit.map(each => {
    const maxIndex = (each[0].path ?? []).length - 1;
    if (indexAtDifferent + 1 !== maxIndex) {
      const splittedArray = splitArrayByIndex(each, indexAtDifferent + 1);
      return splittedArray.map(arr => arr);
    }
    return each;
  });

  return secondSplit;
};

const DisplayContent = () => {
  const { files } = useContext(DirectoryContext);

  const [visibleFiles, setVisibleFiles] = useState<FileWithDeconstruction[]>([]);
  const [viewAll, setViewAll] = useState<boolean>(true);
  const [baseIndex, setBaseIndex] = useState<number>(0);

  const sortedFiles = useMemo(() => {
    if (files !== undefined && files.length > 0) {
      return separateFilesByDirectory(files, setBaseIndex);
    }
    return [];
  }, [files]);

  const firstLevelOptions = useMemo(() => {
    const all = [
      ...new Set(
        sortedFiles
          .map(val => {
            if (Array.isArray(val) && Array.isArray(val[0])) {
              const options = val.map(specific =>
                (specific as FileWithDeconstruction[]).map(inside => {
                  return inside.path[baseIndex];
                }),
              );
              return options;
              // FileWithDeconstruction[][]
            } else {
              // FileWithDeconstruction[]
              const options = val.map(specific => (specific as FileWithDeconstruction).path[baseIndex]);
              return options;
            }
          })
          .flat(2),
      ),
    ];
  }, [sortedFiles, baseIndex]);

  useEffect(() => {
    if (sortedFiles) {
      if (viewAll) {
        setVisibleFiles(sortedFiles.flat(2));
      } else {
        // calclulate approprate view
        setVisibleFiles([]);
      }
    } else {
      setVisibleFiles([]);
    }
  }, [sortedFiles, viewAll]);

  const options = {
    viewAllOption: (
      <FormControlLabel
        control={<Switch value={viewAll} onChange={() => setViewAll(val => !val)} />}
        label='View All'
      />
    ),
  };

  return (
    <Stack
      direction='column'
      spacing={2}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* {options.viewAllOption} */}
      <div className={style.content}>
        {visibleFiles?.map((fileFormat, i) => {
          const content = fileFormat.file;
          return <img className={style.content} alt={content.name} key={i} src={URL.createObjectURL(content)} />;
        })}
      </div>
    </Stack>
  );
};

export default DisplayContent;
