import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useColorModeValue } from "@/components/ui/color-mode";

export function Page(props: { children: ReactNode }) {
  const pageBg = useColorModeValue("#F3F2F2", "gray.950");
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={pageBg}>
      <Header />
      <Box as="main" flex="1">
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
}
