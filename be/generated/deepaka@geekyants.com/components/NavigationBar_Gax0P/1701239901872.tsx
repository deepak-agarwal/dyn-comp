import React from 'react';
import { HStack, ButtonText, Button, Icon, Text } from '@gluestack-ui/themed';
import { Home, About, Services, Contact, Search } from 'lucide-react-native';

const NavigationBar = () => {
  return (
    <HStack space="lg">
      <Button action={"primary"} size={"md"}>
        <Icon as={Home} />
        <ButtonText>Home</ButtonText>
      </Button>
      <Button action={"primary"} size={"md"}>
        <Icon as={About} />
        <ButtonText>About</ButtonText>
      </Button>
      <Button action={"primary"} size={"md"}>
        <Icon as={Services} />
        <ButtonText>Services</ButtonText>
      </Button>
      <Button action={"primary"} size={"md"}>
        <Icon as={Contact} />
        <ButtonText>Contact</ButtonText>
      </Button>
      <Button action={"primary"} size={"md"}>
        <Icon as={Search} />
      </Button>
    </HStack>
  );
};

export default NavigationBar;