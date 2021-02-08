const fs = require('fs');

function copy (srcDir, dstDir) {
  let results = [];
  const list = fs.readdirSync(srcDir);
  let src, dst;
  list.forEach(function (file) {
    src = srcDir + '/' + file;
    dst = dstDir + '/' + file;
    // console.log(src);
    const stat = fs.statSync(src);
    if (stat && stat.isDirectory()) {
      try {
        console.log('creating dir: ' + dst);
        fs.mkdirSync(dst);
      } catch (e) {
        console.log('directory already exists: ' + dst);
      }
      results = results.concat(copy(src, dst));
    } else {
      try {
        console.log('copying file: ' + dst);
        // fs.createReadStream(src).pipe(fs.createWriteStream(dst));
        fs.writeFileSync(dst, fs.readFileSync(src));
      } catch (e) {
        console.log('could\'t copy file: ' + dst);
      }
      results.push(src);
    }
  });
  return results;
}

module.exports = copy;
