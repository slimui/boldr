import { responseHandler, InternalServer } from 'core/index';
// Model
import Navigation from './navigation.model';

const debug = require('debug')('boldrAPI:navigation-controller');

export async function listNavigation(req, res, next) {
  try {
    const navigations = await Navigation.query().eager('links').returning('*');

    if (!navigations) {
      return res.status(404).json({ message: 'Unable to find any navigations. Try creating one.' });
    }

    return res.status(200).json(navigations);
  } catch (error) {
    return next(new InternalServer());
  }
}

export async function showNavigation(req, res, next) {
  try {
    const navigation = await Navigation
      .query()
      .eager('[links]')
      .findById(req.params.id);

    return responseHandler(null, res, 200, navigation);
  } catch (error) {
    return next(new InternalServer(error));
  }
}

export async function updateNavigation(req, res, next) {
  try {
    const updatedNav = await Navigation.query()
      .patchAndFetchById(1, req.body);

    return res.status(201).json(updatedNav);
  } catch (error) {
    return next(new InternalServer(error));
  }
}
