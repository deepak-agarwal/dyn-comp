import React from 'react';
import { Avatar, AvatarImage, AvatarBadge } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { Icon, CheckIcon, ExternalLinkIcon, ShareIcon, RepeatIcon, StarIcon } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';

export default function TweetCard() {
  return (
    <Box bg='$primary500' p='$5' borderWidth={2}>
      <Box display="flex" flexDirection="row">
        <Avatar size='md'>
          <AvatarImage
            source={{
              uri: 'https://example.com/profile_picture.jpg'
            }}
          />
          <AvatarBadge/>
        </Avatar>
        <Box marginLeft='1rem'>
          <Text color='white' fontWeight='extrabold'>User Name</Text>
          <Text color='white'>@username</Text>
        </Box>
      </Box>
      <Box marginTop='1rem'>
        <Text color='white'>This is a tweet content. It's the most interesting tweet you've ever seen.</Text>
      </Box>
      <Box display='flex' justifyContent='space-between' marginTop='1rem'>
        <Icon as={CommentIcon} size='1.5rem' color='white' />
        <Icon as={RepeatIcon} size='1.5rem' color='white' />
        <Icon as={StarIcon} size='1.5rem' color='white' />
        <Icon as={ExternalLinkIcon} size='1.5rem' color='white' />
      </Box>
      <Box display='flex' justifyContent='flex-end' marginTop='1rem'>
        <Text color='white'>20 min ago</Text>
      </Box>
    </Box>
  );
}