import request from 'superagent'

const CALENDAR_ID = '3cable7haq153qoq059fmqqd7c@group.calendar.google.com'
const API_KEY = 'AIzaSyAyki7RU7AOT7DatTC4arYscP7oNykpzR4'
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.forEach((event) => {
          events.push({
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
          });
        });
        callback(events);
      }
    })
}
