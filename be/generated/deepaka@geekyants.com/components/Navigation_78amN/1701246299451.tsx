import React from 'react';
import { Box, HStack, Button, ButtonText, Input, InputField, InputIcon, InputSlot, Popover, PopoverBackdrop, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverCloseButton, Icon } from '@gluestack-ui/themed';
import { HomeIcon, SearchIcon, UserIcon, MoreVerticalIcon } from 'lucide-react-native';

const Navigation = () => {
  return (
    <Box bg='$primary500' p='$5'>
      <HStack>
        {/* Home Button */}
        <Button action={"primary"}>
          <Icon as={HomeIcon} />
          <ButtonText>Home</ButtonText>
        </Button>

        {/* Navigation Buttons */}
        <Button action={"primary"}>
          <ButtonText>Page 1</ButtonText>
        </Button>
        <Button action={"primary"}>
          <ButtonText>Page 2</ButtonText>
        </Button>
        <Button action={"primary"}>
          <ButtonText>Page 3</ButtonText>
        </Button>

        {/* Search Input */}
        <Input size={"sm"} variant={"outline"}>
          <InputIcon as={SearchIcon} />
          <InputField placeholder="Search..." />
        </Input>

        {/* User Profile Dropdown */}
        <Popover
          trigger={(triggerProps) => {
            return (
              <Button {...triggerProps}>
                <Icon as={UserIcon} />
              </Button>
            );
          }}
        >
          <PopoverBackdrop />
          <PopoverContent>
            <PopoverHeader>
              <Icon as={UserIcon} />
            </PopoverHeader>
            <PopoverBody>
              <Button variant='outline' action='secondary'>
                <ButtonText>Profile</ButtonText>
              </Button>
              <Button variant='outline' action='secondary'>
                <ButtonText>Settings</ButtonText>
              </Button>
              <Button variant='outline' action='secondary'>
                <ButtonText>Logout</ButtonText>
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Box>
  );
};

export default Navigation;