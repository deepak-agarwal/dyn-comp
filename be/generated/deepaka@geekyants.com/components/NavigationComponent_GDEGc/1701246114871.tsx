import React, { useState, useEffect } from 'react';
import { Box, HStack, VStack, Button, Icon } from '@gluestack-ui/themed';
import { Home, User, Search, ShoppingCart, MoreHorizontal } from 'lucide-react';

const NavigationComponent = () => {
  const [isHidden, setIsHidden] = useState(false);
  let prevScrollpos = window.pageYOffset;

  // Function to handle navbar hiding/showing on scroll
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    setIsHidden(visible);
    prevScrollpos = currentScrollPos;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box position="fixed" top="0" w="100%" display={isHidden ? 'none' : 'flex'} p="5" bg="primary500">
      <HStack justifyContent="space-between" w="full">
        <VStack>
          <Button leftIcon={<Icon as={Home} />}>Home</Button>
        </VStack>
        <VStack>
          <Button leftIcon={<Icon as={User} />}>Account</Button>
        </VStack>
        <VStack>
          <Button leftIcon={<Icon as={Search} />}>Search</Button>
        </VStack>
        <VStack>
          <Button leftIcon={<Icon as={ShoppingCart} />}>Cart</Button>
        </VStack>
        <VStack>
          <Button leftIcon={<Icon as={MoreHorizontal} />}>More</Button>
        </VStack>
      </HStack>
    </Box>
  );
};

export default NavigationComponent;