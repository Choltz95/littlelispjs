$.getScript("js/lisp.js", function(){
	env = new Env({}, global_env);
});

$(function() {
	var jqconsole = $('#cons').jqconsole('littlelispjs...type some lisp. Enter sample for some test commands.\n', '> ');

	var startPrompt = function () {
		jqconsole.SetPromptLabel('>> ');
		jqconsole.Prompt(true, function (input) {
			if(input == 'clear') {
				jqconsole.Clear();
			} else if (input == 'sample') {
				for (var i = 0; i < tests.length; i++) {
			    console.log(tests[i]);
					jqconsole.Write('>> ' + tests[i] + '\n','jqconsole-input',false);
			    jqconsole.Write(to_string(evaluate(parse(tests[i]), env)) + '\n','jqconsole-output',false);
				}
			} else {
				// repl
				$.getScript("js/lisp.js", function(){
					jqconsole.Write(to_string(evaluate(parse(input), env)) + '\n','jqconsole-output',false);
				});
			}
			startPrompt();
		});
	};
	startPrompt();
});
/*tests*/
var tests = [
"(quote a)",
"(quote (a b c))",
"(car (quote (a b c)))",
"(cdr (quote (a b c)))",
"(cons (quote a) (quote (b c)))",
"(= (car (quote (a b))) (quote a))",
"(= (car (cdr (quote ( a b)))) (quote a))",
"(car (quote (0 1)))",
"(cdr (cons (+ 0 1) (+ 2 3)))",
"(define foo (+ 0 1))",
"foo",
"(define bar 2)",
"bar",
"(+ foo bar)",
"(cond true (+ 0 1))",
"(cond (= foo bar) 7 (cond true 9))",
"((lambda (x) (+ x 1)) 5)",
"(define add (lambda (x) (lambda (y) (+ x y))))",
"((add 4) 5)",
"(define range (lambda (low high) (cond (> low high) nil (cond true (cons low (range (+ low 1) high))))))",
"(range 0 10)",
"(define fac (lambda (n) (cond (= n 0) 1 (* n (fac (- n 1))))))",
"(fac 0)",
"(fac 10)",
"(define map (lambda (f xs) (cond (= xs nil) nil (cons (cons f (car xs)) (map f (cdr xs))))))",
//"(map (lambda (x) (+ x 1)) (range 0 50))"
];
