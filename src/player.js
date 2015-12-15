'use strict';
var score = require('./score');

var Player = {
    init: function (args) {
        args = args || {};
        var name = args.name;
        this.name = name;
        this.balls = 0;

        return this;
    },

    winsBall: function () {
        this.balls++;
    },

    getScore: function () {
        switch (this.balls) {
            case 0:
                return score.LOVE;
            case 1:
                return score.FIFTEEN;
            case 2:
                return score.THIRTY;
        }

        return score.FORTY;
    }
};

module.exports = Player;