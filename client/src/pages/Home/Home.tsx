import React, { useState, useEffect } from 'react'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import PropertyCard from '../../components/Card/PropertyCard'
import PropertyFilter from '../../components/Filter/PropertyFilter'
import Pagination from '../../components/Pagination/Pagination'
import useGetData from '../../hooks/useGetData'

const App: React.FC = () => {
  const url = 'http://localhost:5000/api/properties'
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const token = user ? user.token : null
  const { isLoading, data, error } = useGetData(url, token)

  const [filteredProperties, setFilteredProperties] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 3

  useEffect(() => {
    if (data) {
      console.log('Fetched data:', data) // Debug: log fetched data
      setFilteredProperties(data)
    }
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <p>Error:</p>
  }

  if (!data) {
    return <p>No data available.</p>
  }

  const handleFilter = (filters: any) => {
    let filtered = data

    if (filters.place) {
      filtered = filtered.filter((property: any) =>
        property.place.toLowerCase().includes(filters.place.toLowerCase())
      )
    }

    if (filters.minArea) {
      filtered = filtered.filter(
        (property: any) => parseInt(property.area) >= parseInt(filters.minArea)
      )
    }

    if (filters.maxArea) {
      filtered = filtered.filter(
        (property: any) => parseInt(property.area) <= parseInt(filters.maxArea)
      )
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(
        (property: any) => property.bedrooms === parseInt(filters.bedrooms)
      )
    }

    if (filters.bathrooms) {
      filtered = filtered.filter(
        (property: any) => property.bathrooms === parseInt(filters.bathrooms)
      )
    }

    setFilteredProperties(filtered)
    setCurrentPage(1) // Reset to the first page after filtering
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleLikeToggle = (id: string) => {
    setFilteredProperties(prevProperties =>
      prevProperties.map(property =>
        property._id === id
          ? {
              ...property,
              isLiked: !property.isLiked,
              likes: property.isLiked ? property.likes - 1 : property.likes + 1
            }
          : property
      )
    )
  }

  const startIndex = (currentPage - 1) * propertiesPerPage
  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + propertiesPerPage
  )

  console.log('Current Properties:', currentProperties) // Debug: log current properties

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)

  return (
    <Box p={5}>
      <Flex gap={5}>
        <PropertyFilter onFilter={handleFilter} />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {currentProperties.map(property => {
            console.log('Property ID:', property) // Debug: log each property ID
            return (
              <PropertyCard
                key={property._id}
                id={property._id}
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
                onLikeToggle={() => handleLikeToggle(property._id)}
                isSeller={false}
                sellerDetails={property.seller}
              />
            )
          })}
        </SimpleGrid>
      </Flex>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  )
}

export default App
