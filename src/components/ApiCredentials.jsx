import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";

const ApiCredentials = () => {
  const [serviceUserEmail, setServiceUserEmail] = useState(false);
  const [serviceUserPassword, setServiceUserPassword] = useState(false);
  const [clientId, setClientId] = useState(false);
  const [clientSecret, setClientSecret] = useState(false);
  const [serviceUserSecurityToken, setServiceUserSecurityToken] =
    useState(false);
  const [salesforceInstanceUrl, setSalesforceInstanceUrl] = useState(false);
  const [salesforceApiVersion, setSalesforceApiVersion] = useState(false);
  const [unifiedIndividualDmoApi, setUnifiedIndividualDmoApi] = useState(false);
  const [unifiedContactPointEmailDmo, setUnifiedContactPointEmailDmo] =
    useState(false);

  const handleServiceUserEmail = () => setServiceUserEmail(!serviceUserEmail);
  const handleServiceUserPassword = () =>
    setServiceUserPassword(!serviceUserPassword);
  const handleClientId = () => setClientId(!clientId);
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

  return (
    <FormControl>
      <FormLabel htmlFor="serviceUserEmail" marginTop="20px">
        Service user username
      </FormLabel>
      <InputGroup size="md">
        <Input
          id="serviceUserEmail"
          pr="4.5rem"
          type={serviceUserEmail ? "text" : "password"}
          placeholder="jdoe@example.com"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleServiceUserEmail}>
            {serviceUserEmail ? "Hide" : "Show"}
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
          type={serviceUserPassword ? "text" : "password"}
          placeholder="password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleServiceUserPassword}>
            {serviceUserPassword ? "Hide" : "Show"}
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
          type={clientId ? "text" : "password"}
          placeholder="client ID"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClientId}>
            {clientId ? "Hide" : "Show"}
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
          type={clientSecret ? "text" : "password"}
          placeholder="Client secret"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClientSecret}>
            {clientSecret ? "Hide" : "Show"}
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
          type={serviceUserSecurityToken ? "text" : "password"}
          placeholder="Security token"
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleServiceUserSecurityToken}
          >
            {serviceUserSecurityToken ? "Hide" : "Show"}
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
          type={salesforceInstanceUrl ? "text" : "password"}
          placeholder="https://my-test-instance.my.salesforce.com"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleSalesforceInstanceUrl}>
            {salesforceInstanceUrl ? "Hide" : "Show"}
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
          type={salesforceApiVersion ? "text" : "password"}
          placeholder="v60.0"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleSalesforceApiVersion}>
            {salesforceApiVersion ? "Hide" : "Show"}
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
          type={salesforceApiVersion ? "text" : "password"}
          placeholder="UnifiedssotIndividualPat"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleUnifiedIndividualDmoApi}>
            {unifiedIndividualDmoApi ? "Hide" : "Show"}
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
          type={unifiedContactPointEmailDmo ? "text" : "password"}
          placeholder="UnifiedssotContactPointEmailPat"
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleUnifiedContactPointEmailDmo}
          >
            {unifiedContactPointEmailDmo ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>
        The API name of the Unified Contact Point Email DMO within your Data
        Cloud instance.
      </FormHelperText>
    </FormControl>
  );
};

export default ApiCredentials;
