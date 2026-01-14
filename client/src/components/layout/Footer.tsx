import { Box, Container, HStack, Image, Link, Stack, Text } from "@chakra-ui/react";
import salesforceLogo from "@/assets/salesforce_logo.svg";
import dataCloudLogo from "@/assets/data_cloud_logo.png";
import herokuLogo from "@/assets/heroku.webp";

export function Footer() {
  return (
    <Box as="footer" py="6" bg="white" borderTopWidth="1px" borderTopColor="gray.200">
      <Container maxW="4xl">
        <HStack justify="space-between" align="center" flexWrap="wrap" gap="4">
          <Stack gap="1">
            <HStack gap="3" flexWrap="wrap">
              <Text color="gray.700" fontSize="sm" fontWeight="medium">
                Powered by
              </Text>
              <Link href="https://www.salesforce.com" target="_blank" rel="noreferrer">
                <Image src={salesforceLogo} alt="Salesforce" height="6" />
              </Link>
              <Link href="https://www.salesforce.com/products/data-cloud/" target="_blank" rel="noreferrer">
                <Image src={dataCloudLogo} alt="Salesforce Data Cloud 360" height="6" />
              </Link>
            </HStack>
          </Stack>

          <HStack gap="2">
            <Text color="gray.600" fontSize="sm">
              Built with
            </Text>
            <Link href="https://www.heroku.com" target="_blank" rel="noreferrer">
              <Image src={herokuLogo} alt="Heroku" height="6" />
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
