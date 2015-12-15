'use strict';

var Player = require('./player');
var String = require('./strings');
var Score = require('./score');
var util = require('util');

var Tennis = function (firstPlayerName, secondPlayerName) {

    this.firstPlayer = Object.create(Player).init({name: firstPlayerName});
    this.secondPlayer = Object.create(Player).init({name: secondPlayerName});
};

Tennis.prototype.getPlayer = function (args) {
    args = args || {};
    var name = args.name;

    if (this.firstPlayer.name === name)
        return this.firstPlayer;
    else if (this.secondPlayer.name === name)
        return this.secondPlayer;

    return null
};

Tennis.prototype.wonPoint = function (playerName) {
    var player = this.getPlayer({name: playerName});
    player.winsBall();
};

Tennis.prototype.getScore = function () {
    var firstPlayerScore = this.firstPlayer.getScore(),
        secondPlayerScore = this.secondPlayer.getScore();

    if (this.hasOnePlayerForty() && this.isBallsDifferenceMore())
        return String.WIN + this.liderPlayer().name;

    else if (this.hasBothPlayersScore(Score.FORTY) && this.isBallsEqual())
        return String.DEUCE;

    else if (this.hasBothPlayersScore(Score.FORTY) && this.isBallsDifferenceOne())
        return String.ADVANTAGE + this.liderPlayer().name;

    else if (this.hasBothPlayersScore(Score.FORTY) && this.isBallsDifferenceMore())
        return String.WIN + this.liderPlayer().name;

    return util.format('%s-%s', firstPlayerScore, this.isBallsEqual()?String.ALL:secondPlayerScore);
};

Tennis.prototype.hasOnePlayerForty = function () {
    var ballsForForty = 3;
    return (this.firstPlayer.balls > ballsForForty || this.secondPlayer.balls > ballsForForty);
};
Tennis.prototype.hasBothPlayersScore = function (score) {
    var firstPlayerScore = this.firstPlayer.getScore(),
        secondPlayerScore = this.secondPlayer.getScore();
    return (firstPlayerScore === score && secondPlayerScore === score);
};

Tennis.prototype.isBallsDifferenceMore = function () {
    return Math.abs(this.firstPlayer.balls - this.secondPlayer.balls) > 1;

};

Tennis.prototype.isBallsDifferenceOne = function () {
    return Math.abs(this.firstPlayer.balls - this.secondPlayer.balls) === 1;

};

Tennis.prototype.liderPlayer = function () {
    if (this.firstPlayer.balls > this.secondPlayer.balls)
        return this.firstPlayer;
    return this.secondPlayer;
};

Tennis.prototype.isBallsEqual = function () {
    return (this.firstPlayer.balls === this.secondPlayer.balls);
};

if (typeof window === "undefined") {
    module.exports = Tennis;
}