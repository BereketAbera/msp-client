#!/bin/bash 

rm ./dist/smpprj/*.js
rm ./dist/smpprj/*.txt
rm ./dist/smpprj/*.txt
rm ./dist/smpprj/*.html

ng b --prod --aot

cp ./dist/smpprj/*.js /var/www/html/test/
cp ./dist/smpprj/*.txt /var/www/html/test/
cp ./dist/smpprj/*.txt /var/www/html/test/
cp ./dist/smpprj/*.html /var/www/html/test/

service nginx restart



 
