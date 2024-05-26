import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

interface PropertyFilterProps {
  onFilter: (filters: any) => void;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ onFilter }) => {
  return (
    <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white" mb={6} maxH={550} w="25%">
      <Formik
        initialValues={{
          place: '',
          minArea: '',
          maxArea: '',
          bedrooms: '',
          bathrooms: '',
        }}
        onSubmit={(values) => {
          onFilter(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit as any}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="place">Place</FormLabel>
                <Field as={Input} id="place" name="place" placeholder="Enter place" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="minArea">Min Area (sq ft)</FormLabel>
                <Field as={Input} id="minArea" name="minArea" placeholder="Enter minimum area" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="maxArea">Max Area (sq ft)</FormLabel>
                <Field as={Input} id="maxArea" name="maxArea" placeholder="Enter maximum area" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="bedrooms">Bedrooms</FormLabel>
                <Field as={Select} id="bedrooms" name="bedrooms" placeholder="Select number of bedrooms">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </Field>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="bathrooms">Bathrooms</FormLabel>
                <Field as={Select} id="bathrooms" name="bathrooms" placeholder="Select number of bathrooms">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </Field>
              </FormControl>

              <Button type="submit" colorScheme="teal" width="100%">
                Apply Filters
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PropertyFilter;
