import React from 'react';
import styled from 'styled-components';

import { Button, Icon } from '@gluestack-ui/themed';
import { ArrowRightIcon } from 'lucide-react';

const StyledButton = styled(Button)`
  border-radius: 3px;
  font-family: 'Arial';
  font-size: 18px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;

  &:hover {
    background-color: #888;
  }
  
  &:active {
    transform: scale(0.95);
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(Icon)`
  margin-left: 10px;
`;

export const CreativeButton = () => {
  return (
    <StyledButton action="positive" variant="outline" size="md">
      Button Text
      <ButtonIcon as={ArrowRightIcon} />
    </StyledButton>
  );
};