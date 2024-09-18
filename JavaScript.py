import messages as msg
import helpers

# settings = helpers.get_settings()

def execute():
	curr = helpers.run_command_output('pwd').replace('\n', '')
	navFile = '{}/app/js/main.lib.js'.format(curr)
	helpers.run_command('open -a "Visual Studio Code" {}'.format(navFile))

	msg.done()