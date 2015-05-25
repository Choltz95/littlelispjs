$.getScript("js/lisp.js", function(){
	env = new Env({}, global_env);
});

$(function() {
	var jqconsole = $('#cons').jqconsole('littlelispjs...type some lisp. sample.txt to come\n', '> ');

	var startPrompt = function () {
		jqconsole.SetPromptLabel('>> ');
		jqconsole.Prompt(true, function (input) {
			if(input == 'clear') {
				jqconsole.Clear();
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
