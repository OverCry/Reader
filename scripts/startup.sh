#!/bin/bash

export REACT_APP_CURRENT_DATE=$(date +\"%m.%d\");
export REACT_APP_CURRENT_GIT_SHA=`git rev-parse --short HEAD`;

echo $REACT_APP_CURRENT_DATE