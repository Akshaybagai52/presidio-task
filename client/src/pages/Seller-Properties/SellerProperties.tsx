import { Box } from '@chakra-ui/react'
import AddProperty from '../../components/Add-Property/AddProperty'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import BuyerProperties from '../../components/Buyer-Properties/BuyerProperties'

const SellerProperties = () => {
  return (
    <Box>
      <Tabs isLazy>
        <TabList>
          <Tab>Add Properties</Tab>
          <Tab>My Properties</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AddProperty />
          </TabPanel>
          <TabPanel>
            <BuyerProperties />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default SellerProperties
