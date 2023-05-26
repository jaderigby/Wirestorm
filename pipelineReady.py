import messages as msg
import helpers, os

settings = helpers.get_settings()

def execute():
  wireDirectory = helpers.path('user') + settings['repoFolder']
  wireframeList = os.listdir(wireDirectory)
  groups = [item['name'] for item in settings['gitlabGroups']]
  selection = helpers.user_selection("Select: ", wireframeList)
  groupSelect = helpers.user_selection("From group: ", groups)
  helpers.run_command('open https://{}.gitlab.io/{}'.format(settings['gitlabGroups'][groupSelect - 1]['name'], helpers.kabob(wireframeList[selection - 1])))