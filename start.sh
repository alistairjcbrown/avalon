( echo "Starting websocket server..." && cd server && npm install && npm start )&
( echo "Starting client server..." && cd client && npm install && export BROWSER=none && node ./node_modules/react-scripts/bin/react-scripts.js start )&

wait
