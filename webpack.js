const webpack = require("webpack");
const fs = require("fs");
const path = require("path");

const entries = fs.readdirSync("./assets/screens");
const filenames = entries.map(f => f.split("."));

const config = {
  entry: filenames.reduce((acc,val) => {
    const [filename,] = val;
    acc[filename] = path.resolve(__dirname, `assets/screens/${filename}.js`);
    return acc;
  }, {}),
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].js'
  }
}

async function bundle(){
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    compiler.close((closeErr) => { 
      if(err || closeErr) console.log("build 실패");
    });
  });
}

module.exports = {
  bundle
}
