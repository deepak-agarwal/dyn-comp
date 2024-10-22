import React from 'react';
import { Box, Button, ButtonText, HStack, Icon, Link } from '@gluestack-ui/themed';
import { HomeIcon, SettingsIcon } from 'lucide-react-native';

const NavigationBar = () => {
  return (
    <Box bg='$primary500' p='$5'>
      <HStack space="lg">
        <Link href="/home">
          <Icon as={HomeIcon} color="$neutral800" />
        </Link>
        <Link href="/settings">
          <Icon as={SettingsIcon} color="$neutral800" />
        </Link>
        <Button action={"primary"} size={"md"}>
          <ButtonText>React Button</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default NavigationBar;