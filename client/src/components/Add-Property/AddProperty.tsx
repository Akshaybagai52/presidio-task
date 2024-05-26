import { Formik, Form, Field } from 'formik'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea
} from '@chakra-ui/react'
import * as Yup from 'yup'

const PropertySchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  location: Yup.string().required('Required'),
  image: Yup.string().url('Invalid URL').required('Required'),
  place: Yup.string().required('Required'),
  area: Yup.string().required('Required'),
  bedrooms: Yup.number().required('Required'),
  bathrooms: Yup.number().required('Required'),
  kitchens: Yup.number().required('Required'),
  nearby: Yup.string().required('Required')
})

const AddProperty: React.FC = () => {
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const token = user.token
  console.log(token)
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        price: '',
        location: '',
        image: '',
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        kitchens: '',
        nearby: ''
      }}
      validationSchema={PropertySchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await fetch('http://localhost:5000/api/properties', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
          })
          //   const data = await response.json()
          setSubmitting(false)
          resetForm()

          // Handle successful property addition (e.g., redirect to property list)
        } catch (error) {
          console.error(error)
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Box
            maxW='lg'
            mx='auto'
            mt={10}
            p={5}
            borderWidth={1}
            borderRadius='lg'
            boxShadow='lg'
            gap={4}
            display='flex'
            flexDirection='column'
          >
            <Field name='title'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={(errors?.title && touched?.title) || undefined}
                >
                  <FormLabel htmlFor='title'>Title</FormLabel>
                  <Input {...field} id='title' placeholder='Title' />
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='description'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={
                    (errors.description && touched.description) || undefined
                  }
                >
                  <FormLabel htmlFor='description'>Description</FormLabel>
                  <Textarea
                    {...field}
                    id='description'
                    placeholder='Description'
                  />
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='price'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={(errors.price && touched.price) || undefined}
                >
                  <FormLabel htmlFor='price'>Price</FormLabel>
                  <Input
                    {...field}
                    id='price'
                    placeholder='Price'
                    type='number'
                  />
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='location'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={(errors.location && touched.location) || undefined}
                >
                  <FormLabel htmlFor='location'>Location</FormLabel>
                  <Input {...field} id='location' placeholder='Location' />
                  <FormErrorMessage>{errors.location}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='image'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={(errors.image && touched.image) || undefined}
                >
                  <FormLabel htmlFor='image'>Image URL</FormLabel>
                  <Input
                    {...field}
                    id='image'
                    placeholder='Image URL'
                    type='url'
                  />
                  <FormErrorMessage>{errors.image}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='place'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={(errors.place && touched.place) || undefined}
                >
                  <FormLabel htmlFor='place'>Place</FormLabel>
                  <Input {...field} id='place' placeholder='Place' />
                  <FormErrorMessage>{errors.place}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='area'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={(errors.area && touched.area) || undefined}
                >
                  <FormLabel htmlFor='area'>Area</FormLabel>
                  <Input {...field} id='area' placeholder='Area' />
                  <FormErrorMessage>{errors.area}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='bedrooms'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={(errors.bedrooms && touched.bedrooms) || undefined}
                >
                  <FormLabel htmlFor='bedrooms'>Bedrooms</FormLabel>
                  <Input
                    {...field}
                    id='bedrooms'
                    placeholder='Bedrooms'
                    type='number'
                  />
                  <FormErrorMessage>{errors.bedrooms}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='bathrooms'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={
                    (errors.bathrooms && touched.bathrooms) || undefined
                  }
                >
                  <FormLabel htmlFor='bathrooms'>Bathrooms</FormLabel>
                  <Input
                    {...field}
                    id='bathrooms'
                    placeholder='Bathrooms'
                    type='number'
                  />
                  <FormErrorMessage>{errors.bathrooms}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='kitchens'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={(errors.kitchens && touched.kitchens) || undefined}
                >
                  <FormLabel htmlFor='kitchens'>Kitchens</FormLabel>
                  <Input
                    {...field}
                    id='kitchens'
                    placeholder='Kitchens'
                    type='number'
                  />
                  <FormErrorMessage>{errors.kitchens}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='nearby'>
              {({ field }: { field: any }) => (
                <FormControl
                  isInvalid={(errors.nearby && touched.nearby) || undefined}
                >
                  <FormLabel htmlFor='nearby'>Nearby Places</FormLabel>
                  <Input {...field} id='nearby' placeholder='Nearby Places' />
                  <FormErrorMessage>{errors.nearby}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting}
              type='submit'
            >
              Add Property
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default AddProperty
