const proxy = [
    {
      context: '/api',
      target: 'https://br.investing.com',
      pathRewrite: {'^/api' : ''}
    }
  ];

  module.exports = proxy;