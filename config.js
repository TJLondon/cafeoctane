const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export default {
    port: env.PORT || 8080,
    host: env.HOST || '0.0.0.0',
    dbendpoint: 'mongodb://cafeoctane:BlackB3ard!@ds247001.mlab.com:47001/cafeoctane',
    get serverUrl() {
        return `http://${this.host}:${this.port}`;
}
};