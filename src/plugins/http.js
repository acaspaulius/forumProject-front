const host = 'localhost:2500';

export default {
  get: async (url) => {
    const res = await fetch(`http://${host}/${url}`);

    if (!res.ok) {
      const { message, status } = await res.json();

      const error = new Error(message);
      error.code = status;
      throw error;
    }

    return res.json();
  },
  post: async (url, data) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(`http://${host}/${url}`, options);

    if (!res.ok) {
      const { message, status } = await res.json();

      const error = new Error(message);
      error.code = status;
      throw error;
    }

    return res.json();
  },
  getWithToken: async (url) => {
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    };

    const res = await fetch(`http://${host}/${url}`, options);

    if (!res.ok) {
      const { message, status } = await res.json();

      const error = new Error(message);
      error.code = status;
      throw error;
    }

    return res.json();
  },
  postWithToken: async (url, data) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(`http://${host}/${url}`, options);

    if (!res.ok) {
      const { message, status } = await res.json();

      const error = new Error(message);
      error.code = status;
      throw error;
    }

    return res.json();
  },
};
