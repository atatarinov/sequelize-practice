const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice', { logging: false });

const User = db.define('user', {
// YOUR CODE HERE...
    first: { type: Sequelize.STRING },
    last: { type: Sequelize.STRING },
    age: {
        type: Sequelize.INTEGER,
        validate: { min: 18 }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bio: { type: Sequelize.TEXT }
}, {
// ...AND HERE
    getterMethods: {
        fullName: function() {
            return this.first + ' ' + this.last;
        }
    }

});

User.prototype.haveBirthday = function() {
    return User.findById(1)
        .then(function(user) {
            return user.increment('age', {by: 1});
        });
};


module.exports = User;
