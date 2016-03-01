var mongoose = require('mongoose');

var roleSceneSchema = new mongoose.Schema({
    name: String,
    title: String,
    description: String,
    count: {type: Number, default: 0},
    createTime: {type: Date, default: Date.now()},
    roleItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'RoleItem'}]
}, {versionKey: false});

roleSceneSchema.methods = {};

roleSceneSchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};

        this.find(filter)
            .sort(options.sortBy)
            .limit(options.count)
            .skip(options.page * options.count)
            .exec(cb);
    },

    getAllByFilters: function (options, cb) {
        var filter = options.filter || {};
        var fields = options.fields || {};
        var sortBy = options.sortBy || {};

        this.find(filter)
            .select(fields)
            .sort(sortBy)
            .exec(cb);
    },

    getById: function (id, cb) {
        this.findOne({_id: id})
            .populate('roleItem')
            .exec(cb);
    },

    update2: function (id, modify, cb) {
        this.update({_id: id}, {$set: modify})
            .exec(cb);
    },

    delete: function (id, cb) {
        this.remove({_id: id})
            .exec(cb);
    }
};

module.exports = mongoose.model('RoleScene', roleSceneSchema);