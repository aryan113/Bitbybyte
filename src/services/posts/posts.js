const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'key8Fd9wPmEeVMGCJ' }).base('appYuNzt3cbw4NeEQ');
// export const getPosts = (successCallback, failureCallback, finalCallback) => {
//     const url = 'https://api.airtable.com/v0/appYuNzt3cbw4NeEQ/posts?sort[0][field]=updated_at&sort[0][direction]=desc';
//     axios.get(url, {headers:{"Authorization" : `Bearer key8Fd9wPmEeVMGCJ`}}).then((res) => {
//         if(res.status === 200) {
//             successCallback(res);
//         }
//     }).catch((error) => {
//         failureCallback(error);
//     }).finally(() => {
//         finalCallback();
//     });
// }
export const getPosts = (successCallback, failureCallback, finalCallback) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://api.airtable.com/v0/appYuNzt3cbw4NeEQ/drafts?view=live&sort[0][field]=updated_at&sort[0][direction]=desc');
    xhr.setRequestHeader('Authorization', `Bearer key8Fd9wPmEeVMGCJ`)
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if(xhr.status===200) {
            const jsonRes = JSON.parse(xhr.response);
            successCallback({data: jsonRes});
        } else {
            failureCallback();
        }
        finalCallback();
    }};

    xhr.send();
}

export const getInReviewPosts = (successCallback, failureCallback, finalCallback) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://api.airtable.com/v0/appYuNzt3cbw4NeEQ/drafts?view=review&sort[0][field]=updated_at&sort[0][direction]=desc');
    xhr.setRequestHeader('Authorization', `Bearer key8Fd9wPmEeVMGCJ`)
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if(xhr.status===200) {
            const jsonRes = JSON.parse(xhr.response);
            successCallback({data: jsonRes});
        } else {
            failureCallback();
        }
        finalCallback();
    }};

    xhr.send();
}

export const makePostLive = (postObj, successCallback, failureCallback, finalCallback) => {
    base('drafts').update(postObj.id, {
        "status": "live",
    }, function(err, record) {
        if (err) {
          failureCallback(err);
          return;
        }
        successCallback(record);
        finalCallback();
    });
}

export const rejectPost = (postObj, successCallback, failureCallback, finalCallback) => {
    base('drafts').update(postObj.id, {
        "status": "rejected",
    }, function(err, record) {
        if (err) {
          failureCallback(err);
          return;
        }
        successCallback(record);
        finalCallback();
    });
}

export const generateNewPosts = (postObj, successCallback, failureCallback, finalCallback) => {
    
}
