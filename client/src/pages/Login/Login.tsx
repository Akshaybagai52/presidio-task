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
  Heading
} from '@chakra-ui/react'
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
              'http://localhost:5000/api/auth/login',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUzMDdjYzBkNDE5ZTEzNmNkZWU1NDkiLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzE2NzE3NTE2fQ.HvUPQFgwbUHglgTdbFvBRmBB3qVzKS8_Fk9fDiIU6q0'
                },
                body: JSON.stringify(values)
              }
            )
            const data = await response.json()
            login(data)
            setSubmitting(false)
            resetForm()
            navigateTo('/')
          } catch (error) {
            console.error(error)
            setSubmitting(false)
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
