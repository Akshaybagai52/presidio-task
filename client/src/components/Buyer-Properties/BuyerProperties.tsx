import { SimpleGrid } from '@chakra-ui/react'
import useGetData from '../../hooks/useGetData'
import PropertyCard from '../Card/PropertyCard'

const BuyerProperties = () => {
  const url = `${import.meta.env.VITE_BACKEND_URI}/api/properties/my-properties`
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const { isLoading, data, error } = useGetData(url, user.token)
  console.log('data: ', data)
  console.log(
    'import.meta.env.VITE_BACKEND_URI',
    import.meta.env.VITE_BACKEND_URI
  )
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <p>Error: </p>
  }

  if (!data) {
    return <p>No data available.</p>
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
      {data.map((property: any) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          image={property.image}
          title={property.title}
          place={property.place}
          area={property.area}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          kitchens={property.kitchens}
          nearby={property.nearby}
          likes={property.likes}
          isLiked={property.isLiked}
          isSeller={true}
          onLikeToggle={() => console.log('first')}
        />
      ))}
    </SimpleGrid>
  )
}

export default BuyerProperties
