DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

stylus -u jeet -u rupture -u nib -w __stylus__/main.styl -o css/