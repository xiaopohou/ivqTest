var mongoose = require('mongoose');

var roleItemSchema = new mongoose.Schema({
    name: String,
    displayOrder: String,
    coverImg: String,
    description: String,
    createTime: {type: Date, default: Date.now()},
    roleScene: {type: mongoose.Schema.Types.ObjectId, ref: 'RoleScene'}
}, {versionKey: false});

roleItemSchema.methods = {};

roleItemSchema.statics = {
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
            .populate('roleScene')
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

module.exports = mongoose.model('RoleItem', roleItemSchema);