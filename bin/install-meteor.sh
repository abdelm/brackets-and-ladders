#!/bin/bash -ex

if [ ! -e "$HOME/.meteor/meteor" ]; then
  curl https://install.meteor.com/ | sh
else
  echo "meteor already exists in Travis CI cache, not installing it."
fi

# Making Meteor is installed
meteor --version
