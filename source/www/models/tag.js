var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    name: String,
    route: String,
    description: String,
    displayOrder: Number,
    enabled: Boolean,
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
}, {versionKey: false});

tagSchema.methods = {};

tagSchema.statics = {

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
        var sortBy = options.sortBy || {};
        var fields = options.fields || {};

        this.find(filter)
            .select(fields)
            .sort(sortBy)
            .exec(cb);
    },

    getById: function (id, cb) {
        this.findOne({_id: id})
            .exec(cb);
    },

    getByRoute: function (route, cb) {
        this.findOne({route: route})
            .exec(cb);
    },

    update2: function (id, tag, cb) {
        this.update({_id: id}, {$set: tag})
            .exec(cb);
    },

    delete: function (id, cb) {
        this.remove({_id: id})
            .exec(cb);
    }
};

module.exports = mongoose.model('Tag', tagSchema);