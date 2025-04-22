import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10, // Number of virtual users
    duration: '30s', // Duration of the test
};

export default function () {
    const url = 'https://jsonplaceholder.typicode.com/posts'; // Dummy endpoint for testing
    const payload = JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            // No authorization needed for this public API
        },
    };

    let response = http.post(url, payload, params);

    check(response, {
        'is status 201': (r) => r.status === 201, // JSONPlaceholder returns 201 for successful POST
        'response time is less than 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1); // Sleep for 1 second between iterations
}