/**
 * 封装日期处理
 */
layui.define(['table', 'form'], function (exports) {
    var $ = layui.$;

    var qDate = {};

    /*
     * 时间戳转yyyy-MM-dd hh:mm:ss
     */
    qDate.formatDateTime = function(inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    };

    /*
     * 获取当前年的第几周，以及周对应的日期范围（根据当前日期的时间）
     */
    qDate.getYearWeekRange = function (year, weekNum) {
        var date = null;
        var year = year;
        var month = null;
        var day = null;
        var d = null;
        if (weekNum == null || weekNum == "") {//如果为空，默认加载当前日期，否则加载选择的周数
            date = new Date();//获取系统时间
            year = date.getFullYear();//年
            month = date.getMonth() + 1;//月
            day = date.getDate();//
            var d = year + "-" + month + "-" + day;
        } else {
            if (weekNum.length == 3) {
                weekNum = weekNum.substring(1, 2);
            } else if (weekNum.length == 4) {
                weekNum = weekNum.substring(1, 3);
            }
            var weekDay = getDayEveryDay(year, weekNum);
            d = weekDay[0];//获取对应周数的第一天
        }
        //获取当前日期的为今年的第几周的周数，常规的获取直接调用getWeekNumber(year, month, day);
        /*由于项目需要，我这儿的周定义为周五到下周四为一周,所以我传入的日期参数得往前推4天，
        *然后在调用常规的计算周数的方法
        */
        var beforeFourDay = GetDateStr(-7, d);//当前日期前推4天的日期,返回值格式为2017-01-01

        if (weekNum == null || weekNum == "") {//如果为空，默认加载当前日期的周数以及对应范围,否未为选择的周数
            weekNum = getWeek(beforeFourDay) + 1;//按照周五到下周四为一周，计算当前日期为今年的第几周
        } else {
            weekNum = weekNum;
        }
        //获取当前日期的为今年的第几周的周数日期范围，getDateRange("2017-01-01")，在调用常规的计算周数日期的方法返回值为["2016-12-26","2017-1-1"];
        /*由于项目需要，我这儿的周定义为周五到下周四为一周,
        *在调用常规的计算周数日期的方法返回值时得相应做出调整getDateRange("2017-01-01");return ["2016-12-26","2017-1-1"];
        * arr[0]前推3天，arr[1]后推5天,["2016-12-30","2017-1-5"],得出2017年的1月1馹,(按照周五到下周四算一周为一周的日期范围为["2016-12-30","2017-1-5"])
        */

        var weekRange = getDateRange(beforeFourDay);//常规的传入时间返回周的范围(周一到周天) return 格式["2016-12-26","2017-1-1"]
        weekRange[0] = GetDateStr(7, weekRange[0]);//后推4天
        weekRange[1] = GetDateStr(7, weekRange[1]);//后推4天


        //返回当前日期为[年，周数，周的范围start,周的范围end],按照周五到下周四为一周
        return [year, weekNum, weekRange[0], weekRange[1]];
    }


    /*
     * 这个方法是获取周对应的日期范围(常规的一周为周一到周天为一周
     * 参数datevalue如：2017-01-01)
     */
    qDate.getDateRange = function (datevalue) {
        var dateValue = datevalue;
        var arr = dateValue.split("-")
        //月份-1 因为月份从0开始 构造一个Date对象
        var date = new Date(arr[0], arr[1] - 1, arr[2]);

        var dateOfWeek = date.getDay();//返回当前日期的在当前周的某一天（0～6--周日到周一）

        var dateOfWeekInt = parseInt(dateOfWeek, 10);//转换为整型

        if (dateOfWeekInt == 0) {//如果是周日
            dateOfWeekInt = 7;
        }
        var aa = 7 - dateOfWeekInt;//当前于周末相差的天数

        var temp2 = parseInt(arr[2], 10);//按10进制转换，以免遇到08和09的时候转换成0
        var sunDay = temp2 + aa;//当前日期的周日的日期
        var monDay = sunDay - 6//当前日期的周一的日期

        var startDate = new Date(arr[0], arr[1] - 1, monDay);
        var endDate = new Date(arr[0], arr[1] - 1, sunDay);

        var sm = parseInt(startDate.getMonth()) + 1;//月份+1 因为月份从0开始
        var em = parseInt(endDate.getMonth()) + 1;

        var start = startDate.getFullYear() + "-" + sm + "-" + startDate.getDate();
        var end = endDate.getFullYear() + "-" + em + "-" + endDate.getDate();
        var result = new Array();
        result.push(start);
        result.push(end);

        return result;
    }


    /**
     * 以下几个函数是判断当前日期所对应的周数，如2017-1-1，为2017年第一周,return 1
     */

    /*
     * 判断年份是否为润年
     */
    qDate.isLeapYear = function (year) {
        return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    }
    /**
     10  * 获取某一年份的某一月份的天数
     11  *
     12  * @param {Number} year
     13  * @param {Number} month
     14  */
    qDate.getMonthDays = function (year, month) {
        return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
    }

    /*
     * 获取时间所在周数
     */
    qDate.getWeek = function (dt) {
        let d1 = new Date(dt);
        let d2 = new Date(dt);
        d2.setMonth(0);
        d2.setDate(1);
        let rq = d1 - d2;
        let days = Math.ceil(rq / (24 * 60 * 60 * 1000));
        let num = Math.ceil(days / 7);
        return num;
    }

    /*
     * js获取当前指定的前几天的日期,往前推4天，GetDateStr(4)，后推4天GetDateStr(-4)
     */
    qDate.GetDateStr = function (AddDayCount, date) {
        var dd = new Date(date);
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
    }

    /*
     * 传入年，周数，获取周数对应的所有日期
     */
    qDate.getDayEveryDay = function (year, index) {
        var d = new Date(year, 0, 1);
        while (d.getDay() != 1) {
            d.setDate(d.getDate() + 1);
        }
        var to = new Date(year + 1, 0, 1);
        var i = 1;
        var arr = [];
        for (var from = d; from < to;) {
            if (i == index) {
                arr.push(from.getFullYear() + "-" + (from.getMonth() + 1) + "-" + from.getDate());
            }
            var j = 6;
            while (j > 0) {
                from.setDate(from.getDate() + 1);
                if (i == index) {
                    arr.push(from.getFullYear() + "-" + (from.getMonth() + 1) + "-" + from.getDate());
                }
                j--;
            }
            if (i == index) {
                return arr;
            }
            from.setDate(from.getDate() + 1);
            i++;
        }
    }

    /*
     * 获取一年总周数
     */
    qDate.getYearWeek = function (year) {
        var dt = new Date(year, 12, 1);
        //当年最后一天
        var date1 = new Date(dt.getTime() - 1000 * 60 * 60 * 24);
        //当年第一天 1.1
        var date2 = new Date(year, 0, 1);
        //获取1月1号星期（以周一为第一天，0周一~6周日）
        var dateWeekNum = date2.getDay() - 1;
        if (dateWeekNum < 0) {
            dateWeekNum = 6;
        }
        if (dateWeekNum < 4) {
            //前移日期
            date2.setDate(date2.getDate() - dateWeekNum);
        } else {
            //后移日期
            date2.setDate(date2.getDate() + 7 - dateWeekNum);
        }
        var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        if (d < 0) {
            var date3 = (date1.getFullYear() - 1) + "-12-31";
            return getYearWeek(date3);
        } else {
            //得到年数周数
            var year = date1.getFullYear();
            var week = Math.ceil((d + 1) / 7);
            return week;
        }
    }

    exports('qDate', qDate);
});