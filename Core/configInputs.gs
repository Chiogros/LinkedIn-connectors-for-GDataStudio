function setConfig(config) {
  
  config.newInfo()
    .setId('instructions')
    .setText('Some prerequires are needed to retrieve LinkedIn data. See instructions : https://github.com/Chiogros/LinkedIn-connectors-for-GDataStudio');
  
  config.newTextInput()
    .setId('bearer_token')
    .setName('Enter Bearer token')
    .setHelpText('aide')
    .setPlaceholder('Bearer token');

  config.newTextInput()
    .setId('object_ID')
    .setName('Enter object\'s ID (company, share, user...)')
    .setHelpText('aide')
    .setPlaceholder('LinkedIn object\'s ID');
  
  return config;
}
