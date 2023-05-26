import json
from settings import settings

profilePath = settings['profile_url'] + settings['profile']

def load_profile():
	import os
	if os.path.exists(profilePath):
		return json.loads(read_file(profilePath))
	else:
		return json.loads("{}")

def get_settings():
	profile = load_profile()
	if 'settings' in profile:
		return profile['settings']
	else:
		return False

def path(TYPE):
	import os
	if TYPE == 'user':
		return os.path.expanduser('~/')
	elif TYPE == 'util' or TYPE == 'utility':
		return os.path.dirname(os.path.realpath(__file__))
	else:
		return False

def read_file(FILEPATH):
	FILE = open(FILEPATH, 'r')
	data = FILE.read()
	FILE.close()
	return data

def write_file(FILEPATH, DATA):
	with open(FILEPATH, 'w') as f: f.write(DATA)

def run_command(CMD, option = True):
	import subprocess
	shellStatus = True
	str = ''
	showCmd = CMD
	if isinstance(CMD, list):
		shellStatus = False
		for item in CMD:
			str += (' ' + item)
		showCmd = str
	if option:
		print('\n============== Running Command: {}\n'.format(showCmd))
	subprocess.call(CMD, shell=shellStatus)

def run_command_output(CMD, option = True):
	import subprocess
	if option:
		print('\n============== Outputting Command: {}\n'.format(CMD))
	result = False
	if CMD != None:
		process = subprocess.Popen(CMD, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)
		out, err = process.communicate()

		if err:
			print(err)
		
		else:
			result = out.decode('utf-8')

	return result

def decorate(COLOR, STRING):
	bcolors = {
		 'lilac' : '\033[95m'
		,'blue' : '\033[94m'
		,'cyan' : '\033[96m'
		,'green' : '\033[92m'
		,'yellow' : '\033[93m'
		,'red' : '\033[91m'
		,'bold' : '\033[1m'
		,'underline' : '\033[4m'
		,'endc' : '\033[0m'
	}

	return bcolors[COLOR] + STRING + bcolors['endc']

def user_input(STRING):
	try:
		return raw_input(STRING)
	except:
		return input(STRING)

# generates a user selection session, where the passed in list is presented as numbered selections; selecting "x" or just hitting enter results in the string "exit" being returned. Any invaild selection is captured and presented with the message "Please select a valid entry"
def user_selection(DESCRIPTION, LIST):
	import re
	str = ''
	for i, item in enumerate(LIST, start=1):
		str += '\n[{index}] {item}'.format(index=i, item=item)
	str += '\n\n[x] Exit\n'

	finalAnswer = False

	while True:
		print(str)
		selection = user_input('{}'.format(DESCRIPTION))
		pat = re.compile("[0-9]+")
		if pat.match(selection):
			selection = int(selection)
		if isinstance(selection, int):
			finalAnswer = selection
			break
		elif selection == 'x':
			finalAnswer = 'exit'
			break
		elif selection == '':
			finalAnswer = 'exit'
			break
		else:
			print("\nPlease select a valid entry...")
	return finalAnswer

def arguments(ARGS, DIVIDER=':'):
	return dict(item.split('{}'.format(DIVIDER)) for item in ARGS)


# custom helpers start here
# =========================

def generate_repository(NAME, GROUP):
	settings = get_settings()
	createRemoteRepoCmd = '''curl -H "Content-Type:application/json" "https://gitlab.com/api/v4/projects?private_token={PRIVATE_TOKEN}" -d "{{ \\"name\\": \\"{NAME}\\", \\"namespace_id\\": \\"{GROUP_ID}\\" }}"'''.format(PRIVATE_TOKEN = settings['privateToken'], NAME = NAME, GROUP_ID = GROUP['group_id'])
	run_command(createRemoteRepoCmd)

def clone_repo(DESTINATION, GROUP, NAME):
	cloneCommand = 'cd {DESTINATION} && git clone git@gitlab.com:{USER}/{NAME}.git'.format(DESTINATION = DESTINATION, USER = GROUP['name'], NAME = NAME)
	run_command(cloneCommand)

