import messages as msg
import helpers

# settings = helpers.get_settings()

def execute():
	curr = helpers.run_command_output('pwd').replace('\n', '')
	dataFile = '{}/__styles__/main.styl'.format(curr)
	helpers.run_command('open -a "Visual Studio Code" {}'.format(dataFile))
