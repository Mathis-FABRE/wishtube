function getter (object, path) {
    let current = object;

    path.forEach((item) => {
        if (!current[item]) {
            return 'path error';
        }
        current = current[item];
    });

    return current;
}

module.exports.getter = getter;
