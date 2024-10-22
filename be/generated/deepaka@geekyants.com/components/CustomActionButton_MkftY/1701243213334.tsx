import React from 'react';
import { Button, ButtonText, Icon, Box } from '@gluestack-ui/themed';

const CustomActionButton = () => {
  return (
    <Box borderRadius="lg" padding="4" position={"relative"} zIndex={2} m={2} hardShadow="xl">
      <Button colorScheme="teal" size="md" borderRadius="full" m={4}>
        <Icon as={SearchIcon} color="white" marginRight={4} />
        <ButtonText color="white">Custom Action</ButtonText>
      </Button>
    </Box>
  );
};

export default CustomActionButton;