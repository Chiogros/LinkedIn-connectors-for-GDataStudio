function fetchDataFromAPI(requestedFields, request) {
  var rawRows = LinkedInCore.fetchDataFromAPI(request, endpoint);
  
  return responseToRows(requestedFields, rawRows);
}
