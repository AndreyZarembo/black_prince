#!/bin/sh
# Wraps the web extension into a Safari Web Extension Xcode project (run once, then build in Xcode).
set -e
cd "$(dirname "$0")"
xcrun safari-web-extension-converter webext \
  --project-location safari \
  --app-name "Black Prince Pomodoro" \
  --bundle-identifier me.azarembo.pomodoro \
  --macos-only \
  --no-open
echo "Done: open plugins/safari/Black Prince Pomodoro/*.xcodeproj in Xcode, then Run."
echo "Then enable it: Safari → Settings → Extensions (allow unsigned extensions in the Develop menu for local builds)."
