var mongoose = require('mongoose');

var roleItemChooseSchema = new mongoose.Schema({
    key: String,
    openid: String,
    createTime: {type: Date, default: Date.now()},
    roleItem: {type: mongoose.Schema.Types.ObjectId, ref: 'roleItem'}
}, {versionKey: false});

roleItemChooseSchema.methods = {};

roleItemChooseSchema.statics = {

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

module.exports = mongoose.model('RoleItemChoose', roleItemChooseSchema);