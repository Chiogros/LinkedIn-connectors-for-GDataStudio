function fetchDataFromAPI(requestedFields, request) {
  var rawRows = LinkedInCore.fetchDataFromAPI(request, fields);
  
  return responseToRows(requestedFields, rawRows);
}
