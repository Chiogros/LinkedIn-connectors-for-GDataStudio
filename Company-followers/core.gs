var endpoint = ['networkSizes/urn:li:organization:', '?edgeType=CompanyFollowedByMember'];

function getSchema(request) {
  return LinkedInCore.getSchema(request, getFields(), endpoint);
}

function getData(request) {

  // Create schema for requested fields
  var requestedFields = getRequestedFields(request);

  // Get rows
  var rows = fetchDataFromAPI(requestedFields, request);

  return {
    schema: requestedFields.build(),
    rows: rows
  };
}

function getRequestedFields(request) {
  return LinkedInCore.getRequestedFields(request, getFields());
}

function getConfig(request) {
  return LinkedInCore.getConfig();
}
