import React from 'react';
import { Button, ButtonGroup, ButtonText, ButtonSpinner, ButtonIcon } from '@gluestack-ui/themed';
import { EditIcon, ArrowLeftIcon } from 'lucide-react-native';
import { Icon } from '@gluestack-ui/themed';
import { VStack, InputSlot, InputIcon, InputField, Input } from '@gluestack-ui/themed';

const ActionButton = () => {
  const [value, setValue] = React.useState('');

  return (
    <ButtonGroup>
      <Button action="positive" variant="outline" size="md">
        <ButtonText>
          Action Button
        </ButtonText>
        <InputSlot pr="$4">
          <InputIcon as={EditIcon} />
        </InputSlot>
      </Button>
    </ButtonGroup>
  );
};

export default ActionButton;