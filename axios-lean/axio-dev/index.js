declared;
var mySearch;
mySearch = function (s, sub) {
    var result = s.search(sub);
    return result > -1;
};
mySearch('TOm', 'Jerry');
