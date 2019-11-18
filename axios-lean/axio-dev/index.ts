interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function (s, sub) {
  const result = s.search(sub);
  return result > -1;
};
mySearch('TOm', 'Jerry');
