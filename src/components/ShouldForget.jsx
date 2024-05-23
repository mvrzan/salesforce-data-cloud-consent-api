import { useState } from "react";
import {
  Flex,
  Input,
  Spacer,
  Button,
  Divider,
  InputGroup,
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";

import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import { getShouldForget } from "../utils/client/get-should-forget";
import { patchShouldForget } from "../utils/client/patch-should-forget";

const ShouldForget = () => {
  const [userEmail, setUserEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleUserEmail = (event) => {
    setUserEmail(event.target.value);
    setError(event.target.value);
  };

  const handleGetShouldForget = async () => {
    const response = await getShouldForget(userEmail);

    setCode(response);
  };

  const handlePatchShouldForget = async () => {
    const response = await patchShouldForget(userEmail);

    setCode(response);
  };

  const handleClear = async () => {
    setCode("");
    setUserEmail("");
  };

  return (
    <FormControl>
      <FormLabel htmlFor="serviceUserEmail" marginTop="20px">
        User email
      </FormLabel>
      <InputGroup size="md">
        <Input
          id="user-email-address-should-forget"
          pr="4.5rem"
          type="email"
          placeholder="jdoe@example.com"
          value={userEmail}
          onChange={handleUserEmail}
        />
      </InputGroup>
      <FormHelperText>
        Email of the user whose "should forget" status you are going to check or
        update.
      </FormHelperText>

      {code && (
        <Divider marginBottom="30px" marginTop="30px" borderBottomWidth="2px" />
      )}
      {code && (
        <FormLabel as="legend" marginTop="20px">
          API response
        </FormLabel>
      )}
      {code && <JsonView src={code} />}
      {code && (
        <Divider marginBottom="30px" marginTop="30px" borderBottomWidth="2px" />
      )}

      <Flex marginTop="20px" minWidth="max-content" alignItems="center" gap="4">
        <Spacer />
        <Button mt={4} colorScheme="gray" type="submit" onClick={handleClear}>
          Clear
        </Button>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          isDisabled={!error}
          onClick={handlePatchShouldForget}
        >
          UPDATE ShouldForget status
        </Button>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          onClick={handleGetShouldForget}
          isDisabled={!error}
        >
          GET ShouldForget status
        </Button>
      </Flex>
    </FormControl>
  );
};

export default ShouldForget;
