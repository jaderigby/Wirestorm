import messages as msg
import helpers, time

settings = helpers.get_settings()

def execute(ARGS):
	argDict = helpers.arguments(ARGS)

	if argDict:
		if 'name' in argDict:
			projectName = argDict['name']
	else:
		projectName = helpers.user_input('Give your project a name: [Ex: Wireframe New Homepage] ')

	#= Setup
	newFolder = projectName.replace(' ', '')
	repoName = helpers.kabob(newFolder)
	groups = [item['name'] for item in settings['gitlabGroups']]
	
	selection = helpers.user_selection("Selection: ", groups)

	selectedGroup = settings['gitlabGroups'][selection - 1]
	destination = helpers.path('user') + settings['repoFolder']
	wireDirectory = destination + '/' + newFolder

	#= Installation
	helpers.generate_repository(projectName, selectedGroup)
	helpers.clone_repo(destination, selectedGroup, repoName)
	helpers.rename_repo(destination + '/' + repoName, wireDirectory)
	print(selectedGroup)
	helpers.add_readme(wireDirectory, selectedGroup, projectName)
	helpers.install_wirestorm(wireDirectory)
	gruntCliInstalled = helpers.verify_installation('grunt --version')

	if (not gruntCliInstalled):
		helpers.run_command('sudo npm install -g grunt-cli')

	#= Seeding
	helpers.rebuild_package_file(wireDirectory + '/' + 'package.json', newFolder, repoName)
	helpers.rebuild_start_file(wireDirectory + '/' + 'start.js', 'app')
	helpers.populate_app_folder(wireDirectory)
	helpers.run_command('cd '+ wireDirectory +' && npm install')
	helpers.add_gitlab_ci_file(wireDirectory + '/' +'.gitlab-ci.yml')
	helpers.run_command('cd '+ wireDirectory +' && grunt dev')
	time.sleep(1)
	helpers.run_command('cd '+ wireDirectory +' && git status')
	helpers.run_command('cd '+ wireDirectory +' && git add -A && git commit -m "adding project files" && git push')
	helpers.run_command('cd '+ wireDirectory +' && code __pages__/index.pug')
	helpers.run_command('cd '+ wireDirectory +' && grunt dev')
	helpers.run_command('cd '+ wireDirectory +' && node start')
