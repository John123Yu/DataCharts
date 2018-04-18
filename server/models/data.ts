import * as mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  name: String,
  data_object: Object,
  data_list: Object
});

const Data = mongoose.model('Data', dataSchema);

export default Data;
