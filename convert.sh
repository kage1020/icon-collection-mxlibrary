#!/bin/bash

# set -e

outdir=${1-out}

mkdir -p "$outdir"

for i in "gi4" "gi5" "md" "md2" "md3" "md4" "md5" "md6" "md7"; do
# for i in "gi" "gi2" "gi3" "gi4" "md" "md2" "md3" "md4" "ri" "ri2" "ri3" "ri4" "si" "si2" "si3" "si4" "tb" "tb2" "tb3" "tb4"; do
# for i in "bs" "bs2" "bs3" "bs4" "fa" "fa2" "gi" "gi2" "io5" "io52" "md" "md2" "ri" "ri2" "si" "si2" "tb" "tb2"; do
    outfile="$outdir/$i.xml"
    echo "Generating mxlibrary $outfile"
    sleep 1s
    node svg2mxlibrary -o $outfile out/icons/$i/*.svg
done
