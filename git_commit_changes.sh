#!/bin/bash
if [ -z "$1" ]
then echo "commit message is mandatory"
fi

if [ -z "$2" ]
then echo "branch is mandatory"
fi

git add -A && \
echo "added files ready to commit" && \
git commit -m "m: $1" && \
git push origin $2