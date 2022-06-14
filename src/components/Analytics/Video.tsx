import { Box, AspectRatio, Button, Img } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const Video = (data: any) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showControl, setShowControl] = useState<boolean>(false);
  // console.log('data is', data);
  return (
    <Box objectFit='cover' width={'100%'}>
      <AspectRatio ratio={1} onMouseEnter={() => setShowControl(!showControl)}>
        <>
          {' '}
          <ReactPlayer
            className='react-player'
            url={data.data.file}
            width='100%'
            height='100%'
            playing={isPlaying}
          />
          <Box
            position={'absolute'}
            top={0}
            bottom={0}
            right={0}
            left={0}
            visibility={showControl ? 'visible' : 'hidden'}
          >
            {' '}
            <Button
              bg={'transparent'}
              _hover={{ bg: 'transparent', border: 'none' }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Img src={'/icons/play.svg'} alt={'play button'} w={12} />
            </Button>
          </Box>
        </>
      </AspectRatio>
    </Box>
  );
};

export default Video;
