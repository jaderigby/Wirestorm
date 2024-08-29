import messages as msg
import helpers

# settings = helpers.get_settings()

def execute():
	curr = helpers.run_command_output('pwd').replace('\n', '')
	template = helpers.read_file('{}/template_files/pug/blueprints/create.pug'.format(curr))

	name = helpers.user_input('Give the new page a name: [Ex: Login Page] ')
	formattedName = name.replace(' ', '-').lower()
	newFile = '{}/__pages__/{}.pug'.format(curr, formattedName)
	
	helpers.write_file(newFile, template)
	helpers.run_command('open -a "Visual Studio Code" {}'.format(newFile))

	msg.done()
