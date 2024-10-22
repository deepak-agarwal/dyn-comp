import React from 'react';
import { Button, ButtonText, ButtonIcon } from '@gluestack-ui/themed';
import { Icon } from 'lucide-react-native';

const CustomButton = () => {
    return (
        <Button action={"positive"} variant={"outline"} size={"md"}>
            <ButtonIcon>
                <Icon name="arrow-right" />
            </ButtonIcon>
            <ButtonText>Custom Button</ButtonText>
        </Button>
    );
};
export default CustomButton;