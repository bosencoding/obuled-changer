export const ws_address = 'ws://confidential';
export default { ws_address: ws_address, ws_token: ws_token }

function getToken(url, ctx) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(ctx)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Unexpected status code ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        resolve(data.token);
      })
      .catch(err => {
        reject(err);
      });
  });
}

