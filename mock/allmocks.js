/**
 * Created by svaithiyanathan on 1/10/14.
 */

'use strict';

var fs = require('fs'),
    defaultMockDir = './mock/modules',
    defaultModuleDir = '../mock/modules/',
    allMockData = [];

module.exports = {

    init: function(mockDir, moduleDir){
        if(!mockDir) mockDir = defaultMockDir;
        if(!moduleDir) moduleDir = defaultModuleDir;
        var mocks = require('./../common/utils').loadAllFiles(mockDir, moduleDir);
        allMockData = [];
        for(var mock in mocks){
            allMockData.push.apply(allMockData, require(moduleDir+'/'+mock).mockData);
        }
        console.log('The following mocks are initialized from ',mockDir,'\n',allMockData,'\nCompleted mock initialization');
    },

    makeFakeRequest: function makeRequest(endpoint, method, data) {
        console.log('Fake Request to\n', 'Endpoint:--',endpoint,'--\nMethod--', method, '--\nData', data);
        var mockData = allMockData.filter( function(eachMockData){
            if(eachMockData.endpoint == endpoint.trim() && eachMockData.method == method.trim()){
                return eachMockData;
            }
        });
        if(mockData.length != 1) throw Error('More mocks or no mock found, mocks:['+ mock+ '],Endpoint:'+ endpoint +',Method:'+ method);
        var mock = mockData.pop();
        if(typeof mock.output == 'function'){
            return mock.output(data);
        }else{
            return mock.output;
        }
    }
};


