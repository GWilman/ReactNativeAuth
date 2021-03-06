const User = require('../models/user');

function usersIndex(req, res, next) {
  User
    .find()
    .populate('leagues')
    // .populate([
    //   { path: 'leagues', populate: { path: 'createdBy' } },
    //   { path: 'picks'}
    // ])
    .exec()
    .then(users => res.status(200).json(users))
    .catch(next);
}

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate('leagues')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

function usersUpdate(req, res, next) {
  // if (req.body.leagues) {
  //   for (var i = 0; i < req.body.leagues.length; i++) {
  //     if (req.body.leagues[i].id) {
  //       req.body.leagues[i] = req.body.leagues[i].id;
  //     }
  //   }
  // }
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.notFound();
      user.leagues = req.body.user.leagues;
      for (const field in req.body.user) {
        user[field] = req.body.user[field];
      }
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

// function usersDelete(req, res, next) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(!user) return res.notFound();
//       return user.remove();
//     })
//     .then(() => res.status(204).end())
//     .catch(next);
// }

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate
  // delete: usersDelete
};
