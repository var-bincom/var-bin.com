const path = require("path");

const constants = require('./constants');

const PRES_ASSETS_IMAGES = (mainDirectory, conferenceNameDirectory) => path.join(
  __dirname,
  '../',
  mainDirectory,
  conferenceNameDirectory,
  constants.ASSETS_DIRECTORY,
  constants.IMAGES_DIRECTORY
);
const PRES_IMAGES = (mainDirectory, conferenceNameDirectory) => path.join(
  __dirname,
  '../',
  mainDirectory,
  conferenceNameDirectory,
  constants.SHOWER_DIRECTORY,
  constants.PICTURES_DIRECTORY
);
const PRES_ASSETS_STYLES = (mainDirectory, conferenceNameDirectory) => path.join(
  __dirname,
  '../',
  mainDirectory,
  conferenceNameDirectory,
  constants.ASSETS_DIRECTORY,
  constants.STYLES_DIRECTORY,
  constants.STYLES_CSS
);
const PRES_STYLES = (mainDirectory, conferenceNameDirectory) => path.join(
  __dirname,
  '../',
  mainDirectory,
  conferenceNameDirectory,
  constants.SHOWER_DIRECTORY,
  constants.STYLES_DIRECTORY
);
const PRES_INDEX_HTML = (mainDirectory, conferenceNameDirectory) => path.join(
  __dirname,
  '../',
  mainDirectory,
  conferenceNameDirectory,
  constants.SHOWER_DIRECTORY,
  constants.INDEX_HTML
);

module.exports = {
  PRES_ASSETS_IMAGES,
  PRES_IMAGES,
  PRES_ASSETS_STYLES,
  PRES_STYLES,
  PRES_INDEX_HTML
}
