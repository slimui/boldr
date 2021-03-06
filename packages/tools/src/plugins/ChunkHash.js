import { getHashDigest } from 'loader-utils';

function compareModules(left, right) {
  if (left.resource < right.resource) {
    return -1;
  }
  if (left.resource > right.resource) {
    return 1;
  }
  return 0;
}

function getModuleSource(module) {
  const source = module._source || {};
  return source._value || '';
}

function concatenateSource(result, moduleSource) {
  return result + moduleSource;
}

function ChunkHash() {
  // empty
}

const hashType = 'sha256';
const digestType = 'base62';
const digestLength = 8;
// eslint-disable-next-line
ChunkHash.prototype.apply = function(compiler) {
  compiler.plugin('compilation', compilation => {
    compilation.plugin('chunk-hash', (chunk, chunkHash) => {
      // eslint-disable-next-line
      var source = chunk
        .mapModules(module => module)
        .sort(compareModules)
        .map(getModuleSource)
        // we provide an initialValue in case there is an empty module source. Ref: http://es5.github.io/#x15.4.4.21
        .reduce(concatenateSource, '');
      // eslint-disable-next-line
      var generatedHash = getHashDigest(source, hashType, digestType, digestLength);
      // eslint-disable-next-line
      chunkHash.digest = function() {
        return generatedHash;
      };
    });
  });
};

export default ChunkHash;
