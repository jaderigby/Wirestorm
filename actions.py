import sys, helpers
import messages as msg
import sizzle
import newItem
import pipelineReady
import Publish
import Select
import Add
import Create
import Data
import Nav
import Sidebar
import Header
import Index
import Style
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

elif action == "publish":
	Publish.execute()

elif action == "select":
	Select.execute()

elif action == "add":
	Add.execute()

elif action == "create":
	Create.execute()

elif action == "data":
	Data.execute()

elif action == "nav":
	Nav.execute()

elif action == "side":
	Sidebar.execute()

elif action == "header":
	Header.execute()

elif action == "index":
	Index.execute()

elif action == "style":
	Style.execute()
# new actions start here
