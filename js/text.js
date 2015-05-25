var text = {
	help: function() {
		return "Try one of the following commands:\n\n"
		+ "\tabout: a little about me\n"
		+ "\twork: my work experience and positions i've held\n"
		+ "\tpositions: leadership stuff\n"
		+ "\tprojects: some projects\n"
		+ "\tfunfact: fun fact\n"
		+ "\tcontact: say hey\n"
		+ "\tlisp: test my microlisp inspired by John McCarthy, Peter Norvig, and Marry Cook.\n"
	},
	err: "Command not found. try '?'\n",
	about: "I am a sophomore at the University of Rochester studying computer science and mathematics.\n"
					 + "I am interested in investing myself in projects which\n"
					 + "present challenges in science and technology and that are useful and interesting to people.\n"
					 + "I am not afraid of learning new concepts and trying new ideas in the process. \n"
					 + "I enjoy conducting my own personal research and making my conclusions free for everyone...\n"
					 + "Check out papers I have authored on Arxiv.org!\n"
					 + "Look up my work or projects on github, or visit my website/resume for more info about me.\n",
	workObj: [
		{
			name: "VIStA (Visual Intelligence & Social Multimedia Analytics) Research Assistant",
			company: "University of Rochester",
			url: "http://www.cs.rochester.edu/u/jluo/#VISTA",
			time: "December 2014 -> Present"
		},
		{
			name: "The Art of Programming Teaching Assistant",
			company: "University of Rochester",
			url: "https://www.rochester.edu/",
			time: "December 2014  -> May 2015"
		},
		{
			name: "The Science of Programming Workshop Leader",
			company: "University of Rochester",
			url: "https://www.rochester.edu/",
			time: "September 2015  -> January 2016"
		}
	],
	work: function(){
		var output = "My work experience:\n\n";
		this.workObj.forEach(function(item){
			output += ("\t"
				+ item.name
				+  " @ <a href='"
				+ item.url
				+ "'>"
				+ item.company
				+ "</a>"
				+ "\n\n");
		});

		return output;
	},
	positionsObj: [
	{
		position: "Graduate",
		organization: "National Outdoor Leadership School (NOLS)",
		url: "http://www.nols.edu/"
	},
	{
		position: "Atendee",
		organization: "RocHack",
		url: "http://rochack.org/"
	},
	{
		position: "Vice President",
		organization: "University of Rochester Wrestling Club",
		url: "https://www.rochester.edu/"
	}
	],
	positions: function(){
		var output = "positions/interests:\n\n";
		this.positionsObj.forEach(function(item){
			output += ("\t"
				+ item.position
				+  " of <a href='"
				+ item.url
				+ "'>"
				+ item.organization
				+ "</a>"
				+ "\n\n");
		});
		return output;
	},
	projObj: [
	{
		name: "PredPrey",
		url: "https://github.com/Choltz95/-",
		description: "Visualization of swarming systems based on the movements of a predatory creature.\n"
									+ "\tSwarm interactions based on model developed with differential equations.\n"
									+ "\tImplemented in C# with the Unity3d engine."
	},
	{
		name: "N-Body",
		url: "https://github.com/Choltz95/n-bodyjs",
		description: "Computation and visualization of force-vectors on n-bodies in 2d and 3d space.\n"
									+	"\tAnalysis done on naïve and estimation-based algorithms.\n"
									+ "\tProject initially developed in JavaScript with the Processing Library with a port to C focusing on distributed computation."
	},
	{
		name: "Kumquat",
		url: "https://github.com/jvalinsky/Kumquat",
		description: "Job and hobby scheduling web application with elements of a social network.\n"
									+ "\tBuilt in Python with the Flask web framework. Utilized trending technologies\n"
									+ "\tsuch as AJAX and SQL relational databases to build the social network."
	},
	{
		name: "LispGC",
		url: "https://github.com/Choltz95/University-of-Rochester/tree/master/200-Research/Lisp%20GC",
		description: "Preformed analysis and wrote academic paper on three classic garbage collection algorithms.\n"
		 							+ "\tImplemented parser, evaluator, REPL etc. and 3 garbage collectors - Cheney's algorithm,\n"
									 +"\tMark-Sweep with Tri-color marking, and Knuth’s classical Lisp 2 algorithm in C++."
	},
	{
		name: "Evis",
		url: "https://github.com/Choltz95/Evis",
		description: "(WIP) mapping chaotic events (i.e. violence against civillians, natural disasters, etc.)\n"
					+ "\tgoing on in the world based on social media, news, and other sources."
	},
	{
		name: "GitHub",
		url: "https://github.com/choltz95",
		description: "A few misc. projects and some listed above."
	}
	],
	projects: function(){
		var output = "some stuff I've worked on:\n\n";

		this.projObj.forEach(function(item){
			output += "\t"
			+ "<a href='"
			+ item.url
			+ "'>"
			+ item.name
			+ "</a>\n"
			+ "\t  "
			+ item.description
			+ "\n\n";
		});

		return output;
	},
	fun: function(){

		var facts = [
			"I have wrestled for over 6 years.",
			"I love to read science fiction. Currently, my favorite short story is 'Microcosmic God' by Theodore Sturgeon.",
			"My editor of choice is VIM. I also enjoy using Github's Atom.",
			"My current operating system of choice is Debian.",
			"My first programming language was the edu language Logo.",
			"When I study math, I prefer silence...or Mozart.",
			"My food of choice is vanilla ice cream."
		];

		var random = Math.floor((Math.random() * facts.length));
		return facts[random] + '\n';
	},
	contact: "say hey <a href='mailto:chesterholtz@gmail.com'>here</a>\n"
}
