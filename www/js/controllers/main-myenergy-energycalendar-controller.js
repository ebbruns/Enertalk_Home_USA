angular.module('enertalkHomeUSA.controllers')
	
	.controller('EnergyCalendarCtrl', function($scope) {
		var currentYear,
			currentMonth;

		function init () {
			var currentDate = new Date();

			currentYear = currentDate.getFullYear();
			currentMonth = currentDate.getMonth() + 1;

			makeCalendarHeader(currentYear, currentMonth);
			makeCalendar(currentYear, currentMonth);
		}

		function getMonthName (month) {
			var monthName = '';

			if (typeof month === 'number') {
				month = month + '';
			}

			switch (month) {
				case '1':
					monthName = 'January';
					break;
				case '2':
					monthName = 'Febuary';
					break;
				case '3':
					monthName = 'March';
					break;
				case '4':
					monthName = 'April';
					break;
				case '5':
					monthName = 'May';
					break;
				case '6':
					monthName = 'June';
					break;
				case '7':
					monthName = 'July';
					break;
				case '8':
					monthName = 'August';
					break;
				case '9':
					monthName = 'September';
					break;
				case '10':
					monthName = 'October';
					break;
				case '11':
					monthName = 'November';
					break;
				case '12':
					monthName = 'December';
					break;
			}
			return monthName;
		}

		function makeCalendarHeader (year, month) {
			$scope.dayOfWeekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			$scope.calendarTitle = getMonthName(month) + ' ' + year;
		}
		function makeCalendar (year, month) {
			var start = new Date(year, month - 1, 1),
			end = new Date(start.getFullYear(), start.getMonth() + 1, 0),
			dateList = [];

			for (var i = 0; i < end.getDate() + start.getDay(); i += 1) {
				if (i < start.getDay()) {
					dateList.push({
						date: '',
						image: ''
					});
				} else {
					dateList.push({
						date: i - start.getDay() + 1,
						image: 'a'
					});
				}
			}

			$scope.dateList = dateList;
		}

		$scope.button = {
			clickLeft: function () {
				var date = new Date(currentYear, (currentMonth - 1) - 1, 1);
				currentYear = date.getFullYear();
				currentMonth = date.getMonth() + 1;

				makeCalendarHeader(currentYear, currentMonth);
				makeCalendar(currentYear, currentMonth);
			},
			clickRight: function () {
				var date = new Date(currentYear, (currentMonth - 1) + 1, 1);
				currentYear = date.getFullYear();
				currentMonth = date.getMonth() + 1;

				makeCalendarHeader(currentYear, currentMonth);
				makeCalendar(currentYear, currentMonth);
			}
		};

		init();
	});