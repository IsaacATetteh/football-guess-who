import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorHandler = (error) => {
  let errorMessage = "";
  if (error === "username-already-taken") {
    toast.error("Username already taken");
    return;
  }
  switch (error.code) {
    case "auth/claims-too-large":
      errorMessage =
        "The claims payload provided exceeds the maximum allowed size of 1000 bytes.";
      toast.error(errorMessage);
      break;
    case "auth/email-already-in-use":
      errorMessage = "Email is already in use by an existing user.";
      toast.error(errorMessage);
      break;
    case "auth/id-token-expired":
      errorMessage = "The provided Firebase ID token is expired.";
      toast.error(errorMessage);
      break;
    case "auth/id-token-revoked":
      errorMessage = "The Firebase ID token has been revoked.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-credential":
      errorMessage = "Invalid email or password";
      toast.error(errorMessage);
      break;
    case "auth/insufficient-permission":
      errorMessage =
        "The credential used has insufficient permission to access the requested resource. Refer to Set up a Firebase project for documentation on how to generate a credential with appropriate permissions and use it to authenticate the Admin SDKs.";
      toast.error(errorMessage);
      break;
    case "auth/internal-error":
      errorMessage =
        "The Authentication server encountered an unexpected error while trying to process the request.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-argument":
      errorMessage =
        "An invalid argument was provided to an Authentication method.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-claims":
      errorMessage = "The custom claim attributes provided are invalid.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-continue-uri":
      errorMessage = "The continue URL must be a valid URL string.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-creation-time":
      errorMessage = "The creation time must be a valid UTC date string.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-disabled-field":
      errorMessage =
        "The provided value for the disabled user property is invalid. It must be a boolean.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-display-name":
      errorMessage =
        "The provided value for the displayName user property is invalid. It must be a non-empty string.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-dynamic-link-domain":
      errorMessage =
        "The provided dynamic link domain is not configured or authorized for the current project.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-email":
      errorMessage =
        "The provided value for the email user property is invalid. It must be a string email address.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-email-verified":
      errorMessage =
        "The provided value for the emailVerified user property is invalid. It must be a boolean.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-hash-algorithm":
      errorMessage =
        "The hash algorithm must match one of the strings in the list of supported algorithms.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-hash-block-size":
      errorMessage = "The hash block size must be a valid number.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-hash-derived-key-length":
      errorMessage = "The hash derived key length must be a valid number.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-hash-key":
      errorMessage = "The hash key must be a valid byte buffer.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-hash-memory-cost":
      errorMessage = "The hash memory cost must be a valid number.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-hash-parallelization":
      errorMessage = "The hash parallelization must be a valid number.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-hash-rounds":
      errorMessage = "The hash rounds must be a valid number.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-hash-salt-separator":
      errorMessage =
        "The hashing algorithm salt separator field must be a valid byte buffer.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-id-token":
      errorMessage = "The provided ID token is not a valid Firebase ID token.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-last-sign-in-time":
      errorMessage = "The last sign-in time must be a valid UTC date string.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-page-token":
      errorMessage =
        "The provided next page token in listUsers() is invalid. It must be a valid non-empty string.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-password":
      errorMessage =
        "The provided value for the password user property is invalid. It must be a string with at least six characters.";
      toast.error(errorMessage);
      break;
    case "auth/weak-password":
      errorMessage = " Password should be at least 6 characters";
      toast.error(errorMessage);
      break;
    case "auth/invalid-password-hash":
      errorMessage = "The password hash must be a valid byte buffer.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-password-salt":
      errorMessage = "The password salt must be a valid byte buffer.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-phone-number":
      errorMessage =
        "The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-photo-url":
      errorMessage =
        "The provided value for the photoURL user property is invalid. It must be a string URL.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-provider-data":
      errorMessage =
        "The providerData must be a valid array of UserInfo objects.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-provider-id":
      errorMessage =
        "The providerId must be a valid supported provider identifier string.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-oauth-responsetype":
      errorMessage =
        "Only exactly one OAuth responseType should be set to true.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-session-cookie-duration":
      errorMessage =
        "The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-uid":
      errorMessage =
        "The provided uid must be a non-empty string with at most 128 characters.";
      toast.error(errorMessage);
      break;
    case "auth/invalid-user-import":
      errorMessage = "The user record to import is invalid.";
      toast.error(errorMessage);
      break;
    case "auth/maximum-user-count-exceeded":
      errorMessage =
        "The maximum allowed number of users to import has been exceeded.";
      toast.error(errorMessage);
      break;
    case "auth/missing-android-pkg-name":
      errorMessage =
        "An Android Package Name must be provided if the Android App is required to be installed.";
      toast.error(errorMessage);
      break;
    case "auth/missing-continue-uri":
      errorMessage = "A valid continue URL must be provided in the request.";
      toast.error(errorMessage);
      break;
    case "auth/missing-hash-algorithm":
      errorMessage =
        "Importing users with password hashes requires that the hashing algorithm and its parameters be provided.";
      toast.error(errorMessage);
      break;
    case "auth/missing-ios-bundle-id":
      errorMessage = "The request is missing a Bundle ID.";
      toast.error(errorMessage);
      break;
    case "auth/missing-uid":
      errorMessage = "A uid identifier is required for the current operation.";
      toast.error(errorMessage);
      break;
    case "auth/missing-oauth-client-secret":
      errorMessage =
        "The OAuth configuration client secret is required to enable OIDC code flow.";
      toast.error(errorMessage);
      break;
    case "auth/operation-not-allowed":
      errorMessage =
        "The provided sign-in provider is disabled for your Firebase project. Enable it from the Sign-in Method section of the Firebase console.";
      toast.error(errorMessage);
      break;
    case "auth/phone-number-already-exists":
      errorMessage =
        "The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.";
      toast.error(errorMessage);
      break;
    case "auth/project-not-found":
      errorMessage =
        "No Firebase project was found for the credential used to initialize the Admin SDKs. Refer to Set up a Firebase project for documentation on how to generate a credential for your project and use it to authenticate the Admin SDKs.";
      toast.error(errorMessage);
      break;
    case "auth/reserved-claims":
      errorMessage = "One or more custom user claims provided are reserved.";
      toast.error(errorMessage);
      break;
    case "auth/session-cookie-expired":
      errorMessage = "The provided Firebase session cookie is expired.";
      toast.error(errorMessage);
      break;
    case "auth/session-cookie-revoked":
      errorMessage = "The Firebase session cookie has been revoked.";
      toast.error(errorMessage);
      break;
    case "auth/too-many-requests":
      errorMessage = "The number of requests exceeds the maximum allowed.";
      toast.error(errorMessage);
      break;
    case "auth/uid-already-exists":
      errorMessage =
        "The provided uid is already in use by an existing user. Each user must have a unique uid.";
      toast.error(errorMessage);
      break;
    case "auth/unauthorized-continue-uri":
      errorMessage =
        "The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase Console.";
      toast.error(errorMessage);
      break;
    case "auth/user-not-found":
      errorMessage =
        "There is no existing user record corresponding to the provided identifier.";
      toast.error(errorMessage);
      break;
    default:
      errorMessage = "Please try again later";
      toast.error(errorMessage);
      break;
  }
};

export default errorHandler;
