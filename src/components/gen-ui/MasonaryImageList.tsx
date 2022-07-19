import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IProject from 'src/types/IProject';
import { FC } from 'react';

interface IProps{
    projects :IProject[] 
}

const MasonryImageList : FC<IProps>= ({projects}) => {
  return (
    <Box sx={{ width: 500 }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {projects.map((project,i) => (
          <ImageListItem key={i}>
            <img
              src={`${project.imgUrl}?w=248&fit=crop&auto=format`}
              srcSet={`${project.imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={project.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default MasonryImageList;