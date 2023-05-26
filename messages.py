import helpers, json

actionList = json.loads(helpers.read_file('{}/{}'.format(helpers.path('util'), 'action-list.json')))

def example():
	print("process working!")

def statusMessage():
	if len(actionList['actions']) > 0:
		print("")
		for item in actionList['actions']:
			print('''[ {} {} ]\t\t{}'''.format(actionList['alias'], item['name'], item['description']))
		print("")
	else:
		print('''
WireframeUtil is working successfully!
''')

def done():
	print('''
[ Process Completed ]
''')

def command(STRING):
	print("Running Command: {}".format(STRING))

def commandList(LIST):
	s = ""
	for item in LIST:
		s += item + " "
	print("Running Command: {}".format(s))

def create_repo_instructions():
	helpers.user_input('''
1. Log in to gitlab.
2. create a new repo.
3. Name it. Remember the name; you will use it in the next step.
[ Enter ] to Continue ... ''')

# def stepsDescription():
# 	repoName = raw_input('''
# 1. Log in to gitlab and create the new repo
# What is the name of the new repo? [example: upgrade-wireframe] ''')
