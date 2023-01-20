const { exec } = require("child_process");
const { Centrifuge } = require('centrifuge');
const { ws_address, getToken } = require('./confdata');
global.WebSocket = require('ws');

const client = new Centrifuge(ws_address, {
  token: 'JWT-GENERATED-ON-BACKEND-SIDE',
  getToken: function(ctx) {
    return getToken('/centrifuge/connection_token', ctx);
  }
});

const sub = client.newSubscription('staging');

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
  const PortLedRear = '/dev/ttyS2';
  const PortLedLeft = '/dev/ttyS3';
  //Port COM kiri depan
  console.log(DataLedRear);
  //LED DEPAN
  exec(`echo "${DataLedFront}" > ${PortLedFront}`, (error, stdout, stderr) => {
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
  //LED BELAKANG
  exec(`echo "${DataLedRight}" > ${PortLedRight}`, (error, stdout, stderr) => {
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
  //LED SAMPING KANAN
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
  //LED SAMPING KIRI
  exec(`echo "${DataLedLeft}" > ${PortLedLeft}`, (error, stdout, stderr) => {
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

