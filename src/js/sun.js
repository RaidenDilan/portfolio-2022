// /* Extends the Javascript Date object */
// Date.prototype.sunrise = function(latitude, longitude, zenith) {
//   return this.sunriseSet(latitude, longitude, true, zenith);
// };
// Date.prototype.sunset = function(latitude, longitude, zenith) {
//   return this.sunriseSet(latitude, longitude, false, zenith);
// };
// Date.prototype.sunriseSet = function(latitude, longitude, sunrise, zenith) {
//   if (!zenith) zenith = 90.8333;
//
//   let hoursFromMeridian = longitude / Date.DEGREES_PER_HOUR;
//   let dayOfYear = this.getDayOfYear();
//   let approxTimeOfEventInDays;
//   let sunMeanAnomaly;
//   let sunTrueLongitude;
//   let ascension;
//   let rightAscension;
//   let lQuadrant;
//   let raQuadrant;
//   let sinDec;
//   let cosDec;
//   let localHourAngle;
//   let localHour;
//   let localMeanTime;
//   let time;
//
//   if (sunrise) approxTimeOfEventInDays = dayOfYear + ((6 - hoursFromMeridian) / 24);
//   else approxTimeOfEventInDays = dayOfYear + ((18.0 - hoursFromMeridian) / 24);
//
//   sunMeanAnomaly = (0.9856 * approxTimeOfEventInDays) - 3.289;
//
//   sunTrueLongitude = sunMeanAnomaly + (1.916 * Math.sinDeg(sunMeanAnomaly)) + (0.020 * Math.sinDeg(2 * sunMeanAnomaly)) + 282.634;
//   sunTrueLongitude = Math.mod(sunTrueLongitude, 360);
//
//   ascension = 0.91764 * Math.tanDeg(sunTrueLongitude);
//
//   rightAscension = 360 / (2 * Math.PI) * Math.atan(ascension);
//   rightAscension = Math.mod(rightAscension, 360);
//
//   lQuadrant = Math.floor(sunTrueLongitude / 90) * 90;
//   raQuadrant = Math.floor(rightAscension / 90) * 90;
//
//   rightAscension = rightAscension + (lQuadrant - raQuadrant);
//   rightAscension /= Math.DEGREES_PER_HOUR;
//
//   sinDec = 0.39782 * Math.sinDeg(sunTrueLongitude);
//   cosDec = Math.cosDeg(Math.asinDeg(sinDec));
//   cosLocalHourAngle = ((Math.cosDeg(zenith)) - (sinDec * (Math.sinDeg(latitude)))) / (cosDec * (Math.cosDeg(latitude)));
//
//   localHourAngle = Math.acosDeg(cosLocalHourAngle);
//
//   if (sunrise) localHourAngle = 360 - localHourAngle;
//
//   localHour = localHourAngle / Math.DEGREES_PER_HOUR;
//   localMeanTime = localHour + rightAscension - (0.06571 * approxTimeOfEventInDays) - 6.622;
//
//   time = localMeanTime - (longitude / Math.DEGREES_PER_HOUR);
//   time = Math.mod(time, 24);
//
//   let midnight = new Date(0);
//   midnight.setUTCFullYear(new Date().getUTCFullYear());
//   midnight.setUTCMonth(new Date().getUTCMonth());
//   midnight.setUTCDate(new Date().getUTCDate());
//
//   let milli = midnight.getTime() + (time * 60 * 60 * 1000);
//
//   return new Date(milli);
// };
// Date.prototype.getDayOfYear = function() {
//   let onejan = new Date(new Date().getFullYear(), 0, 1);
//   // let onejan = new Date(this.getFullYear(), 0, 1);
//   return Math.ceil((this - onejan) / 86400000);
// };
//
// Date.DEGREES_PER_HOUR = 360 / 24;
//
// /* Extends the Math object || Utility functions */
// Math.degToRad = (num) => {
//   return num * Math.PI / 180;
// };
// Math.radToDeg = (radians) => {
//   return radians * 180.0 / Math.PI;
// };
// Math.sinDeg = (deg) => {
//   return Math.sin(deg * 2.0 * Math.PI / 360.0);
// };
// Math.acosDeg = (x) => {
//   return Math.acos(x) * 360.0 / (2 * Math.PI);
// };
// Math.asinDeg = (x) => {
//   return Math.asin(x) * 360.0 / (2 * Math.PI);
// };
// Math.tanDeg = (deg) => {
//   return Math.tan(deg * 2.0 * Math.PI / 360.0);
// };
// Math.cosDeg = (deg) => {
//   return Math.cos(deg * 2.0 * Math.PI / 360.0);
// };
// Math.mod = (a, b) => {
//   let result = a % b;
//   if (result < 0) result += b;
//   return result;
// };
//
// /* Usage is very simple: */
// let sunset = new Date().sunset(51.4925, -0.1628); // Sunset tonight at the Triggertrap office
// let sunrise = new Date().sunrise(51.4925, -0.1628); // Sunrise at Stonehenge on midsummer's day 2000
// // let sunrise = new Date('2020-03-27').sunrise(51.4925, -0.1628); // Sunrise at Stonehenge on midsummer's day 2000
//
// // console.log('[SunMoon] sunset', sunset);
// // console.log('[SunMoon] sunrise', sunrise);
//
// navigator.geolocation.getCurrentPosition((position) => {
//   // Combine it with geolocation. Sunset tonight at your location.
//   console.log('[navigator] position', position);
//   sunset = new Date().sunset(position.coords.latitude, position.coords.longitude);
//   console.log('[navigator] sunset', sunset);
// });
// console.log('navigator', navigator);
