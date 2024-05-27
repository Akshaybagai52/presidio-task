import React from 'react'
import {
  Box,
  Image,
  Badge,
  Text,
  VStack,
  HStack,
  Icon,
  Stack,
  Divider,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@chakra-ui/react'
import {
  FaBed,
  FaBath,
  FaUtensils,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface PropertyCardProps {
  id: string
  image: string
  title: string
  place: string
  area: string
  bedrooms: number
  bathrooms: number
  kitchens: number
  nearby: string[]
  likes: number
  isLiked: boolean
  onLikeToggle: (id: string) => void
  isSeller: boolean
  sellerDetails?: any
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  image,
  title,
  place,
  area,
  bedrooms,
  bathrooms,
  kitchens,
  nearby,
  likes,
  isLiked,
  onLikeToggle,
  isSeller,
  sellerDetails
}) => {

  const navigateTo = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const showSellerDetails = () => {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : null
    if (!user) {
        navigateTo('/login')
    } else {
      onOpen()
    }
  }
  return (
    <Box
      maxW='sm'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='lg'
      bg='white'
      //   maxH={500}
    >
      <Image maxH={200} w='100%' src={image} alt={title} />

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {area}
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
        >
          {title}
        </Box>

        <Text color='gray.600' fontSize='sm'>
          <Icon as={FaMapMarkerAlt} mr='2' /> {place}
        </Text>

        <Stack direction='row' align='center' mt={2} spacing={4}>
          <HStack spacing={1}>
            <Icon as={FaBed} />
            <Text>{bedrooms}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaBath} />
            <Text>{bathrooms}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaUtensils} />
            <Text>{kitchens}</Text>
          </HStack>
        </Stack>

        <Divider my={4} />

        <VStack align='start'>
          <Text fontWeight='bold'>Nearby Places:</Text>
          <HStack flexWrap='wrap'>
            {nearby.map((place, index) => (
              <Badge
                key={index}
                borderRadius='full'
                px='2'
                colorScheme='purple'
              >
                {place}
              </Badge>
            ))}
          </HStack>
        </VStack>
        <HStack mt={4} justify='space-between'>
          {!isSeller && (
            <Box>
              <HStack>
                <IconButton
                  aria-label='Like'
                  icon={isLiked ? <FaHeart /> : <FaRegHeart />}
                  onClick={() => onLikeToggle(id)}
                  variant='ghost'
                  colorScheme='red'
                />
                <Text>{likes}</Text>
              </HStack>
              <Button
                mt={4}
                colorScheme='teal'
                type='submit'
                variant='outline'
                onClick={showSellerDetails}
              >
                Interested
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Seller Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {/* Render the seller details here */}
                    <p>Name: {sellerDetails?.name}</p>
                    <p>Email: {sellerDetails?.email}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          )}
        </HStack>
      </Box>
    </Box>
  )
}

export default PropertyCard
