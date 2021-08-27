# LinkedIn connectors for GDataStudio
Google Data Studio connectors to fetch data from LinkedIn Marketing API.

## Connectors organization
There's a main connector called "Core": it retrieve and handle data to bring it properly for GDS and set authentication method.
Child connectors (like Company-followers) use Core functions and have functions specific for their API endpoint.

## How to use them on GDS

### Setup Core connector
1. Go to [Google Apps Script](https://script.google.com)
2. Create new project
3. Name it
4. Go to project settings
5. Check "Display appsscript.json manifest file"
6. Take note about Script ID (useful for child connectors)
7. Go back to code window
8. Create files and set code for Core connector

### Setup child connector
1. Go to [Google Apps Script](https://script.google.com)
2. Create new project
3. Name it
4. Go to project settings
5. Check "Display appsscript.json manifest file"
7. Go back to code window
8. Create files and set code for child connector
9. In appsscript.json, change Dependencies > Libraries > LibraryID to the Core script ID you took note
10. Deploy it (easiest by going though "Use old editor" > "Publish" > "Publish from manifest file")

### Use connectors in GDS
1. Go to [Google Data Studio](https://datastudio.google.com)
2. Create > Data source
3. Search for your deployed child connector
4. Fill credentials
5. Now you can import it in your GDS reports

## Get access token
1. Create a LinkedIn developer account
2. Create an LinkedIn app
3. When you're on your app overview, go to Products tab and add "Marketing Developer Platform" product
4. Go to Auth tab and set an "Authorized redirect URLs for your app" like "https://access_token". It will be useful to get back your access token
5. Take note of the Client ID and Client secret codes
6. Execute [this](https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=CLIENT_ID&scope=r_organization_social&redirect_uri=https%3A%2F%2Faccess_token) request to get a first token. You have to set `client_id` ; if needed you could change `scope` and change `redirect_url` to another redirect URL (that URL must match with the one set though step 4, and it must be [encoded](https://meyerweb.com/eric/tools/dencoder))
7. Execute [this](https://api.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=TOKEN&redirect_uri=https%3A%2F%2Faccess_token&client_id=CLIENT_ID&client_secret=CLIENT_SECRET) to get a 60 days token. You have to change `code` to the token you got step 6, set `client_id` and `client_secret`. If needed, change `redirect_url` like step 6
8. Use last token to fill connector credentials

## How to create a new LinkedIn connector
First, copy Company-followers connector as template.

You can find the Marketing product documentation [here](https://docs.microsoft.com/fr-fr/linkedin/marketing/).

Then you have 3 things to change:
1. Change `endpoint` global var to the GET method you want and the parameters.
```javascript
// core.gs
var endpoint = ['networkSizes/urn:li:organization:', '?edgeType=CompanyFollowedByMember'];
```

2. Put fetchable fields from API
```javascript
// fields.gs
function getFields(request) {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  fields.newMetric()
    .setId('LinkedIn_company_followers')
    .setType(types.NUMBER); // BOOLEAN, NUMBER, ...
    
  fields.newDimension()
    .setId('Users-followers_field_example')
    .setType(types.TEXT); // BOOLEAN, NUMBER, ...
  
  // put all fetchable fields
  
  return fields;
}
```

3. Handle each data row
```javascript
// dataHandler.gs
function responseToRows(requestedFields, response) {

  var rows = new Array();

  var fields = requestedFields.asArray();
  
  // Filter for requested fields
  fields.forEach(function (field) {
    
    switch (field.getId()) {
      case 'LinkedIn_JSON_index_name':
        rows.push(response.JSON_index_name);
        break;
      default:
        break;
    }
  });

  return rows.map(function(row) {
    return { values: [row] };
  });
  
}
```

## If needed
Send me an email at alexandre.bouijoux@gmail.com :)
