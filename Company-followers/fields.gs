var cc = DataStudioApp.createCommunityConnector();

function getFields() {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  fields.newMetric()
    .setId('LinkedIn_company_followers')
    .setType(types.NUMBER);
  
  return fields;
}
