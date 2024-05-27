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
  VStack,
  Heading,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(4, 'Password too short')
    .required('Password is required')
})

const Login: React.FC = () => {
  const { login } = useAuth()
  const toast = useToast()
  const navigateTo = useNavigate()
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
        Login
      </Heading>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_BACKEND_URI}/api/auth/login`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
              }
            )
            const data = await response.json()
            console.log(response, 'response')
            if (response.ok) {
              login(data) // Assuming login is a function that handles login logic
              setSubmitting(false)
              resetForm()
              toast({
                title: 'Success',
                description: 'User is authenticated',
                status: 'success',
                duration: 5000,
                isClosable: true
              })
              navigateTo('/') // Assuming navigate is a function from react-router
            } else {
              setSubmitting(false)
              toast({
                title: 'Error',
                description: 'Credentials are incorrect.',
                status: 'error',
                duration: 5000,
                isClosable: true
              })
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
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Field as={Input} id='email' name='email' type='email' />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
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
                <Link to='/register'>Signup</Link>
              </Box>

              <Button
                mt={4}
                type='submit'
                width='100%'
                variant='outline'
                colorScheme='teal'
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default Login
