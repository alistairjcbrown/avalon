export REACT_APP_SERVER_IP_ADDRESS=`ip route get 1.2.3.4 | awk '{print $7}'`
export REACT_APP_SERVER_PORT=4000

( echo "Starting websocket server on $REACT_APP_SERVER_IP_ADDRESS:$REACT_APP_SERVER_PORT ..." && cd server && npm install && npm start )&
( echo "Starting client server ..." && cd client && npm install && export BROWSER=none && node ./node_modules/react-scripts/bin/react-scripts.js start )&

wait
