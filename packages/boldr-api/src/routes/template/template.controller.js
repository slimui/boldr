import uuid from 'uuid';
import slugIt from '../../utils/slugIt';
import Template from './template.model';

export async function listTemplates(req, res) {
  try {
    const templates = await Template.query();
    return res.status(200).json(templates);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getTemplateByResource(req, res) {
  try {
    const template = await Template
      .query()
      .where({ name: req.params.name })

      .first();

    return res.status(200).json(template);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function createTemplate(req, res) {
  try {
    const payload = {
      resource: req.body.resource,
      content: req.body.content,
      label: req.body.label,
      name: slugIt(req.body.label),
    };

    const newPage = await Template.query().insert(payload);

    return responseHandler(res, 201, newPage);
  } catch (error) {
    return res.status(500).json(error);
  }
}
