import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, Spacer } from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'

const Navigation: React.FC = () => {
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const {logout} = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Box bg="gray.100" p={4}>
      <Flex align="center">
        <Link to="/">
          <Button variant="link" mr={4}>
            Home
          </Button>
        </Link>
        <Spacer />
        {user ? (
          <>
            {user.role === 'seller' && (
              <Link to="/seller-dashboard">
                <Button variant="link" mr={4}>
                  Seller Dashboard
                </Button>
              </Link>
            )}
            <Button onClick={handleLogout} colorScheme="red">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="link" mr={4}>
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="link" mr={4}>
                Register
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </Box>
  )
}

export default Navigation
