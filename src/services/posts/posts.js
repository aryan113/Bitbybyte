import axios from 'axios';

export const getPosts = (successCallback, failureCallback, finalCallback) => {
    const url = 'https://api.airtable.com/v0/appYuNzt3cbw4NeEQ/posts?sort[0][field]=updated_at&sort[0][direction]=desc';
    axios.get(url, {headers:{"Authorization" : `Bearer key8Fd9wPmEeVMGCJ`}}).then((res) => {
        if(res.status === 200) {
            successCallback(res);
        }
    }).catch((error) => {
        failureCallback(error);
    }).finally(() => {
        finalCallback();
    });
}