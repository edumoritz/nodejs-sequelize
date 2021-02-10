const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.param('id', (req, res, next) => {
        app.services.product.find({id: req.params.id})
            .then(() => {
              next();
            }).catch(err => next(err));
    });

    router.post('/', (req, res, next) => {
        app.services.product.save({ ...req.body  })
            .then((result) => {
                return res.status(201).json(result);
            }).catch(err => next(err));
    });

    router.get('/',  (req, res, next) => {
        app.services.product.findAll()
            .then(result => res.status(200).json(result))
            .catch(err => next(err));
    });

    router.get('/:id', (req, res, next) => {
        app.services.product.find({ id: req.params.id })
            .then(result => res.status(200).json(result))
            .catch(err => next(err));
    });

    router.put('/:id', (req, res, next) => {
        app.services.product.update(req.params.id, req.body)
            .then(result => res.status(200).json(result))
            .catch(err => next(err));
    });

    router.delete('/:id', (req, res, next) => {
        app.services.product.remove(req.params.id)
            .then(() => res.status(204).send())
            .catch(err => next(err));
    });

    return router;
}