// Ref: https://stackoverflow.com/questions/4011629/swapping-two-items-in-a-javascript-array

Array.prototype.swapItems = function (a, b) {
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
}

module.exports = {
    swapArrayValues: function (array, indexA, indexB) {
        return array.swapItems(indexA, indexB);
    }
}
