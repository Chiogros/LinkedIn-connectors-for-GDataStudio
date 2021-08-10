function fetchDataFromAPI(request, endpoint) {

  // will contains all fetched rows
  var parsedResponses = new Object();

  try {

    // Fetch data
    var response = connect(endpoint, request);

    parsedResponses = JSON.parse(response);
    
  } catch (e) {
    cc.newUserError()
      .setDebugText('Error fetching data from API. ' + e)
      .setText('There was an error communicating with LinkedIn. Try again later.')
      .throwException();
  }

  return parsedResponses;
}
