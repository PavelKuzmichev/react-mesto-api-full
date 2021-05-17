const { Card } = require('../models/card');
const DefaultError = require('../middlewares/defaultError');

exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send( card ))
    .catch(next);
};
exports.createCard = (req, res, next) => {
  console.log(req.user._id);

  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id  })
    .then((card) => res.status(200).send( card ))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new DefaultError(400, 'Переданы некорректные данные');
      }
    })
    .catch(next);
};
exports.deleteCard = (req, res, next) => {
    Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new DefaultError(404, 'Карточка не найдена');
      }

      if (card.owner.toString() !== req.user._id) {
        throw new DefaultError(403, 'Нет прав для совершения данной операции');
      }

      Card.deleteOne({ _id: req.params.cardId })
        .then((form) => res.status(200).send(form));
    })
    .catch(next);
};

exports.likeCard = (req, res, next) => {
  console.log(req.user._id);
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send( card ))
    .catch((err) => {
        if (err.message === 'NotValidId') {
        throw new DefaultError(404, 'Карточка не найдена');
      } else if (err.kind === 'ObjectId') {
        throw new DefaultError(400, 'Нет карточки с таким id');
      }
    })
    .catch(next);
};
exports.dislikeCard = (req, res, next) => {
  console.log(req.user._id);
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send( card ))
    .catch((err) => {
        if (err.message === 'NotValidId') {
        throw new DefaultError(404, 'Карточка не найдена');
      } else if (err.kind === 'ObjectId') {
        throw new DefaultError(400, 'Нет карточки с таким id');
      }
    })
    .catch(next);
};
