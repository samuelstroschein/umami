/* eslint-disable */
const { v4 } = require('uuid');
const { addDays, addMinutes, isBefore } = require('date-fns');
const { DESKTOP_OS, BROWSERS, DEVICES, ISO_COUNTRIES } = require('../lib/constants');

const SCREENS = ['1920x1080', '1280x720', '1440x900', '2560x1440', '1366x768'];

const endDate = new Date();
const startDate = addDays(endDate, -30);
const sql = [];

function generate(func, count) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(func(i));
  }
  return items;
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomKey(obj) {
  return obj[random(Object.keys(obj))];
}

function range(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insert(table, columns, values) {
  sql.push(`INSERT INTO ${table} (${columns.join(',')}) VALUES (${values.join(',')})`);
}

// Create website
insert(
  'website',
  ['website_uuid', 'user_id', 'name', 'domain'],
  [v4(), 1, 'Website 1', 'website1.com'],
);

// Create sessions
const sessions = [];
let tempDate = startDate;
while (isBefore(tempDate, endDate)) {
  const id = v4();
  sessions.push(id);

  insert(
    'session',
    [
      'session_uuid',
      'website_id',
      'hostname',
      'browser',
      'os',
      'device',
      'screen',
      'language',
      'country',
      'created_at',
    ],
    [
      id,
      1,
      'website1.com',
      randomKey(BROWSERS),
      random(DESKTOP_OS),
      random(DEVICES),
      random(SCREENS),
      randomKey(ISO_COUNTRIES),
      randomKey(ISO_COUNTRIES),
      tempDate.toISOString(),
    ],
  );

  tempDate = addMinutes(tempDate, range(5, 60));
}

console.log(sql.join('/n'));
