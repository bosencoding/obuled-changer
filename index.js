const { exec } = require("child_process");
const { Centrifuge } = require('centrifuge');
// const { error } = require("console");
global.WebSocket = require('ws');

const ws_address = 'confidential'; //edit by dev
const ws_token = '123'; //edit by dev
const client = new Centrifuge(ws_address, {
  token: ws_token
});

const sub = client.newSubscription('channel');

sub.on('publication', function(ctx) {
  const data_obj = ctx.data;
  const data_json = JSON.stringify(data_obj);
  console.log(data_json);
  console.log(typeof (data_json));
  const data_led = JSON.parse(data_json);
  const DataLedRear = "[D" + data_led.terminal;
  //const file_echo = ' /home/mashudi/test.txt';
  // Port LED MiniPC
  const PortLedFront = '/dev/ttyS0';
  const PortLedRight = '/dev/ttyS1';
  const PortLedLeft = '/dev/ttyS3';
  //Port COM kiri depan
  const PortLedRear = '/dev/ttyS2';
  console.log(DataLedRear);
  //LED Belakang
  exec(`echo "${DataLedRear}" > ${PortLedRear}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })


});

sub.subscribe();
client.connect();

