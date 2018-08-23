const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export default {
    port: env.PORT || 8080,
    host: env.HOST || '0.0.0.0',
    dbendpoint: 'mongodb://cafeoctane:BlackB3ard!@ds247001.mlab.com:47001/cafeoctane', //MLAD hosted
    //dbendpoint: 'mongodb://localhost:27017/cafeoctane', // local MongoDB service
    facebook: {
        appid: 240560926764008,
        secret: '2d61967ec1eaa82bb13ed6cfa60fe45c',
        callback: 'http://localhost:8080/auth/facebook/callback'
    },
    get serverUrl() {
        return `http://${this.host}:${this.port}`;
}
};