var cc = DataStudioApp.createCommunityConnector();

function getSchema(request, rawFields, endpoint) {

  // Check credentials
  checkForValidCredentials(endpoint, request);

  // return fields to retrieve
  var fields = rawFields.build();
  return { schema: fields };
}

function getRequestedFields(request, fields) {

  // Create schema for requested fields
  try {

    requestedFieldIds = request.fields.map(function(field) {
      return field.name;
    });
    
    return fields.forIds(requestedFieldIds);
    
  } catch (e) {
    cc.newUserError()
      .setDebugText('Error requesting fields. ' + e)
      .setText('There was an error requesting fields. File an issue.')
      .throwException();
  }
}

function getConfig() {
  var config = cc.getConfig();
  
  setConfig(config);
  
  config.setDateRangeRequired(false);
  return config.build();
}

function connect(endpoint, request) {

  var url = 'https://api.linkedin.com/v2/' + endpoint[0] + request.configParams.object_ID + endpoint[1];
  var options = {
    'method' : 'GET',
    'headers': {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + request.configParams.bearer_token
    },
    'muteHttpExceptions':true
  };

  // Fetch data
  return UrlFetchApp.fetch(url, options);
}
