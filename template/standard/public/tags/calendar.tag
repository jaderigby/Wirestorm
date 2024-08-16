<calendar>
  <style>
    h2 {
      padding: 20px 40px;
      margin-right: 2px;
      margin-bottom: 1px;
      background-color: #444;
    }
    h2 span.year {
      display: block;
      float:right;
    }
    .calendar-block {
      margin-bottom: 40px;
    }
    .weekday {
      float: left;
      text-align: center;
      margin-right: 1px;
      margin-bottom: 1px;
      padding: 10px 0;
      width: 14.18%;
      color: white;
      background-color: #5a5a5a;
    }
    .box {
      float: left;
      display: block;
      margin-right: 1px;
      margin-bottom: 1px;
      width: 14.18%;
      height: 85px;
      color: white;
      text-align: center;
      line-height: 3;
      background: #444;
      font-size: 1.8rem;
      transition: all 0.17s ease-in-out;
      cursor: pointer;
    }
    .box.valid:hover {
      background-color: slategrey;
    }
    .cf:after {
      content: "";
      display: block;
      clear: both;
    }
    .box.valid[data-mark="true"] {
      color: black;
      font-weight: bold;
      background-color: #e4bf90;
    }
  </style>
  <main>
    <div class="calendar-block cf" each={ item, index in calendarObj }>{ totalDays }
      <h2>{ item.month } <span class="year">{ item.year }</span></h2>
      <div each={ item in weekdays }>
        <div class="weekday">{ item }</div>
      </div>
      <div each={ day, i in item.days }>
        <div onclick={ changeStatus } class={ day > 0 && day !== 100 ? 'box valid' : 'box' }>{ day > 0 && day !== 100 ? day : '' }</div>
      </div>
    </div>
  </main>
  <script>
    function each(ARRAY, STOP, STEP) {
      function newLoop(FUNC) {
        var condition = false;
        try {
          for (var i = 0; i < ARRAY.length; i++) {
            var _self_ = ARRAY[i]
            var _i_ = {}
            _i_.iter = i
            _i_.value = ARRAY[i]
            _i_.next = ARRAY[i + 1]
            _i_.previous = ARRAY[i - 1]
            _i_.up = function(n) { return ARRAY[i + n] }
            _i_.down = function(n) { return ARRAY[i - n] }
            condition = FUNC(_self_, _i_)
            if (condition) {
              break
            }
          }
        }
        catch(e) {
          var parentFunction;
          var re = /(\w+)@|at (\w+) \(/g;
              var aRegexResult = re.exec(e.stack);
              parentFunction = aRegexResult[1] || aRegexResult[2];
          console.error('Each() loop within function "' + parentFunction + '"' + ' failed! ===> ' + e);
        }
      }
      function newRange(FUNC) {
        try {
          ARRAY = parseInt(ARRAY)
          var start = 0
          var stop = ARRAY
          var step = 1

          if (typeof STOP !== 'undefined') {
            start = ARRAY
            stop = parseInt(STOP)
          }

          if (typeof STEP !== 'undefined') {
            step = parseInt(STEP);
          }

          for (var i = start; (i < stop && step > -1) || (i > stop && step < 0); i += step) {
            var _self_ = i
            FUNC(_self_)
          }
        }
        catch(e) {
          var parentFunction;
          var re = /(\w+)@|at (\w+) \(/g;
          var aRegexResult = re.exec(e.stack);
          parentFunction = aRegexResult[1] || aRegexResult[2];
          console.error('Each() loop within function "' + parentFunction + '"' + ' failed! ===> ' + e);
        }
      }
      return {
        dothis: newLoop,
        range: newRange
      }
    }

    const months = [
      'unknown',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    this.weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }

    const currentYear = new Date().getFullYear();
    const monthToStart = new Date().getMonth() + 1;
    // monthToStart = 2;
    const monthToEnd = monthToStart + 2;

    changeStatus(e) {
      let approval = confirm('Have you completed all requirements for the day?\n\n- Push Ups\n- Sit Ups\n- Stretch & Reach');
      if (approval) {
        e.target.setAttribute('data-mark', 'true');
      }
    }

    function construct_month(YEAR, MONTH_TO_START, MONTH_TO_END) {
      // console.log("Test");
      const calendarList = []
      each(MONTH_TO_START, MONTH_TO_END + 1).range((_month_) => {
        let newObj = {};
        newObj['monthId'] = _month_;
        newObj['month'] = months[_month_];
        let date = new Date(`${newObj['month']} 1, ${YEAR}`);
        newObj['totalDays'] = daysInMonth(_month_, YEAR);
        newObj['startDay'] = date.getDay();
        newObj['days'] = [];
        newObj['year'] = currentYear;
        each(0, newObj['startDay']).range((_mark_) => {
          newObj['days'].push(0);
        });
        each(1, newObj['totalDays'] + 1).range((_day_) => {
          newObj['days'].push(_day_);
        });
        let fillers = 35 - newObj['totalDays'] - newObj['startDay'] + 1;
        // each(fillers - 1).range((_item_) => {
        //   newObj['days'].push("");
        // });
        if (fillers > 0) {
          each(fillers - 1).range((_item_) => {
            newObj['days'].push(100);
          });
        }
        else {
          each(fillers + 6).range((_item_) => {
            newObj['days'].push(100);
          });
        }
        calendarList.push(newObj);
        console.log(`Month ID: ${_month_}
  Month: ${newObj['month']}
  Start Day: ${newObj['startDay']}
  Total Days: ${newObj['totalDays']}
  Current Year: ${currentYear}
  Days: ${newObj['days']}`);
      });
      return calendarList;
    }

    this.calendarObj = construct_month(currentYear, monthToStart, monthToEnd);
  </script>
</calendar>
