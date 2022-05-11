var b;
void function() {
  var env = {b: 1}
  b = 2;
  console.log('in function b:', b);
  with(env) {
    var b = 3;
    console.log('in with b:', b);
  }
}();
console.log('global b:', b);
