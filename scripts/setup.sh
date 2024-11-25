#!/bin/bash

# 1. Edit interpreter (#!/bin/bash) as fit
# 2. Edit source as required for shell
SOURCE="bashrc"
BARRIER="====================================="
SH_NAME="readerAliases"

# Add shortcut to .*rc
addShortcut (){
    COMMANDS="~/.homescripts/$SH_NAME.sh"

    if [[ ! -z $(grep -F "source $COMMANDS" ~/.$SOURCE) ]]; then
        echo -e "Script \e[1;4;31m'source $COMMANDS'\e[0m has already been added!"
    else
        echo -e "\nsource $COMMANDS" >> ~/.$SOURCE
        echo -e "\e[4;34mScript has now been added\e[0m"
        echo -e "\e[4;31mRestart terminal to use shortcuts\e[0m"
    fi
}

addAndPresentAlias (){
    echo -e "\n\e[1;4;32mUpdate Alias\e[0m\n"
    cp -r ./scripts/.homescripts/. ~/.homescripts/

    echo -e "Alias options added are:"
    # sed 's/^alias //' - Remove The alias line 
    # sed 's/^/- /' - Append Hyphen(-) to the start
    # sed 's/.*/\x1b[34m&\x1b[0m/' -  Colour the text to stand out
    grep -E '^alias ' ~/.homescripts/$SH_NAME.sh | sed 's/^alias //' | sed 's/^/- /' | sed 's/.*/\x1b[34m&\x1b[0m/'

}

echo $BARRIER
echo -e "\e[1;4;32mRunning Setup Script\e[0m\n"

addShortcut
addAndPresentAlias

echo $BARRIER


