import { Box, Container, Heading, HStack, Image, Link, Stack, Text } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import salesforceLogo from "@/assets/salesforce_logo.svg";
import dataCloudLogo from "@/assets/data_cloud_logo.png";
import herokuLogo from "@/assets/heroku.webp";

export function Header() {
  return (
    <Box as="header" bg="#0176D3" color="white" borderBottomWidth="1px" borderBottomColor="#0B5CAB" boxShadow="sm">
      <Container maxW="4xl" py="4">
        <HStack justify="space-between" align="center" gap="6">
          <HStack gap="3" minW="0">
            <HStack gap="2" flexShrink={0}>
              <Box
                bg="white"
                borderRadius="lg"
                px="2"
                py="1"
                boxShadow="sm"
                borderWidth="1px"
                borderColor="rgba(0,0,0,0.06)"
              >
                <Image src={salesforceLogo} alt="Salesforce" height="7" />
              </Box>
              <Box
                bg="white"
                borderRadius="lg"
                px="2"
                py="1"
                boxShadow="sm"
                borderWidth="1px"
                borderColor="rgba(0,0,0,0.06)"
              >
                <Image src={dataCloudLogo} alt="Salesforce Data Cloud 360" height="7" />
              </Box>
            </HStack>
            <Stack gap="0" minW="0">
              <Heading size="md" letterSpacing="tight">
                Consent API Demo
              </Heading>
              <Text color="rgba(255,255,255,0.85)" fontSize="sm">
                Processing • Delete • Export
              </Text>
            </Stack>
          </HStack>

          <HStack gap="2" flexShrink={0}>
            <Link
              href="https://www.heroku.com"
              target="_blank"
              rel="noreferrer"
              display={{ base: "none", sm: "block" }}
            >
              <Box
                bg="rgba(255,255,255,0.14)"
                borderWidth="1px"
                borderColor="rgba(255,255,255,0.22)"
                borderRadius="lg"
                px="2"
                py="1"
              >
                <Image src={herokuLogo} alt="Heroku" height="7" />
              </Box>
            </Link>
            <ColorModeButton variant="solid" bg="rgba(255,255,255,0.14)" _hover={{ bg: "rgba(255,255,255,0.22)" }} />
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
