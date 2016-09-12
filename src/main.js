
import * as falcor from 'falcor/dist/falcor.browser';

const { Model, HttpDataSource } = falcor;
const model = new Model({source: new HttpDataSource('/model.json')});

window.falcor = falcor;
window.model = model
    .get(['greeting'])
    .then(({json}) => console.log(json.greeting));
