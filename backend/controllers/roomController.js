const Room = require('../models/Room');

exports.room_create = function (req, res, next) {
    let room = new Room(
        {
            title: req.body.title
        }
    )
    room.save()
    res.send(room)
};

exports.room_details = function (req, res, next) {
    Room.findById(req.params.id, function (err, room) {
        if (err) return next(err);
        res.send(room);
    })
};

exports.room_update = function (req, res, next) {
    Room.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, room) {
        if (err) return next(err);
        res.send('Room updated.');
    });
};

exports.room_delete = function (req, res, next) {
    Room.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
