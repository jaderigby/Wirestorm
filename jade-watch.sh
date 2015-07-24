DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
jade -w __jade__/app/ -o html/ --pretty