def add_readme(DESTINATION, GROUP, NAME):
	formattedName = NAME.replace(' ', '-')
	url = 'https://{}.gitlab.io/{}'.format(GROUP['name'], formattedName.lower())
	content = '''# {name} #

[Gitlab Page]({url})

Link: {url}

Note: Page will not update until after Gitlab Pipeline has completed for the Project. Also, may take a minute for it to update after pipeline has finished.
'''.format(name = NAME, url = url)
	readmeCmd = '''cd {} && echo "{}" >> README.md'''.format(DESTINATION, content)
	run_command(readmeCmd)
	run_command('cd {} git status && git add README.md && git commit -m "adding readme" && git push'.format(DESTINATION))

def install_wirestorm(DESTINATION):
	copyCommand = "scp -r {root}/template/ {destination}/".format(root = path('util'), destination = DESTINATION)
	run_command(copyCommand)

def rename_repo(OLD_NAME, NEW_NAME):
	renameCommand = "mv {} {}".format(OLD_NAME, NEW_NAME)
	run_command(renameCommand)

# returns PascalCased/camelCased strings as strings with spaces. Acronyms, such as NASASatellite will resolve to "NASA Satellite"
# Be advised: does not account for numbers
def titled(NAME):
	import re
	charList = []
	pat = re.compile('[A-Z]')
	nameList = list(NAME)
	for i, char in enumerate(nameList):
		if (i + 1 < len(nameList) and i - 1 >= 0):
			up_ahead = nameList[i + 1]
			from_behind = nameList[i - 1]
		else:
			up_ahead = ''
			from_behind = ''
		if pat.match(char) and i != 0:
			if pat.match(from_behind) and pat.match(up_ahead):
				charList.append(char)
			else:
				charList.append(' ')
				charList.append(char)
		else:
			charList.append(char)
	return ''.join(charList)

# processes string through titled function above; then, replaces spaces with dashes, such as: "NASA Satellite" to "nasa-satellite"
def kabob(NAME):
	str = titled(NAME)
	return str.replace(' ', '-').lower()

def add_gitlab_ci_file(FILEPATH):
	content = '''pages:
  stage: deploy
  script:
  - mkdir .public
  - cp -r * .public
  - mv .public public
  artifacts:
    paths:
    - public
  only:
  - main'''
	write_file(FILEPATH, content)

def rebuild_package_file(FILEPATH, NEW_NAME, REPO_NAME):
	content = '''{{
	"name": "{name}_Wireframe",
	"version": "1.0.0",
	"license": "MIT",
	"repository": {{
		"type": "git",
		"url": "https://github.com/jaderigby/wirestorm"
	}},
	"dev": {{
		"css": {{
			"path": "app/css/main.css",
			"directory": "app/css/"
		}},
		"html": {{
			"path": "app/",
			"ext": "html"
		}},
		"js": {{
			"directory": "app/js/"
		}},
		"images": {{
			"directory": "app/images/"
		}}
	}},
	"dist": {{
		"root": "https://jaderigby.gitlab.io/{repo}/",
		"css": {{
			"path": "public/css/main.css",
			"directory": "public/css/",
			"files": "blockletter.eot,blockletter.svg,blockletter.ttf,blockletter.woff,prism-okaidia.css,wireframe-iconfont2.eot,wireframe-iconfont2.svg,wireframe-iconfont2.ttf,wireframe-iconfont2.woff"
		}},
		"html": {{
			"path": "public/",
			"ext": "html"
		}},
		"js": {{
			"directory": "public/js/",
			"files": "main.lib.js,magicVial-0.6.2.js,TweenMax.min.js,jquery-1.11.1.min.js"
		}},
		"images": {{
			"directory": "public/images/"
		}}
	}},
	"devDependencies": {{
		"grunt": "^1.0.0",
		"grunt-autoprefixer": "^3.0.4",
		"grunt-contrib-pug": "^1.0.0",
		"grunt-contrib-stylus": "^1.2.0",
		"grunt-contrib-watch": "^1.0.1",
		"grunt-exec": "^3.0.0",
		"load-grunt-tasks": "^3.5.0",
		"lost": "^8.2.1",
		"nib": "^1.1.0",
		"poststylus": "^1.0.0",
		"rupture": "^0.6.1"
	}},
	"dependencies": {{
		"express": "3.0.0alpha4",
		"opn": "^4.0.2",
		"sendevent": "^1.0.4",
		"uglify-js": "^2.7.5"
	}}
}}'''.format(name=NEW_NAME, repo=REPO_NAME)
	write_file(FILEPATH, content)

