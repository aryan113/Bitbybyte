const Airtable = require('airtable');
const API_KEY = 'patwXzkI0ezdZsVSg.52b54dda6e51b05c2c25129f348b03f8397728ac6fa9a6c8d8757fd857126a5c'
const base = new Airtable({ apiKey: API_KEY }).base('appYuNzt3cbw4NeEQ');

export const getPosts = (successCallback, failureCallback, finalCallback) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://api.airtable.com/v0/appYuNzt3cbw4NeEQ/drafts?view=live&sort[0][field]=updated_at&sort[0][direction]=desc');
    xhr.setRequestHeader('Authorization', `Bearer ${API_KEY}`)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const jsonRes = JSON.parse(xhr.response);
                successCallback({ data: jsonRes });
            } else {
                failureCallback();
            }
            finalCallback();
        }
    };

    xhr.send();
}

export const getInReviewPosts = (successCallback, failureCallback, finalCallback) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://api.airtable.com/v0/appYuNzt3cbw4NeEQ/drafts?view=review&sort[0][field]=updated_at&sort[0][direction]=desc');
    xhr.setRequestHeader('Authorization', `Bearer ${API_KEY}`)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const jsonRes = JSON.parse(xhr.response);
                successCallback({ data: jsonRes });
            } else {
                failureCallback();
            }
            finalCallback();
        }
    };

    xhr.send();
}

export const makePostLive = (postObj, successCallback, failureCallback, finalCallback) => {
    base('drafts').update(postObj.id, {
        "status": "live",
    }, function (err, record) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback(record);
        finalCallback();
    });
}

export const updatePost = (postObj, successCallback, failureCallback, finalCallback) => {
    base('drafts').update(postObj.id, {
        title: postObj?.title,
        caption: postObj?.caption
    }, function (err, record) {
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
    }, function (err, record) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback(record);
        finalCallback();
    });
}

export const generateNewPosts = (dateRange, successCallback, failureCallback, finalCallback) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://klnq38lwqj.execute-api.ap-south-1.amazonaws.com/dev/api/news');
    xhr.setRequestHeader('Authorization', `Bearer ${API_KEY}`)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const jsonRes = JSON.parse(xhr.response);
                successCallback({ data: jsonRes });
            } else {
                failureCallback();
            }
            finalCallback();
        }
    };

    xhr.send(JSON.stringify({ ...dateRange }));
}
