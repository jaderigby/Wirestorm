import sys, helpers
import messages as msg
import sizzle
import newItem
import pipelineReady
# new imports start here

# settings = helpers.get_settings()

try:
	action = str(sys.argv[1])
except:
	action = None

args = sys.argv[2:]

if action == None:
	msg.statusMessage()

elif action == '-action':
	sizzle.do_action(args)

elif action == '-profile':
	sizzle.profile()

elif action == '-helpers':
	sizzle.helpers()

elif action == "new":
    newItem.execute(args)

elif action == "-":
	newItem.execute(args)

elif action == "ready":
    pipelineReady.execute()
# new actions start here
