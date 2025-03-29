function hookFunction(src) {
    // 自定义逻辑处理
    return process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PROXY_TARGET + src : src
}
function FakeImage() {
    const img = new Image();
    const handler = {
        set(obj, prop, value) {
            if (prop === 'src') {
                console.log('Hook set src', value);
                obj[prop] = hookFunction(value);
            } else {
                return Reflect.set(...arguments);
            }
        }
    };
    return new Proxy(img, handler);
}
let img = new FakeImage();
// img.src = 'a.jpg'; // 此时会触发自定义逻辑处理

export default {img}