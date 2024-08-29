import messages as msg
import helpers, re, json

# settings = helpers.get_settings()

def execute():
	curr = helpers.run_command_output('pwd').replace('\n', '')
	template = helpers.read_file('{}/template_files/pug/blueprints/add.pug'.format(curr))
	
	name = helpers.user_input('Give the new page a name: [Ex: New Page] ')
	formattedName = name.replace(' ', '-').lower()
	newFile = '{}/__pages__/{}.pug'.format(curr, formattedName)

	words = name.split()
	dataFormattedName = words[0].lower() + ''.join(word.capitalize() for word in words[1:])
	
	dataPattern = re.compile(r"- const data = pageData\['index'\];", re.DOTALL)
	dataMatch = dataPattern.search(template)
	dataTemplate = dataMatch.group(0)
	newDataLine = dataMatch.group(0).replace('index', dataFormattedName)

	updatedFileContent = template.replace(dataTemplate, newDataLine)

	helpers.write_file(newFile, updatedFileContent)
	msg.data_updated(dataFormattedName)
	helpers.run_command('open -a "Visual Studio Code" {}'.format(newFile))

	#= Add new file to the Nav
	navFilepath = '{}/__pages__/__core__/sidebar.pug'.format(curr)
	navInfo = helpers.read_file(navFilepath)

	pattern = re.compile(r'// nav template:(.*?)// :end', re.DOTALL)
	match = pattern.search(navInfo)

	if match:

		templatePlaceholder = match.group(0).strip()
		newNavSnippet = match.group(1).strip().replace('// ', '').replace('"url"', '"{}.html"'.format(formattedName)).replace('"title"', '"{}"'.format(name)) + '\n' + templatePlaceholder
		updatedNavInfo = navInfo.replace(templatePlaceholder, newNavSnippet)
		helpers.write_file(navFilepath, updatedNavInfo)

		msg.sidebar_updated(formattedName)

	#= Add new entry to the data file
	dataFile = '{}/__data__/content.json'.format(curr)
	dataInfo = helpers.read_file(dataFile)
	dataInfoFormatted = json.loads(dataInfo)
	if not dataFormattedName in dataInfoFormatted:
		dataInfoFormatted[dataFormattedName] = {"title": name}

	helpers.write_file(dataFile, json.dumps(dataInfoFormatted, indent=4))

	msg.done()