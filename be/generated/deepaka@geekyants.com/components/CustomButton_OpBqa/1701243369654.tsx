import React, { useState } from 'react';
import { Button, ButtonText, ButtonIcon, Spinner } from '@gluestack-ui/themed';

const CustomButton = () => {
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Here should be the business logic
    setTimeout(() => setLoading(false), 2000); // Mocking a network call
  };

  return (
    <Button action={"positive"} variant={"outline"} size={"md"} onClick={handleClick} isDisabled={isLoading}>
      {!isLoading && <ButtonText>Custom Button</ButtonText>}
      {isLoading && <Spinner />}
      <ButtonIcon name="arrow-right" />
    </Button>
  );
};

export default CustomButton;