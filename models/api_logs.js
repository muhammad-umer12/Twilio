const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const api_logs = new Schema({
  
    ip: { type: String },
    area_code:{ type: String},
    
    available_numbers: { type: Array },
    datetime : { type: String}
 
},
{ minimize: false }
);

module.exports = mongoose.model(`api_logs`, api_logs, `api_logs`);
