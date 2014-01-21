/**
 * Created by svaithiyanathan on 1/17/14.
 */
'use strict';

var mocks = {
    data: [
        {
            endpoint: "/questions",
            method: "GET",
            output : [{
                id: 1,
                question: 'What is percentage of <sup>2</sup>&frasl;<sub>7</sub> ? (round off to 2 decimals)',
                imageId: '',
                choices:{
                    type: 'RB',
                    options:[14.29, 15, 14]
                },
                rules: ['TIME', 'CHALLENGE', 'LEISURE'],
                group: ['M', 11],
                correct: 14.29,
                hintId: 1,
                time: 30,
                tag: ['Ratio','Percentage']
            },
            {
                id: 2,
                question: 'Convert decimal 0.3245 to equivalent percentage (round off to 2 decimals)',
                rules: ['TIME', 'CHALLENGE', 'LEISURE'],
                group: ['M', 11],
                correct: 32.45,
                hintId: 2
            },
            {
                id: 3,
                question: 'What is the percentage of shaded region in the below diagram?',
                imageId: 1,
                rules: ['TIME', 'CHALLENGE', 'LEISURE'],
                group: ['M', 11],
                correct: 32.45,
                hintId: 1
            }],
            description: "Used in login"
        }
    ]
};

module.exports.mockData = mocks.data;