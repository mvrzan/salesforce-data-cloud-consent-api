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
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react";

const ApiCredentials = () => {
  const [serviceUserEmail, setServiceUserEmail] = useState("");
  const [showServiceUserEmail, setShowServiceUserEmail] = useState(false);
  const [serviceUserPassword, setServiceUserPassword] = useState("");
  const [showServiceUserPassword, setShowServiceUserPassword] = useState(false);
  const [clientId, setClientId] = useState("");
  const [showClientId, setShowClientId] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [serviceUserSecurityToken, setServiceUserSecurityToken] = useState("");
  const [showServiceUserSecurityToken, setShowServiceUserSecurityToken] =
    useState(false);
  const [salesforceInstanceUrl, setSalesforceInstanceUrl] = useState("");
  const [showSalesforceInstanceUrl, setShowSalesforceInstanceUrl] =
    useState(false);
  const [salesforceApiVersion, setSalesforceApiVersion] = useState("");
  const [showSalesforceApiVersion, setShowSalesforceApiVersion] =
    useState(false);
  const [unifiedIndividualDmoApi, setUnifiedIndividualDmoApi] = useState("");
  const [showUnifiedIndividualDmoApi, setShowUnifiedIndividualDmoApi] =
    useState(false);
  const [unifiedContactPointEmailDmo, setUnifiedContactPointEmailDmo] =
    useState("");
  const [showUnifiedContactPointEmailDmo, setShowUnifiedContactPointEmailDmo] =
    useState(false);
  const [showAllValues, setShowAllValues] = useState(false);

  const handleServiceUserEmail = () =>
    setShowServiceUserEmail(!showServiceUserEmail);
  const handleServiceUserPassword = () =>
    setShowServiceUserPassword(!showServiceUserPassword);
  const handleClientId = () => setShowClientId(!showClientId);
  const handleClientSecret = () => setClientSecret(!clientSecret);
  const handleServiceUserSecurityToken = () =>
    setServiceUserSecurityToken(!serviceUserSecurityToken);
  const handleSalesforceInstanceUrl = () =>
    setSalesforceInstanceUrl(!salesforceInstanceUrl);
  const handleSalesforceApiVersion = () =>
    setSalesforceApiVersion(!salesforceApiVersion);
  const handleUnifiedIndividualDmoApi = () =>
    setUnifiedIndividualDmoApi(!unifiedIndividualDmoApi);
  const handleUnifiedContactPointEmailDmo = () =>
    setUnifiedContactPointEmailDmo(!unifiedContactPointEmailDmo);

  const handleAllValues = (showAll) => {
    setShowServiceUserEmail(showAll);
    setShowServiceUserPassword(showAll);
    setShowClientId(showAll);
    setShowClientSecret(showAll);
    setShowServiceUserSecurityToken(showAll);
    setShowSalesforceInstanceUrl(showAll);
    setShowSalesforceApiVersion(showAll);
    setShowUnifiedIndividualDmoApi(showAll);
    setShowUnifiedContactPointEmailDmo(showAll);
    setShowAllValues(!showAllValues);
  };

  const handleCleanAllValues = () => {
    setServiceUserEmail("");
    setShowServiceUserEmail(false);
    setServiceUserPassword("");
    setShowServiceUserPassword(false);
    setClientId("");
    setShowClientId(false);
    setClientSecret("");
    setShowClientSecret(false);
    setServiceUserSecurityToken("");
    setShowServiceUserSecurityToken(false);
    setSalesforceInstanceUrl("");
    setShowSalesforceInstanceUrl(false);
    setSalesforceApiVersion("");
    setShowSalesforceApiVersion(false);
    setUnifiedIndividualDmoApi("");
    setShowUnifiedIndividualDmoApi(false);
    setUnifiedContactPointEmailDmo("");
    setShowUnifiedContactPointEmailDmo(false);
    setShowAllValues(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <FormControl>
      <FormLabel htmlFor="serviceUserEmail" marginTop="20px">
        Service username
      </FormLabel>
      <InputGroup size="md">
        <Input
          id="serviceUserEmail"
          pr="4.5rem"
          type={showServiceUserEmail ? "email" : "password"}
          placeholder="jdoe@example.com"
          value={serviceUserEmail}
          onChange={(e) => setServiceUserEmail(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleServiceUserEmail}>
            {showServiceUserEmail ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        Email of the user that will be used for making API calls to Salesforce.
      </FormHelperText>

      <Divider marginBottom="30px" marginTop="30px" borderBottomWidth="2px" />
      <FormLabel htmlFor="serviceUserPassword">Service user password</FormLabel>
      <InputGroup size="md">
        <Input
          id="serviceUserPassword"
          pr="4.5rem"
          type={showServiceUserPassword ? "text" : "password"}
          placeholder="password"
          value={serviceUserPassword}
          onChange={(e) => setServiceUserPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleServiceUserPassword}>
            {showServiceUserPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        Password of the user that will be used for making API calls to
        Salesforce.
      </FormHelperText>

      <Divider marginBottom="30px" marginTop="30px" borderBottomWidth="2px" />
      <FormLabel htmlFor="clientId">Client ID</FormLabel>
      <InputGroup size="md">
        <Input
          id="clientId"
          pr="4.5rem"
          type={showClientId ? "text" : "password"}
          placeholder="client ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClientId}>
            {showClientId ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        The ID of the client configuration within Salesforce.
      </FormHelperText>

      <Divider marginBottom="30px" marginTop="30px" borderBottomWidth="2px" />
      <FormLabel htmlFor="clientSecret">Client secret</FormLabel>
      <InputGroup size="md">
        <Input
          id="clientSecret"
          pr="4.5rem"
          type={showClientSecret ? "text" : "password"}
          placeholder="Client secret"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClientSecret}>
            {showClientSecret ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        The secret of the client configuration within Salesforce.
      </FormHelperText>

      <Divider marginBottom="30px" marginTop="30px" borderBottomWidth="2px" />
      <FormLabel htmlFor="serviceUserSecurityToken">
        Service user security token
      </FormLabel>
      <InputGroup size="md">
        <Input
          id="serviceUserSecurityToken"
          pr="4.5rem"
          type={showServiceUserSecurityToken ? "text" : "password"}
          placeholder="Security token"
          value={serviceUserSecurityToken}
          onChange={(e) => setServiceUserSecurityToken(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleServiceUserSecurityToken}
          >
            {showServiceUserSecurityToken ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        The security token of the user that will be used for making API calls to
        Salesforce.
      </FormHelperText>

      <Divider marginBottom="30px" marginTop="30px" borderBottomWidth="2px" />
      <FormLabel htmlFor="salesforceInstanceUrl">
        Salesforce instance URL
      </FormLabel>
      <InputGroup size="md">
        <Input
          id="salesforceInstanceUrl"
          pr="4.5rem"
          type={showSalesforceInstanceUrl ? "text" : "password"}
          placeholder="https://my-test-instance.my.salesforce.com"
          value={salesforceInstanceUrl}
          onChange={(e) => setSalesforceInstanceUrl(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleSalesforceInstanceUrl}>
            {showSalesforceInstanceUrl ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        The URL of the Salesforce instance that you want to connect to.
      </FormHelperText>

      <Divider marginBottom="30px" marginTop="30px" borderBottomWidth="2px" />
      <FormLabel htmlFor="salesforceApiVersion">
        Salesforce API version number
      </FormLabel>
      <InputGroup size="md">
        <Input
          id="salesforceApiVersion"
          pr="4.5rem"
          type={showSalesforceApiVersion ? "text" : "password"}
          placeholder="v60.0"
          value={salesforceApiVersion}
          onChange={(e) => setSalesforceApiVersion(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleSalesforceApiVersion}>
            {showSalesforceApiVersion ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        The version of the Salesforce API that you want to use.
      </FormHelperText>

      <Divider marginBottom="30px" marginTop="30px" borderBottomWidth="2px" />
      <FormLabel htmlFor="unifiedIndividualDmoApi">
        Unified Individual DMO API name
      </FormLabel>
      <InputGroup size="md">
        <Input
          id="unifiedIndividualDmoApi"
          pr="4.5rem"
          type={showUnifiedIndividualDmoApi ? "text" : "password"}
          placeholder="UnifiedssotIndividualPat"
          value={unifiedIndividualDmoApi}
          onChange={(e) => setUnifiedIndividualDmoApi(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleUnifiedIndividualDmoApi}>
            {showUnifiedIndividualDmoApi ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        The API name of the Unified Individual DMO within your Data Cloud
        instance.
      </FormHelperText>

      <Divider marginBottom="30px" marginTop="30px" borderBottomWidth="2px" />
      <FormLabel htmlFor="unifiedContactPointEmailDmo">
        Unified Contact Point Email DMO API name
      </FormLabel>
      <InputGroup size="md">
        <Input
          id="unifiedContactPointEmailDmo"
          pr="4.5rem"
          type={showUnifiedContactPointEmailDmo ? "text" : "password"}
          placeholder="UnifiedssotContactPointEmailPat"
          value={unifiedContactPointEmailDmo}
          onChange={(e) => setUnifiedContactPointEmailDmo(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleUnifiedContactPointEmailDmo}
          >
            {showUnifiedContactPointEmailDmo ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        The API name of the Unified Contact Point Email DMO within your Data
        Cloud instance.
      </FormHelperText>

      <Flex marginTop="20px" minWidth="max-content" alignItems="center" gap="4">
        <Button
          mt={4}
          colorScheme="cyan"
          type="submit"
          onClick={
            showAllValues
              ? () => handleAllValues(false)
              : () => handleAllValues(true)
          }
        >
          {showAllValues ? "Hide all values" : "Show all values"}
        </Button>
        <Spacer />
        <Button
          mt={4}
          colorScheme="gray"
          type="submit"
          onClick={handleCleanAllValues}
        >
          Clear all values
        </Button>
        <Button mt={4} colorScheme="teal" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </FormControl>
  );
};

export default ApiCredentials;
