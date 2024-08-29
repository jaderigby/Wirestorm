import messages as msg
import helpers

# settings = helpers.get_settings()

def execute():
	curr = helpers.run_command_output('pwd').replace('\n', '')
	navFile = '{}/__pages__/__core__/nav.pug'.format(curr)
	helpers.run_command('open -a "Visual Studio Code" {}'.format(navFile))

	msg.done()