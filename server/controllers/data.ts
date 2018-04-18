import Data from '../models/data';
import BaseCtrl from './base';

export default class DataCtrl extends BaseCtrl {
  model = Data;
  getAllNames = (req, res) => {
    this.model.find({}, { name: 1 }, (err, docs) => {
      if (err) { return console.error(err); }
      console.log(docs)
      res.status(200).json(docs);
    });
  }
}