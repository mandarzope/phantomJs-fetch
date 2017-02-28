U=$1
final_url=$U
final_path=./snapshots/$2.html
echo "$final_url"
echo "$final_path"
./node_modules/.bin/phantomjs ./phantomjs-runner.js $final_url > $final_path
