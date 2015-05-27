$.getScript("js/lisp.js", function(){
	env = new Env({}, global_env);
});

$(function() {
	var jqconsole = $('#cons').jqconsole('Here is a little lisp interpreter I coded in about 100 lines of javascript.\n' +
															'The interpreter supports function invocation, lambdas, lets, ifs, numbers, strings, a few library functions, and lists\n' +
															'Type \'sample\' for some simple and more complex test commands.\nType \'exit\' when you are finished.\n', '> ');

	var startPrompt = function () {
		jqconsole.SetPromptLabel('>> ');
		jqconsole.Prompt(true, function (input) {
			if(input == 'clear') {
				jqconsole.Clear();
			} else if (input == 'sample') {
				$.getScript("js/tests.js", function(){
					for (var i = 0; i < tests.length; i++) {
						jqconsole.Write('>> ' + tests[i] + '\n','jqconsole-input',false);
				    jqconsole.Write(to_string(evaluate(parse(tests[i]), env)) + '\n','jqconsole-output',false);
					}
				});
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
