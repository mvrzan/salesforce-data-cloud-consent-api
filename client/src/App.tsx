import { useState } from "react";
import { Box, Button, Container, Heading, HStack, Icon, Input, Stack, Tabs, Text } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Page } from "@/components/layout/Page";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { ConsentOperation } from "@/lib/requestSigner";
import { getConsentStatus, updateConsent } from "@/lib/requestSigner";
import { LuMail } from "react-icons/lu";

type ActionKind = "get" | "patch";

const OPERATION_META: Record<ConsentOperation, { title: string; description: string; patchLabel: string }> = {
  processing: {
    title: "Stop Processing",
    description: "Check or opt-out of data processing.",
    patchLabel: "Stop processing (PATCH)",
  },
  shouldForget: {
    title: "Delete Data",
    description: "Request deletion (right to be forgotten).",
    patchLabel: "Delete my data (PATCH)",
  },
  portability: {
    title: "Export Data",
    description: "Request a data export (portability).",
    patchLabel: "Request export (PATCH)",
  },
};

function App() {
  const [email, setEmail] = useState("");
  const [activeOperation, setActiveOperation] = useState<ConsentOperation>("processing");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<unknown>(null);
  const canSubmit = email.trim().length > 0;

  const apiHandler = async (operation: ConsentOperation, kind: ActionKind) => {
    if (!email.trim()) {
      toaster.create({
        type: "error",
        title: "Missing email",
        description: "Enter an email to run this operation.",
      });
      return;
    }

    const key = `${operation}:${kind}`;
    setLoadingKey(key);
    setLastResponse(null);

    try {
      const data =
        kind === "get" ? await getConsentStatus({ operation, email }) : await updateConsent({ operation, email });

      setLastResponse(data);
      toaster.create({
        type: "success",
        title: "Success",
        description: `${operation} ${kind.toUpperCase()} completed.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setLastResponse({ error: message });
      toaster.create({
        type: "error",
        title: "Request failed",
        description: message,
      });
    } finally {
      setLoadingKey(null);
    }
  };

  const meta = OPERATION_META[activeOperation];
  const isLoadingGet = loadingKey === `${activeOperation}:get`;
  const isLoadingPatch = loadingKey === `${activeOperation}:patch`;

  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "gray.800");
  const subtlePanelBg = useColorModeValue("#F8F9FB", "gray.950");
  const codeBg = useColorModeValue("#0B1F33", "black");
  const codeFg = useColorModeValue("white", "white");

  return (
    <>
      <Toaster />
      <Page>
        <Box py={{ base: "6", md: "10" }}>
          <Container maxW="4xl">
            <Stack gap={{ base: "6", md: "8" }}>
              <Box
                borderWidth="1px"
                borderColor={cardBorder}
                bg={cardBg}
                borderRadius="xl"
                boxShadow="sm"
                overflow="hidden"
              >
                <Box px={{ base: "4", md: "6" }} py={{ base: "4", md: "5" }} bg={subtlePanelBg}>
                  <HStack justify="space-between" align="start" gap="6" flexWrap="wrap">
                    <Stack gap="1">
                      <Heading size="lg" letterSpacing="tight">
                        Run consent operations
                      </Heading>
                      <Text color="fg.muted">
                        Processing / Deletion / Export requests against your Consent API server.
                      </Text>
                    </Stack>
                  </HStack>
                </Box>

                <Box px={{ base: "4", md: "6" }} py={{ base: "4", md: "5" }}>
                  <Stack gap="3">
                    <Text fontWeight="semibold">User Email</Text>
                    <Input
                      id="Email input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="person@example.com"
                      size="lg"
                      bg={useColorModeValue("white", "gray.950")}
                      borderColor={useColorModeValue("gray.300", "gray.700")}
                      _focusVisible={{ borderColor: "#0176D3", boxShadow: "0 0 0 3px rgba(1,118,211,0.18)" }}
                    />
                    <HStack gap="2" color="fg.muted">
                      <Icon as={LuMail} />
                      <Text fontSize="sm">Used to look up the Individual ID in Data 360.</Text>
                    </HStack>
                  </Stack>
                </Box>
              </Box>

              <Box
                borderWidth="1px"
                borderColor={cardBorder}
                bg={cardBg}
                borderRadius="xl"
                boxShadow="sm"
                overflow="hidden"
              >
                <Tabs.Root
                  value={activeOperation}
                  onValueChange={(details) => {
                    setActiveOperation(details.value as ConsentOperation);
                    setLoadingKey(null);
                    setLastResponse(null);
                  }}
                  variant="plain"
                >
                  <Box px={{ base: "2", md: "4" }} pt={{ base: "2", md: "3" }} bg={subtlePanelBg}>
                    <Tabs.List bg={cardBg} borderWidth="1px" borderColor={cardBorder} borderRadius="lg" p="1" gap="1">
                      <Tabs.Trigger
                        value="processing"
                        borderRadius="md"
                        px="4"
                        _selected={{ bg: "#0176D3", color: "white" }}
                      >
                        Processing
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        value="shouldForget"
                        borderRadius="md"
                        px="4"
                        _selected={{ bg: "#0176D3", color: "white" }}
                      >
                        Delete
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        value="portability"
                        borderRadius="md"
                        px="4"
                        _selected={{ bg: "#0176D3", color: "white" }}
                      >
                        Export
                      </Tabs.Trigger>
                    </Tabs.List>
                  </Box>

                  <Tabs.Content value={activeOperation}>
                    <Box px={{ base: "4", md: "6" }} py={{ base: "4", md: "6" }}>
                      <Stack gap="4">
                        <Stack gap="1">
                          <Heading size="md">{meta.title}</Heading>
                          <Text color="fg.muted">{meta.description}</Text>
                        </Stack>

                        <HStack gap="3" flexWrap="wrap">
                          <Button
                            onClick={() => apiHandler(activeOperation, "get")}
                            loading={isLoadingGet}
                            disabled={!canSubmit}
                            variant="outline"
                            borderColor={useColorModeValue("gray.300", "gray.700")}
                          >
                            Get status
                          </Button>
                          <Button
                            onClick={() => apiHandler(activeOperation, "patch")}
                            loading={isLoadingPatch}
                            bg="#0176D3"
                            color="white"
                            _hover={{ bg: "#0B5CAB" }}
                            _active={{ bg: "#0B5CAB" }}
                          >
                            {meta.patchLabel}
                          </Button>
                        </HStack>

                        <Box
                          borderWidth="1px"
                          borderColor={cardBorder}
                          borderRadius="lg"
                          p="4"
                          bg={codeBg}
                          color={codeFg}
                          fontFamily="mono"
                          fontSize="sm"
                          overflowX="auto"
                          as="pre"
                          whiteSpace="pre-wrap"
                          minH="160px"
                        >
                          {lastResponse ? JSON.stringify(lastResponse, null, 2) : "Response will appear here..."}
                        </Box>
                      </Stack>
                    </Box>
                  </Tabs.Content>
                </Tabs.Root>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Page>
    </>
  );
}

export default App;
