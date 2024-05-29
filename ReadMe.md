<a  href="https://www.salesforce.com/">
<img  src="https://a.sfdcstatic.com/shared/images/c360-nav/salesforce-with-type-logo.svg"  alt="Salesforce"  width="250"  />
</a>

# Data Cloud and Consent API

This project is a simple node web server that is hosted on Heroku and it exposes the Salesforce Consent API for Data Cloud use cases. It also provides a small server side rendered user interface to update the API configuration.

# Table of Contents

- [Data Cloud and Consent API](#data-cloud-and-consent-api)
- [Table of Contents](#table-of-contents)
  - [What does it do?](#what-does-it-do)
  - [How does it work?](#how-does-it-work)
- [Known Issues](#known-issues)
  - [Initial GET call](#initial-get-call)
  - [Should Forget cannot be undone](#should-forget-cannot-be-undone)
  - [License](#license)
  - [Disclaimer](#disclaimer)

---

## What does it do?

The main functionality of this project is to expose the [Salesforce Consent API for Data Cloud](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_consent_cdp_params.htm). The Consent API has 3 actions that offer different functionalities:

| Action       | Description                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Processing   | This action is used to restrict processing of data in Data Cloud processes such as query and segmentation.                                  |
| Portability  | This action is used to allow export of Data Cloud profile data.                                                                             |
| Shouldforget | This action indicates the right to be forgotten, which means delete PII (Personally Identifiable Information) data and any related records. |

The web server offers the following endpoints:

| Endpoint                | Method  | Description                                             |
| ----------------------- | ------- | ------------------------------------------------------- |
| `/processing/:id`       | `GET`   | Get the current processing status for a given email.    |
| `/processing/:id`       | `PATCH` | Opt out of the processing for a given email.            |
| `/portability/:id`      | `GET`   | Get the current portability status for a given email.   |
| `/portability/:id`      | `PATCH` | Initiate data export for a given email.                 |
| `/shouldForget/:id`     | `GET`   | Get the current should forget status for a given email. |
| `/shouldForget/:id`     | `PATCH` | Initiate should forget action.                          |
| `/ConfigurationScreen`  | `GET`   | Get the UI for API interactions from the server.        |
| `/configuration/update` | `POST`  | Update database API settings.                           |

Another functionality of this project is a user interface that gets server by the web server which provides a small React application to send requests to the above endpoints, see the JSON payload, and update API configurations.

## How does it work?

# Known Issues

## Initial GET call

If you look for a record within Data Cloud with the `GET` method and the record does not have a previous value configured for `shouldforget`, `processing`, or `portability`, the response will result in an error: `INVALID_ID_FIELD' as per [document](https://help.salesforce.com/s/articleView?id=000397169&type=1).

The solution for this is to make a `PATCH` request before `GET` and opt out by default. This is handled programmatically in this project and there is nothing for you to do.

## Should Forget cannot be undone

When you call the `shouhldforget` action and set the `status=optin`, you cannot change that value back to `optout`. Be careful when making opting in this action. Supporting documentation can be found [here](https://issues.salesforce.com/issue/a028c00000j5kYOAAY/cdp-consent-api-does-not-support-optout-statuses-for-shouldforget-action).

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Salesforce bears no responsibility to support the use or implementation of this software.
