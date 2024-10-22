import React from 'react';
import { Box, Button, HStack, Icon, Link } from '@gluestack-ui/themed';
import { HomeOutlineIcon, UsersOutlineIcon, CalendarOutlineIcon, SettingsOutlineIcon } from 'lucide-react-native';

const Navigation: React.FC = () => {
    return (
        <Box sx={{ boxShadow: 1 }}>
            <Box sx={{ display: ['none', 'none', 'flex'], justifyContent: 'space-between', alignItems: 'center', py: '$3', px: '$4' }}>
                <Box sx={{ color: '\$blue500', fontSize: '\$5', fontFamily: '\$body', fontWeight: '\$bold' }}>Logo</Box>
                <Box>
                    <HStack sx={{ space: '$5' }}>
                        <Link href="#">
                            <Button startIcon={<Icon as={HomeOutlineIcon} />}>Home</Button>
                        </Link>
                        <Link href="#">
                            <Button startIcon={<Icon as={UsersOutlineIcon} />}>Users</Button>
                        </Link>
                        <Link href="#">
                            <Button startIcon={<Icon as={CalendarOutlineIcon} />}>Calendar</Button>
                        </Link>
                        <Link href="#">
                            <Button startIcon={<Icon as={SettingsOutlineIcon} />}>Settings</Button>
                        </Link>
                    </HStack>
                </Box>
            </Box>
        </Box>
    );
};

export default Navigation;