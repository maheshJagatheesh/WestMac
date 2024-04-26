#!/usr/bin/env bash

## temporary fix for android studio EAP issue
## SOURCE: https://stackoverflow.com/a/58536638/56545
if [ -d "platforms/android/cordova-support-google-services" ]; then
  allGradleFiles=`ls platforms/android/cordova-support-google-services/*.gradle`
  for eachGradleFile in $allGradleFiles
  do
    from="classpath 'com.android.tools.build:gradle:+'"
    to="classpath 'com.android.tools.build:gradle:3.5.1'"

    change=`sed "s/$from/$to/" < "$eachGradleFile"`
    echo "$change" > "$eachGradleFile"
  done
fi