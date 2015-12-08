angular.module('RepsApp', [
  'RepsAppControllers'
]);

angular
  .module('RepsAppControllers', [
    'repsService'
  ])
  .controller('MainCtrl', function (reps) {
    var main = this;
    main.reps = [];
    main.congressType = 'reps'; // or sens

    main.loading = false;

    main.apis = [
      {
        label: 'Zip',
        method: function (zip) {
          main.loading = true;
          reps('all', 'zip', zip).then(function (data) {
            main.reps = data;
            main.loading = false;
          });
        }
      },
      {
        label: 'Last Name',
        method: function (name) {
          main.loading = true;
          reps(main.congressType, 'name', name).then(function (data) {
            main.reps = data;
            main.loading = false;
          });
        }
      },
      {
        label: 'State',
        method: function (state) {
          main.loading = true;
          reps(main.congressType, 'state', state).then(function (data) {
            main.reps = data;
            main.loading = false;
          });
        }
      }
    ];

    main.criteria = main.apis[0];
  });

angular
  .module('repsService', [])
  .factory('reps', function ($http) {
    var host = 'http://dgm-representatives.herokuapp.com';

    /**
     * @function search
     * @param {String} type - can be "all", "reps", "sens"
     * @param {String} criteria - can by "zip", "name", "state"
     * @param {String} query - can any string
     */
    function search(type, criteria, query) {
      return $http
        .get(host + '/' + type + '/by-' + criteria + '/' + query)
        .then(function (response) {
          return response.data;
        });
    }

    return search;
  });
