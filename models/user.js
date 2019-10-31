const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                counter: {
                    type: Number,
                    required: true,
                    default: 1,
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true,
                }
            }
        ]
    }
});

userSchema.methods.addToCart = function (course) {
    const items = [...this.cart.items];

    const idx = items.findIndex(items => {
        return items.courseId.toString() === course._id.toString();
    });

    if (idx >= 0) {
        items[idx].counter = items[idx].counter + 1
    } else {
        items.push({
            courseId: course._id,
            counter: 1,
        })
    }

    this.cart = {items};
    return this.save();
};

userSchema.methods.removeFromCart = function (id) {
    let items = [...this.cart.items];
    const idx = items.findIndex((items) => {
        return items.courseId.toString() === id.toString();
    });

    if (items[idx].counter === 1) {
        items = items.filter(c => c.courseId.toString() !== id.toString())
    } else {
        items[idx].counter--
    }

    this.cart = {items};
    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart = {items: []};
    return this.save();
};

module.exports = model('User', userSchema);
