import messages as msg
import helpers, os, json

settings = helpers.get_settings()

def execute():
  wireframes = helpers.ls_dir('{}/{}'.format(helpers.path('user'), settings['repoFolder']))
  selection = helpers.user_selection("Select: ", wireframes, DETAILED = True)
	
  if selection == 'exit':
    msg.exiting()
  else:
    repoVal = helpers.convert_to_kebab_case(selection['value'])
    template = '''stages:
  - build
  - deploy

build:
  stage: build
  script:
    - mkdir .public
    - cp -r * .public
    - mv .public public
  artifacts:
    paths:
      - public
  only:
    - main

deploy_to_github:
  stage: deploy
  script:
    # Clone the existing wireframes repository
    - git clone https://github.com/OptConnect/Wireframes.git
    - cd Wireframes
    # Create a subdirectory for the specific wireframe
    - mkdir -p {REPO}
    # Copy the contents of the public folder into the subdirectory
    - cp -r ../public/* {REPO}/
    # Set up Git for deployment
    - git config --global user.name "{USERNAME}"
    - git config --global user.email "{EMAIL}"
    - echo -e "machine github.com\n  login jaderigby\n  password $GITHUB_TOKEN" > ~/.netrc
    - chmod 600 ~/.netrc
    # Commit and push changes to GitHub
    - git add .
    - git commit -m "Deploy {REPO}"
    - git push origin gh-pages
  dependencies:
    - build
  only:
    - main
'''.format(REPO = repoVal, USERNAME = settings['githubUsername'], EMAIL = settings['githubEmail'])
	
  ci_cdFile = '{}{}/{}/.gitlab-ci.yml'.format(helpers.path('user'), settings['repoFolder'], selection['value'])
  if os.path.exists(ci_cdFile):
    DATA = helpers.read_file(ci_cdFile)
    if not repoVal in DATA:
      msg.updatingCi_cdFile(ci_cdFile)
      helpers.write_file(ci_cdFile, template)
    else:
      msg.ci_cdFileIsReady(ci_cdFile)
    

  while True:
    readmeOption = helpers.user_input("Would you like to update readme? [y/n] ")

    if readmeOption == 'y':
      shaData = helpers.run_command_output('''curl -s --location 'https://api.github.com/repos/{GROUP}/{REPO}/contents/README.md' \
--header 'Content-Type: application/json' \
--header 'Authorization: {TOKEN}' \
--header 'Accept: application/vnd.github.v3+json' \
'''.format(
        GROUP = settings['githubGroup'], 
        REPO = settings['githubRepoName'],
        TOKEN = settings['githubToken']
      ))

      shaString = (json.loads(shaData))["sha"]

      content = helpers.run_command_output('''curl -s -H "Authorization: {TOKEN}" \
     -H "Accept: application/vnd.github.v3.raw" \
     https://api.github.com/repos/{GROUP}/{REPO}/contents/README.md
'''.format(
        TOKEN = settings['githubToken'],
        GROUP = settings['githubGroup'], 
        REPO = settings['githubRepoName'],
      ))

      FILE = helpers.user_input("Link Name: ")
      PATH = 'https://{}.github.io/{}/{}'.format(settings['githubGroup'].lower(), settings['githubRepoName'], helpers.convert_to_kebab_case(selection['value']))

      contentStr = content + '\n\n[{}]({})'.format(FILE, PATH)
      helpers.run_command('''content_CONTENT="{CONTENT}"

content_ENCODED=$(echo "$content_CONTENT" | base64)

curl -s --location --request PUT 'https://api.github.com/repos/{GROUP}/{REPO}/contents/README.md' \
--header 'Content-Type: application/json' \
--header 'Authorization: {TOKEN}' \
--header 'Accept: application/vnd.github.v3+json' \
--data '{{
        "message": "Update README.md",
        "content": "'"$content_ENCODED"'",
        "sha": "{SHA}"
}}' \
-D -
'''.format(
        CONTENT = contentStr,
        GROUP = settings['githubGroup'], 
        REPO = settings['githubRepoName'],
        TOKEN = settings['githubToken'],
        SHA = shaString
      ))
      break
    elif readmeOption == 'n':
      break
    else:
      print("\nPlease enter either 'y' or 'n' ...\n")

  msg.done()