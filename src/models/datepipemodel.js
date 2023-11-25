const monthArray = [
    { value: 'Jan',name:'January', id: 0 },
    { value: 'Feb',name:'February', id: 1 },
    { value: 'Mar',name:'March', id: 2 },
    { value: 'Apr',name:'April', id: 3 },
    { value: 'May',name:'May', id: 4 },
    { value: 'Jun',name:'Jun', id: 5 },
    { value: 'Jul',name:'July', id: 6 },
    { value: 'Aug',name:'Auguest', id: 7 },
    { value: 'Sep',name:'September', id: 8 },
    { value: 'Oct',name:'October', id: 9 },
    { value: 'Nov',name:'November', id: 10 },
    { value: 'Dec',name:'December', id: 11 }
]


const monthfind = (id) => {
    let value = 0
    let ext = monthArray.find(itm => itm.id === id)
    if (ext) value = ext.value
    return value
}

const monthname = (id) => {
    let ext = monthArray.find(itm => itm.id === id)
    return ext?ext?.name:'--'
}

const getWeekDate = (date = new Date(), week = 1) => {
    let d = new Date(date)
    let month = d.getMonth()
    month = String(month + 1)

    let value = 1
    if (week == 1) value = 1
    else if (week > 1) value = 7 * (week - 1)
    if (value > 30) value = 30

    return new Date(`${d.getFullYear()}-${month}-${value}`)
}

const date = (p) => {
    if(!p) return '--'
    let d = new Date(p)
    return `${d.getDate()} ${monthfind(d.getMonth())} ${d.getFullYear()}`
}

const stringToDate=(p)=>{
    let d=''
    if(p){
        d=new Date(p)
    }
    return d
}

const daysArray = [
    { value: 'monday', id: 1 },
    { value: 'tuesday', id: 2 },
    { value: 'wednesday', id: 3 },
    { value: 'thursday', id: 4 },
    { value: 'friday', id: 5 },
    { value: 'saturday', id: 6 },
    { value: 'sunday', id: 0 },
]

const getDayName = (id) => {
    let value = daysArray.find((itm) => itm.id === id).value
    return value;
}

const day = (p) => {
    if (!p) return ''
    let day = new Date(p).getDay()
    day = getDayName(day)
    return day
}

const time = (p) => {
    if (!p) return ''
    let v = p.split('-')
    if (v.length > 2) {
        return new Date(p).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    } else {
        return new Date(`2020-07-19 ${p}`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }
}

const datetime = (p) => {
    return `${date(p)}, ${time(p)}`
}

const timeString = (p) => {
    let date = new Date(p)
    let hr = String(date.getHours())
    let minutes = String(date.getMinutes())
    if (hr.length === 1) hr = `0${hr}`
    if (minutes.length === 1) minutes = `0${minutes}`
    return `${hr}:${minutes}:00`
}

const datetostring = (p) => {
    if (!p) return ''
    let date = new Date(p)
    let month = String(date.getMonth() + 1)
    let d = String(date.getDate())
    if (month.length === 1) month = `0${month}`
    if (d.length === 1) d = `0${d}`
    return `${date.getFullYear()}-${month}-${d}`
}

const getprepostdays = (p,no,type='pre') => {
    if (!p) return []
    let date = new Date(p)
    let arr=[]
    if(type=='pre'){
        for(let i=1;i<=no;i++){
            date.setDate(date.getDate()-1)
            arr.push(datetostring(date))
        }
    }else if(type=='post'){
        for(let i=1;i<=no;i++){
            date.setDate(date.getDate()+1)
            arr.push(datetostring(date))
        }
    }
    
    return arr
}

const datetoIso = (p) => {
    if (!p) return ''
    let date = datetostring(p)

    let value = `${date}T09:00:00.000Z`
    return value
}

const datetoIsotime = (p) => {
    let date = datetostring(p)
    let time = timeString(p)
    let value = `${date}T${time}.000Z`
    return value
}

const isototime = (p) => {
    if (!p) return ''
    let value = p.split('T')[1].split('.000Z')
    if (value.length === 2) {
    } else {
        value = p.split('T')[1].split('+')
    }
    return value[0]
}

const isotime = (p) => {
    return time(isototime(p))
}

const isotodate = (p) => {
    let d = new Date(`${datetostring(p)} ${isototime(p)}`)
    return d
}

const DaysNo = (s, e) => {
    // JavaScript program to illustrate 
    // calculation of no. of days between two date 

    // To set two dates to two variables
    var date1 = new Date(s);
    var date2 = new Date(e);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days + 1
}


const getDays = (strDate, endDate) => {
    var date1 = new Date(strDate);
    var date2 = new Date(endDate);
    let value = 0
    var diff = Math.abs(date2.getTime() - date1.getTime());
    var noofdays = Math.ceil(diff / (1000 * 3600 * 24));
    if (date1 > date2) {
        // console.error("Check-out date must be after check-in date!")
    }
    else {
        value = noofdays
    }
    value = value == 0 ? 1 : value;
    return value
}

const getDateStringArray = (strDate, endDate) => {
    let dArray = [];
    let sDate;
    let eDate;

    let prm = []
    let ps = String(strDate)
    prm = ps.split('-');

    if (prm.length == 3) {
        sDate = stringToDate(strDate);
        eDate = stringToDate(endDate);
    } else {
        sDate = new Date(strDate)
        eDate = new Date(endDate)
    }

    let total = getDays(strDate, endDate)

    if (sDate.getTime() == eDate.getTime()) {
        dArray.push(datetostring(sDate));
    } else {
        for (let i = 0; i <= total; i++) {
            // Adding the date to array
            // Increment the date by 1 day
            dArray.push(datetostring(sDate));
            sDate.setDate(sDate.getDate() + 1);
        }
    }

    return dArray;
}

const datepipeModel = {
    monthArray,
    monthname,
    DaysNo,
    getDateStringArray,
    date,
    stringToDate,
    day,
    datetostring,
    datetoIso,
    isototime,
    isotodate,
    isotime,
    datetoIsotime,
    time,
    timeString,
    datetime,
    monthfind,
    getprepostdays,
    getWeekDate
}

export default datepipeModel;
