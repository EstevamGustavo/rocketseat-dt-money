import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createServer, Model, Server } from 'miragejs'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'dev',
          amount: 7000,
          createdAt: new Date('2022-02-12 09:00:00')

        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'casa',
          amount: 1100,
          createdAt: new Date('2022-02-12 09:00:00')

        }
      ]
    })
  },
  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })


    this.post('/transactions', (schema, request) => {
      console.log('teste');

      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })

  }
})


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
