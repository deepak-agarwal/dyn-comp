import React from 'react';
import { Box, Button, Icon, Text } from '@gluestack-ui/themed';
import { InfoIcon } from 'lucide-react-native';

/**
 * List item component to display a single line of pricing, described by a label, value and optional Icon
 */
const Item = ({ label, value, icon }: { label: string, value: string, icon?: React.ReactNode }) => (
  <Box display="flex" justifyContent="space-between" mb="$2">
    <Box display="flex" alignItems="center">
      {icon && (
        <Box mr="$2">
          <Icon as={typeof icon === "string" ? InfoIcon : icon} />
        </Box>
      )}
      <Text>{label}</Text>
    </Box>
    <Text fontWeight="$bold">{value}</Text>
  </Box>
);

/**
 * Component to display a price breakdown
 */
const ProductPricing = () => (
  <Box p="$4" border="1px solid" borderRadius="md" width="300px">
    <Item label="Base price" value="$50.00" />
    <Item label="Discount" value="- $10.00" icon="slash" />
    <Item label="Tax (10%)" value="$5.00" icon="percentage" />
    <Item label="Shipping charges" value="$5.00" icon="truck" />
    <Box display="flex" justifyContent="space-between" mt="$4">
      <Text fontSize="lg">Total</Text>
      <Text fontSize="lg" fontWeight="$bold">$50.00</Text>
    </Box>
    <Box mt="$4" display="flex" justifyContent="center">
      <Button variant="solid" bg="$primary500">Checkout</Button>
    </Box>
  </Box>
);

export default ProductPricing;