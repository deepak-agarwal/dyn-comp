import React from 'react';
import { Box, Text, Badge } from '@gluestack-ui/themed';

// Single pricing line item component
const PricingItem = ({ label, value }: { label: string, value: string }) => (
  <Box display="flex" justifyContent="space-between" mb="$2">
    <Text>{label}</Text>
    <Text fontWeight="$bold">{value}</Text>
  </Box>
);

// Price Badge Component
const PriceBadge = ({ label, value }: { label: string, value: string }) => (
  <Box my="$2">
    <Badge>
      <Text>{label}</Text>
      <Text ml="$1">{value}</Text>
    </Badge>
  </Box>
);

// Product Pricing Component
const ProductPricing = () => (
  <Box p="$4" border="1px solid" borderRadius="md" width="300px">
    <Text fontWeight="bold" fontSize="xl" mb="$4">Product Pricing</Text>
    <PricingItem label="Base price" value="$50.00" />
    <PriceBadge label="Discount" value="- $10.00" />
    <PricingItem label="Sub Total" value="$40.00" />
    <PricingItem label="Tax (10%)" value="$4.00" />
    <PricingItem label="Shipping charges" value="$5.00" />
    <Box display="flex" justifyContent="space-between" mt="$4">
      <Text fontSize="lg" fontWeight="bold">Total</Text>
      <Text fontSize="lg" fontWeight="bold">$49.00</Text>
    </Box>
  </Box>
);

export default ProductPricing;