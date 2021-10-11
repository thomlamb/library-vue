import { useState, useEffect } from 'react';
import axios from 'axios';


const useAxios = ({ url, method, body = null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': true,
                'Content-Type': 'application/json',
              },
        },)
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body]);

    return { response, error, loading };
};

export default useAxios;
