function getAuthType() {
  var AuthTypes = cc.AuthType;
  return cc
    .newAuthTypeResponse()
    .setAuthType(AuthTypes.NONE)
    .build();
}

function isAdminUser() {
  return true;
}

function checkForValidCredentials(endpoint, request) {

  var httpResponse = connect(endpoint, request);

  switch (httpResponse.getResponseCode()) {
    case 200:
      // All requests are okay
      break;
    default:
      cc.newUserError()
        .setText('Something went wrong, please verify inputs. Error code returned by API: ' + httpResponse.getResponseCode())
        .throwException();
      break;
  }
  
  return true;
}
