/**
 * Created by svaithiyanathan on 1/10/14.
 */
'use strict';

var mocks = {
    data: [
        {
            endpoint: "/user",
            method: "POST",
            output : function(data){
                var outputData;
                if(data.userId == 'a@a.com'){
                    outputData = {errorCode:1, id:'Invalid operator id'};
                }else{
                    outputData = {errorCode:0}
                }
                return outputData;
            },
            description: "Used in login"
        }
    ]
};

module.exports.mockData = mocks.data;