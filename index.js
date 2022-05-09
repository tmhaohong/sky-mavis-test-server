const fastify = require('fastify');

const app = fastify({
  logger: true,
});

app.register(require('@fastify/cors'));

app.get('/api/walletName', ({}, reply) => {
  reply.send({
    name: 'Ronin',
  });
});

app.post('/api/unlock', ({body}, reply) => {
  if (body.password === '123456') {
    reply.send({
      walletInfo: {
        id: '7300377738883334',
        name: 'Ronin',
        mainCurrency: 'USD',
        currencies: {
          USD: {
            amount: 1000,
            rate: 22956.50,
          },
          EUR: {
            amount: 50,
            rate: 24196.15,
          },
          YEN: {
            amount: 10000,
            rate: 175.81,
          },
        },
      },
    });
  } else {
    reply.code(400).send({
      error: 'wrongPassword',
    });
  }
});

app.post('/api/assets/send', ({body}, reply) => {
  const newWalletInfo = {
    id: '7300377738883334',
    name: 'Ronin',
    mainCurrency: 'USD',
    currencies: {
      USD: {
        amount: 1000,
        rate: 22956.50,
      },
      EUR: {
        amount: 50,
        rate: 24196.15,
      },
      YEN: {
        amount: 10000,
        rate: 175.81,
      },
    },
  };
  newWalletInfo.currencies[body.asset].amount = newWalletInfo.currencies[body.asset].amount - parseInt(body.amount, 10);
  reply.send({
    walletInfo: newWalletInfo,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,'0.0.0.0', function(err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
