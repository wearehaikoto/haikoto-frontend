// Ref: https://stackoverflow.com/questions/4011629/swapping-two-items-in-a-javascript-array

Array.prototype.swapItems = function (a, b) {
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
};

// Ref: https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
    return this;
};

// Ref: https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
Array.prototype.unique = function (key) {
    return [...new Map(this.map((item) => [item[key], item])).values()];
};

module.exports = {
    swapArrayValues: function (array, indexA, indexB) {
        return array.swapItems(indexA, indexB);
    },
    getRandomIndex: function (array) {
        return Math.floor(Math.random() * array.length);
    },
    insertItem: function (array, index, value) {
        return array.insert(index, value);
    },
    getUnique: function (array, key) {
        return array.unique(key);
    }
};
