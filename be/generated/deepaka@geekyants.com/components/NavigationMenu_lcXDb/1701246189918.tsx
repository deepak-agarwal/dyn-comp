import React from 'react';
import { HStack, Box, Icon, Link, LinkText } from '@gluestack-ui/themed';
import InfoIcon from '@material-ui/icons/Info';       // corrected this
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ServicesIcon from '@material-ui/icons/Build';
import ContactIcon from '@material-ui/icons/ContactMail';
import LoginIcon from '@material-ui/icons/ExitToApp';

const NavigationMenu: React.FC = () => {
  return (
    <Box bg='primary' p='2' shadow='sm'>
      <HStack>
        <Link href="#">
          <HStack spacing='3'>
            <Icon as={HomeIcon} color="white"/>
            <LinkText color="white">Home</LinkText>
          </HStack>
        </Link>
        <Link href="#">
          <HStack spacing='3'>
            <Icon as={InfoIcon} color="white"/>        // and corrected this
            <LinkText color="white">About</LinkText>
          </HStack>
        </Link>
        <Link href="#">
          <HStack spacing='3'>
            <Icon as={ServicesIcon} color="white"/>
            <LinkText color="white">Services</LinkText>
          </HStack>
        </Link>
        <Link href="#">
          <HStack spacing='3'>
            <Icon as={ContactIcon} color="white"/>
            <LinkText color="white">Contact</LinkText>
          </HStack>
        </Link>
        <Link href="#">
          <HStack spacing='3'>
            <Icon as={LoginIcon} color="white"/>
            <LinkText color="white">Login</LinkText>
          </HStack>
        </Link>
      </HStack>
    </Box>
  );
}

export default NavigationMenu;