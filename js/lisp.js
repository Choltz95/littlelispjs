/* operations */
var Operations = {
  '+'       : function(a, b) { return a + b; },
  '-'       : function(a, b) { return a - b;},
  '*'       : function(a, b) { return a * b; },
  '/'       : function(a, b) { return a / b; },
  '<'       : function(a, b) { return a < b; },
  '>'       : function(a, b) { return a > b; },
  '<='      : function(a, b) { return a <= b; },
  '>='      : function(a, b) { return a >= b; },
  '='       : function(a, b) { return a == b; },
  'cons'    : function(a, b) { return [a].concat(b); },
  'car'     : function(a)    { return a[0]; },
  'cdr'     : function(a)    { return a.slice(1); },
  'list'    : function()     { return Array.prototype.slice.call(arguments); }
};

/* environment */
function Env(properties, outer) {
  this.properties = properties || {};
  this.outer      = outer      || { find : function(key) { return this; }, get : function() { return null; }, set: function() {} };
}

Env.prototype.get  = function(key)      { return this.properties[key]; };
Env.prototype.set  = function(key, val) { this.properties[key] = val;  };
Env.prototype.find = function(key)      { return this.get(key) ? this : this.outer.find(key); };

var global_env = new Env(Operations);

/* parser and to_string */
function tokenize(input) {
		return input.replace(/\(/g, ' ( ')
				.replace(/\)/g, ' ) ')
				.trim()
				.split(/\s+/);
}

function atom(token) {
  return isNaN(parseFloat(token)) ? token : parseFloat(token);
}

function read_from(tokens) {
  if (tokens.length == 0) {
    throw 'unexpected EOF';
  }

  var token = tokens.shift();
  if ('(' == token) {
    var L = [];
    while (tokens[0] != ')') {
      L.push(read_from(tokens));
    }
    tokens.shift();
    return L;
  } else {
    return atom(token);
  }
}

function parse(input) {
  return read_from(tokenize(input));
}

function to_string(exp) {
  if (exp instanceof Array) {
      return "(" + exp.map(to_string).join(" ") + ")";
  } else if (typeof exp == 'undefined' || exp == null) {
    return "null";
  } else {
    return exp.toString();
  }
}

/* evaluator */
function evaluate(x, env) {
  var _, exp, cond, conseq, alt, variable, vars, exps, proc;

  if (typeof x == 'string') {  // check dict for variable
    if (x == 'true') {
      return true;
    } else if (x == 'false') {
      return false;
    } else {
      return env.find(x).get(x);
    }
  } else if (x instanceof Array == false) { // else, return input
    return x;
  } else if (x[0] == 'quote') {
    //[_, exp] = x; //cant do this in chrome for some reason get invalid left hand assignment...works in firefox
    _ = x[0]
    exp = x[1];
    return exp;
  } else if (x[0] == 'cond') {
     //[_, cond, conseq, alt] = x;
     _ = x[0];
     cond = x[1];
     conseq = x[2];
     alt = x[3];
     if (evaluate(cond, env)) {
       return evaluate(conseq, env);
     } else {
       return evaluate(alt, env);
     }
  } else if (x[0] == 'define') {
    //[_, variable, exp] = x;
    _ = x[0];
    variable = x[1];
    exp = x[2];
    env.set(variable, evaluate(exp, env));
  } else if (x[0] == 'lambda') {
    //[_, vars, exp] = x;
    _ = x[0];
    vars = x[1];
    exp = x[2];
    return function() {
      var properties = {};
      args = arguments;
      vars.forEach(function(x, i) { properties[x] = args[i]; })
      return evaluate(exp, new Env(properties, env));
    };
  } else {
    exps = x.map(function(exp) { return evaluate(exp, env) });
    proc = exps.shift();
    return proc.apply(null, exps);
  }
}
