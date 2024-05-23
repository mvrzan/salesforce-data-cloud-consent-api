import { Heading } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";

import Processing from "../components/Processing";
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
                    <p>four!</p>
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
