const tcb = require('tcb-admin-node');
const config = require('./config');

exports.main = async function(event) {
  const { private_key_id } = process.env;
  tcb.init({
    env: 'scf-920ksf',
    credentials: {
      private_key_id,
      private_key: config.key
    }
  });

  // 字母和数字的组合
  const { userId = 'tcb00' } = event.queryString || {};

  if (!/^[a-zA-Z0-9]{4,32}$/.test(userId)) {
    return {
      isBase64Encoded: false,
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  console.log(userId);

  const ticket = tcb.auth().createTicket(userId, {
    refresh: 10 * 60 * 1000
  });

  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      ticket
    })
  };
};
