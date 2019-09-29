const OPTIONS = {
  jpegRecompress: ['--strip', '--quality', 'medium', '--max', 80],
  mozjpeg: ['-optimize', '-progressive'],
  svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
};

module.exports = {
  OPTIONS,
};
