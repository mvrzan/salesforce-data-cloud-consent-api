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
import { getPortability } from "../utils/client/get-portability";
import { patchPortability } from "../utils/client/patch-portability";

const Portability = () => {
  const [userEmail, setUserEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleUserEmail = (event) => {
    setUserEmail(event.target.value);
    setError(event.target.value);
  };

  const handleGetPortability = async () => {
    const response = await getPortability(userEmail);

    setCode(response);
  };

  const handlePatchPortability = async () => {
    const response = await patchPortability(userEmail);

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
          id="user-email-address-portability"
          pr="4.5rem"
          type="email"
          placeholder="jdoe@example.com"
          value={userEmail}
          onChange={handleUserEmail}
        />
      </InputGroup>
      <FormHelperText>
        Email of the user whose "portability" status you are going to check or
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
          onClick={handlePatchPortability}
        >
          Export data
        </Button>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          onClick={handleGetPortability}
          isDisabled={!error}
        >
          GET Portability status
        </Button>
      </Flex>
    </FormControl>
  );
};

export default Portability;
