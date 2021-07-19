function fetchDataFromAPI(requestedFields, request) {
  var rawRows = LinkedInCompanyfollowers.fetchDataFromAPI(request, fields);
  
  return responseToRows(requestedFields, rawRows);
}
