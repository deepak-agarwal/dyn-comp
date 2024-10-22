import React from 'react';
import { Box, Heading, Text } from '@gluestack-ui/themed';

const TextCard = () => {
  return (
    <Box
      bg="#D3D3D3"
      p="$6"
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading
        size="3xl"
        fontFamily="monospace"
        textAlign="center"
        color="#000"
      >
        Brutalist Heading
      </Heading>
      <Text
        fontSize="2xl"
        color="#000"
        fontFamily="Arial"
        marginY="$5"
        textAlign="justify"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </Box>
  );
};

export default TextCard;