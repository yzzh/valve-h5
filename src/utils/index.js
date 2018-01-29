// <script src="../tools/jquery.min.js"></script>

function Ajax1(param) {
    var data = param.data || {};
    var type = param.type || 'get';
    var success = param.success || function() {};
    var error = param.error || function() {};
    var url = 'http://t.jimingkeji.com.cn/jiming-website/home/' + (param.url || '');
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: param.dataType || 'json',
        success: function(res) {
            if (res.status === 0) {
                success(res.data);
            } else {
                error(res);
            }
        },
        error: error,
    })
};

export function param(a) {
    let s = [],
        add = function(key, valueOrFunction) {
            // If value is a function, invoke it and use its return value
            let value = typeof valueOrFunction === 'function' ?
                valueOrFunction() :
                valueOrFunction;

            s[s.length] = `${encodeURIComponent(key)}=${encodeURIComponent(value == null ? '' : value)}`;
        };

    // If an array was passed in, assume that it is an array of form elements.
    if (Array.isArray(a) || typeof a === 'object') {

        // Serialize the form elements
        Object.keys(a).forEach(key => {
            add(key, a[key]);
        });

    } else {
        return a;
    }
    // Return the resulting serialization
    return s.join('&');
}

function Ajax({
    data,
    method,
    url = '',
    type = 'get',
}) {
    return new Promise((resolve, reject) => {
        try {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        resolve(response);
                    } else {
                        // throw new Error(`status:${xhr.status},error:${xhr.responseText}`)
                        let errInfo = {
                            status: xhr.status,
                            message: xhr.responseText
                        };
                        console.error(errInfo);
                        reject(errInfo);
                    }
                }
            };
            xhr.onerror = function(err) {
                console.error(err);
                reject(err);
            };
            let urlParam = '';
            if (type && typeof type === 'string' && type.toLocaleLowerCase() === 'get') {
                urlParam = data ? param(data) : '';
                if (urlParam) {
                    urlParam = `&${urlParam}`;
                }
            }
            console.log(112);
            console.log(CONFIG);
            xhr.open(type, `${CONFIG.url}${url}?t=${Date.now()}${urlParam}`, true);
            if (type && typeof type === 'string' && type.toLocaleLowerCase() === 'post' && data != null) {
                if (method === 'raw') {
                    xhr.setRequestHeader('Content-Type', 'application/json;');
                    return xhr.send(JSON.stringify(data));
                }
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                return xhr.send(param(data));
            }
            return xhr.send(null);
        } catch (e) {
            reject(e);
        }
    });
};

export { Ajax1, Ajax }
