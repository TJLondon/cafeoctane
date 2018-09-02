CAFE OCTANE API

api/events
Returns ALL events, also accepts :limit parameter
Example
/api/events/12

===========

api/geo/encode
Expects parameters lng and lat
Returns Longitude and Latitude as GHash

Example
/api/geo/encode?lat=51.000&lat=-0.000

===========

api/events/trending/:limit
Returns a defined number of trending events, in descending order by date

Example
/api/events/trending/5

===========

api/events/upcoming/:limit
Returns a defined number of upcoming events, in descending order by date

Example
/api/events/upcoming/5

===========

api/events/:eventid
Returns individual event details

Example
/api/events/5b73edbabe6f1f2e64ba15fd

