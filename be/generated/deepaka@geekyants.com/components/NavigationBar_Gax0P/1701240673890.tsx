import React from "react";
import { Box, Button, ButtonGroup, ButtonIcon, ButtonText, Card, HStack, Icon } from '@gluestack-ui/themed';
import { Home, About, Services, Contact, Search, Menu } from 'lucide-react-native';

const NavigationBar = () => {
  return (
    <Box bg='$primary500' p='$5'>
      <HStack space="lg">
        <Card>
          <ButtonGroup>
            <Button action={"primary"} size={"md"}>
              <ButtonIcon as={Home} />
              <ButtonText>Home</ButtonText>
            </Button>
          </ButtonGroup>
        </Card>
        <Card>
          <ButtonGroup>
            <Button action={"primary"} size={"md"}>
              <ButtonIcon as={About} />
              <ButtonText>About</ButtonText>
            </Button>
          </ButtonGroup>
        </Card>
        <Card>
          <ButtonGroup>
            <Button action={"primary"} size={"md"}>
              <ButtonIcon as={Services} />
              <ButtonText>Services</ButtonText>
            </Button>
          </ButtonGroup>
        </Card>
        <Card>
          <ButtonGroup>
            <Button action={"primary"} size={"md"}>
              <ButtonIcon as={Contact} />
              <ButtonText>Contact</ButtonText>
            </Button>
          </ButtonGroup>
        </Card>
        <Card>
          <ButtonGroup>
            <Button action={"primary"} size={"md"}>
              <ButtonIcon as={Search} />
            </Button>
          </ButtonGroup>
        </Card>
        <Card>
          <ButtonGroup>
            <Button action={"primary"} size={"md"}>
              <ButtonIcon as={Menu} />
              <ButtonText>More</ButtonText>
            </Button>
          </ButtonGroup>
        </Card>
      </HStack>
    </Box>
  );
};

export default NavigationBar;