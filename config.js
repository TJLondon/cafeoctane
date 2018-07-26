const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export default {
    port: env.PORT || 8080,
    host: env.HOST || '0.0.0.0',
    mLabendpoint: 'mongodb://cafeoctane:BlackB3ard!@ds247001.mlab.com:47001/cafeoctane',
    localendpoint: 'mongodb://localhost:27017/cafeoctane',
    facebook: {
        appid: '240560926764008',
        secret: 'f2d92cb4e5439abf9ca30fe71a60458c',
        callback: 'http://localhost:8080/auth/callback/facebook'
    },
    get serverUrl() {
        return `http://${this.host}:${this.port}`;
}
};