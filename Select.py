import messages as msg
import helpers, os

settings = helpers.get_settings()

def execute():
	root = '{}{}'.format(helpers.path('user'), settings['repoFolder'])
	wireframeList = sorted([f for f in os.listdir(root) if not f.startswith('.')], reverse=False)
	selection = helpers.user_selection("Select Wireframe: ", wireframeList)
	if selection == 'exit':
		print("\nExiting ...")
	else:
		helpers.run_wireframe(wireframeList, selection - 1)

	msg.done()