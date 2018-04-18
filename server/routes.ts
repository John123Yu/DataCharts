import * as express from 'express';

import CatCtrl from './controllers/cat';
import DataCtrl from './controllers/data';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import Data from './models/data';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const dataCtrl = new DataCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Datas
  router.route('/datas').get(dataCtrl.getAllNames);
  router.route('/datas/count').get(dataCtrl.count);
  router.route('/data').post(dataCtrl.insert);
  router.route('/data/:id').get(dataCtrl.get);
  router.route('/data/:id').put(dataCtrl.update);
  router.route('/data/:id').delete(dataCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