def rebuild_start_file(FILEPATH, FOLDER):
	content = read_file(FILEPATH)
	newContent = content.replace('''app.use(express.static(path.join(__dirname, 'public')));''', '''app.use(express.static(path.join(__dirname, '{}')));'''.format(FOLDER))
	write_file(FILEPATH, newContent)

def createFirebaseInit(FILEPATH, FIREBASE_API_KEY, APP_NAME, SENDER_ID, APP_ID):
	configContent = '''// Initialize Firebase
var firebaseConfig = {
  apiKey: "{firebaseApiKey}",
  authDomain: "{appName}.firebaseapp.com",
  databaseURL: "https://{appName}.firebaseio.com",
  projectId: "{appName}",
  storageBucket: "{appName}.appspot.com",
  messagingSenderId: "{senderId}",
  appId: "{appId}"
};
firebase.initializeApp(firebaseConfig);
'''.format(firebaseApiKey=FIREBASE_API_KEY, appName=APP_NAME, senderId=SENDER_ID, appId=APP_ID)
	write_file(FILEPATH, configContent)

def createAppJSForFirebase(FILEPATH):
	appContent = '''[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach(function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){null!==this.parentNode&&this.parentNode.removeChild(this)}})}),Array.prototype.forEach||(Array.prototype.forEach=function(t){var e,i;if(null==this)throw new TypeError("this is null or not defined");var s=Object(this),o=s.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&(e=arguments[1]),i=0;i<o;){var n;i in s&&(n=s[i],t.call(e,n,i,s)),i++}}),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(t,e){e=e||window;for(var i=0;i<this.length;i++)t.call(e,this[i],i,this)});var jQuishy=function(t){this.t,this.el=t,"string"==typeof t?this.t=document.querySelectorAll(t):t instanceof HTMLCollection?this.t=[].slice.call(t):void 0!==t&&(this.t=[t]),this.items=this.t,this.item=this.t[0]};function paPos(t,e,i){t.forEach(function(t){t.insertAdjacentHTML(e,i)})}function _$(t){return new jQuishy(t)}jQuishy.prototype.first=function(){return this.t=[this.item],this},jQuishy.prototype.attr=function(t,e){var i=[];return this.t.forEach(function(s){if(void 0===e){var o=s.getAttribute(t);i.push(o)}else s.setAttribute(t,e)}),1===i.length?i[0]:i},jQuishy.prototype.css=function(t,e){return this.t.forEach(function(i){var s=[];if(s.push(t),e&&s.push(e),2===s.length)i.style.cssText=s[0]+" : "+s[1];else if(s[0]){var o="";for(var n in s[0]){o+=n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()+":"+s[0][n]+";"}i.style.cssText=o}}),this},jQuishy.prototype.addClass=function(t){return this.t.forEach(function(e){e.classList?e.classList.add(t):e.className+=" "+t}),this},jQuishy.prototype.removeClass=function(t){return this.t.forEach(function(e){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")}),this},jQuishy.prototype.toggleClass=function(t){return this.t.forEach(function(e){if(e.classList)e.classList.toggle(t);else{var i=e.className.split(" "),s=i.indexOf(t);s>=0?i.splice(s,1):i.push(t),e.className=i.join(" ")}}),this},jQuishy.prototype.hasClass=function(t){this.t.forEach(function(e){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.cls)})},jQuishy.prototype.prepend=function(t){return paPos(this.t,"afterbegin",t),this},jQuishy.prototype.append=function(t){return paPos(this.t,"beforeend",t),this},jQuishy.prototype.click=function(t){return this.t.forEach(function(e){e.addEventListener("click",function(e){t(e)})}),this},jQuishy.prototype.delegate=function(t,e,i){return this.t[0].addEventListener(e,function(e){e.target&&e.target.matches(t)&&i(e)}),this};

window.loaded = false;

//======================
//    Cookies
//======================

function createCookie(name,value,days) {
 if (days) {
   var date = new Date();
   date.setTime(date.getTime()+(days*24*60*60*1000));
   var expires = "; expires="+date.toGMTString();
 }
 else var expires = "";
 document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
 var nameEQ = name + "=";
 var ca = document.cookie.split(';');
 for(var i=0;i < ca.length;i++) {
   var c = ca[i];
   while (c.charAt(0)==' ') c = c.substring(1,c.length);
   if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
 }
}

$('form').each(function() {
  // console.log($(this).attr('id'));
  magicVial('form#' + $(this).attr('id'), "Sorry, please fix the errors below.");
});

$('[type="submit"]').click((e) => {
  e.preventDefault();
  var email = $('form#signup [type="email"]').val();
  var password = $('form#signup [type="password"]').val();
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (error.code) {
      alert("You have an error!");
    }
  });
});

$('.submit').click((e) => {
  e.preventDefault();
  console.log("atempting login");
  var email = $('form#login [type="email"]').val();
  var password = $('form#login [type="password"]').val();
  const promise = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (error.code) {
      alert("You have an error!");
    }
  });
  promise.catch((e) => {
    console.log(e.message);
  });
});

function writeUserData(DB, data) {
  DB.ref('/').set({
      "members" : data
    });
}

// writeUserData(window.database, window.dataObj);

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
      $(".logged-in-view").show();
      $(".logged-out-view").hide();

      // get elements
      window.database = firebase.database();

      // create references
      var membersDB = window.database.ref("members/");

      // Sync object changes
      membersDB.on('value', function(snapshot) {
        window.dataObj = snapshot.val();

        function groupSelectCookieInit() {
          window.groupSelectStatus = readCookie('groupSelectStatus') || false;
          if (window.groupSelectStatus === 'true') {
            $('#groupSelect').addClass('show');
    				$('#progressWrapper').addClass('group-selection');
          }
        }

        groupSelectCookieInit();

        function hasProp (obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        function initNoteFragments() {
          window.dataObj.forEach(function(_boy_) {
    				_boy_.ranks.forEach(function(_rank_) {
              if ('notes' in _rank_) {
                for (var key in _rank_.notes) {
                  var rank = key.match(/[A-Z]{1}[a-z]*/g).join(' ');
                  var requirement = key.match(/_[0-9a-z]{1,3}/g)[0].replace('_', '');
                  $('[data-owner="'+ _boy_.name +'"] [data-rank="'+ rank +'"][data-requirement="'+ requirement +'"]').addClass('note-fragment');
                }
              }
    				});
    			});
        }

        if (!window.loaded) {
          window.loaded = true;
        }

      });

  }
  else {
    $(".logged-in-view").hide();
    $(".logged-out-view").show();
  }
});

$('a[href="login.html"]').click(function(e) {
    e.preventDefault();
    $('.signup-form').removeClass('reveal');
    $('.login-form').addClass('reveal');
});

$(".logout").click((e) => {
  e.preventDefault();
  firebase.auth().signOut();
});

'''
	write_file(FILEPATH, appContent)

def populate_app_folder(FILEPATH):
	print("FILEPATH: "+ FILEPATH)
	run_command('mkdir '+ FILEPATH +'/app')
	run_command('mkdir '+ FILEPATH +'/app/css && scp -r '+ FILEPATH +'/public/css/ '+ FILEPATH +'/app/css')
	run_command('mkdir '+ FILEPATH +'/app/images && scp -r '+ FILEPATH +'/public/images/ '+ FILEPATH +'/app/images')
	run_command('mkdir '+ FILEPATH +'/app/js && scp -r '+ FILEPATH +'/public/js/ '+ FILEPATH +'/app/js')

def verify_installation(CMD):
	import subprocess
	result  = False
	if CMD != None:
		process = subprocess.Popen(CMD, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)
		out, err = process.communicate()

		for line in out.decode('utf-8').splitlines():
			if not "command not found" in line:
				result = True

	return result

# def update_packages_values():
