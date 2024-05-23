import {
  Tab,
  Box,
  Tabs,
  Card,
  Flex,
  HStack,
  Heading,
  TabList,
  TabPanel,
  CardBody,
  TabPanels,
  CardHeader,
  ChakraProvider,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

import Processing from "../components/Processing";
import Portability from "../components/Portability";
import ShouldForget from "../components/ShouldForget";
import ApiCredentials from "../components/ApiCredentials";

const ConfigurationScreen = () => {
  return (
    <ChakraProvider>
      <Flex justifyContent="center" alignItems="center" marginTop="20px">
        <Box w="50%" margin="20px">
          <Card size="lg" h="auto">
            <CardHeader>
              <HStack spacing="10px">
                <SettingsIcon boxSize="6" />
                <Heading size="lg">Configuration</Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              <Tabs isFitted>
                <TabList>
                  <Tab>API credentials</Tab>
                  <Tab>Should Forget</Tab>
                  <Tab>Processing</Tab>
                  <Tab>Portability</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <ApiCredentials />
                  </TabPanel>
                  <TabPanel>
                    <ShouldForget />
                  </TabPanel>
                  <TabPanel>
                    <Processing />
                  </TabPanel>
                  <TabPanel>
                    <Portability />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default ConfigurationScreen;
