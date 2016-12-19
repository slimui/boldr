import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

it('GET /galleries - Lists all galleries', async () => {
  const { status, body } = await request()
    .get('/api/v1/galleries');

  expect(status).toBe(200);
});
