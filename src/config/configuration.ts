export default () => {
  // Cargamos todas las variables en memoria una sola vez
  const {
    URL = 'http://localhost',
    PORT = '3000',
    GLOBAL_PREFIX = 'api',
    PATH_SWAGGER = 'docu',
    VERSION = '1',
    ENVIRONMENT,
    HOST_LOGSTASH,
  } = process.env;

  // Retornamos las variables procesadas
  return {
    URL,
    PORT: parseInt(PORT, 10), // Convertimos el puerto a número
    GLOBAL_PREFIX,
    PATH_SWAGGER,
    VERSION,
    ENVIRONMENT,
    HOST_LOGSTASH,
  };
};
