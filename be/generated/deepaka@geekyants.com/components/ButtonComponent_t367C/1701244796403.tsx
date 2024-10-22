import React from 'react';
import {
    Button,
    ButtonGroup,
    ButtonText,
    ButtonSpinner,
    ButtonIcon,
    Icon,
    VStack
} from '@gluestack-ui/themed';
import { EditIcon, AddIcon } from 'lucide-react-native';

const ButtonComponent = () => {
    return (
        <VStack space="md">
            <ButtonGroup>
                <Button action="positive" variant="outline" size="md" isDisabled={false}>
                    <ButtonText>Primary</ButtonText>
                </Button>
                <Button action="primary" variant="solid" size="lg" isDisabled={false}>
                    <ButtonText>Secondary</ButtonText>
                </Button>
                <Button action="danger" variant="solid" size="md" isDisabled={false}>
                    <ButtonText>Danger</ButtonText>
                </Button>
                <Button action="link" variant="link" size="sm" isDisabled={false}>
                    <ButtonText>Link</ButtonText>
                </Button>
            </ButtonGroup>
            <ButtonGroup space="sm">
                <Button action="positive" variant="solid" size="md" isDisabled={false}>
                    <ButtonIcon as={AddIcon} />
                    <ButtonText>Add</ButtonText>
                </Button>
                <Button action="primary" variant="solid" size="md" isDisabled={false}>
                    <ButtonIcon as={EditIcon} />
                    <ButtonText>Edit</ButtonText>
                </Button>
            </ButtonGroup>
            <Button action="positive" variant="outline" size="md" isDisabled={false}>
                <ButtonSpinner>Processing...</ButtonSpinner>
            </Button>
        </VStack>
    );
};
export default ButtonComponent;