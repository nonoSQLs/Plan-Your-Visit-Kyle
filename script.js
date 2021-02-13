/* eslint-disable func-names */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '3s', target: 1000 },
    { duration: '3s', target: 1500 },
    { duration: '3s', target: 2000 },
    { duration: '3s', target: 2000 },
    { duration: '3s', target: 1500 },
    { duration: '3s', target: 1000 },
  ],
  thresholds: {
    http_req_duration: ['p(99) < 1000'],
  },
  // scenarios: {
  //   constant_request_rate: {
  //     executor: 'constant-arrival-rate',
  //     rate: 1000,
  //     timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
  //     duration: '30s',
  //     preAllocatedVUs: 100, // how large the initial pool of VUs would be
  //     maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
  //   },
  // },
};

export default function () {
  http.get(`http://18.219.52.50:8080/api/recommended/${Math.floor(Math.random() * 10000001)}`);
  sleep(1);
}
