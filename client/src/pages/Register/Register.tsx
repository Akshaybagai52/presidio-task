import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  role: Yup.string().oneOf(['buyer', 'seller']).required('Role is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number is not valid')
    .required('Phone number is required'),
  password: Yup.string()
    .min(4, 'Password too short')
    .required('Password is required')
})

const Register: React.FC = () => {
  const navigateTo = useNavigate()
  const toast = useToast()

  // const {login} = useAuth();
  return (
    <Box
      maxW='md'
      mx='auto'
      mt={10}
      p={5}
      borderWidth={1}
      borderRadius='lg'
      boxShadow='lg'
    >
      <Heading as='h1' mb={6} textAlign='center'>
        Register
      </Heading>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          role: '',
          email: '',
          phoneNumber: '',
          password: ''
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const bodyData = {
              name: values.firstName,
              email: values.email,
              password: values.password,
              role: values.role
            }
            const response = await fetch(
              `${import.meta.env.VITE_BACKEND_URI}/api/auth/register`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
              }
            )
            await response.json()
            if (response.ok) {
              setSubmitting(false)
              resetForm()
              toast({
                title: 'Success',
                description: 'User is registered Successfully',
                status: 'success',
                duration: 5000,
                isClosable: true
              })
              navigateTo('/login')
            }
          } catch (error) {
            console.error(error)
            setSubmitting(false)
            toast({
              title: 'Error',
              description: 'Something went wrong. Please try again later.',
              status: 'error',
              duration: 5000,
              isClosable: true
            })
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                <FormLabel htmlFor='firstName'>First Name</FormLabel>
                <Field as={Input} id='firstName' name='firstName' />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                <Field as={Input} id='lastName' name='lastName' />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.role && touched.role}>
                <FormLabel htmlFor='role'>Role</FormLabel>
                <Field
                  as={Select}
                  id='role'
                  name='role'
                  placeholder='Select role'
                >
                  <option value='buyer'>Buyer</option>
                  <option value='seller'>Seller</option>
                </Field>
                <FormErrorMessage>{errors.role}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Field as={Input} id='email' name='email' type='email' />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.phoneNumber && touched.phoneNumber}
              >
                <FormLabel htmlFor='phoneNumber'>Phone Number</FormLabel>
                <Field as={Input} id='phoneNumber' name='phoneNumber' />
                <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Field
                  as={Input}
                  id='password'
                  name='password'
                  type='password'
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Box alignContent='start' width='100%' color='blue'>
                <Link to='/login'>Login</Link>
              </Box>

              <Button
                mt={6}
                type='submit'
                width='100%'
                variant='outline'
                colorScheme='teal'
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default Register
