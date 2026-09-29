#!/bin/sh
# The webext can't import outside its own directory — refresh the local copy after editing plugins/core/.
cp ../core/timer.js ../core/ui.js core/
