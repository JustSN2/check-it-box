//Задаётся интервал, в котором программа будет в фоновом режиме
//загружать данные из локального хранилища
setInterval(function() {
    if(!localStorage.getItem('checkItBox')) {
        return
    }

    const object = JSON.parse(localStorage.getItem('checkItBox'))
    const tasks = new Array()
    for (const note of object.items) {
        if (nowDate() === note.notify_date && note.notified === "false"){
            note.notified = 'true'
            tasks.push(note.content)
        }
    }
    //Уведомление пользователя, если нашлись задачи для данного момента времени
    if(tasks.length !== 0) {
        notifyMe(tasks)
        tasks.length = 0
        const json = JSON.stringify(object)
        localStorage.setItem('checkItBox', json)
        chrome.runtime.sendMessage('done');
    }
    
}, 5000);

//Функция определения текущих даты и времени
function nowDate() {
    var today = new Date();
    var Year = today.getFullYear();
    var Month = today.getMonth()+1;
    var Day = today.getDate();
    var Hour = today.getHours();
    var Minutes = today.getMinutes();

    if (Month < 10) {Month = '0' + Month}
    if (Day < 10) {Day = '0' + Day}
    if (Hour < 10) {Hour = '0' + Hour}
    if (Minutes < 10) {Minutes = '0' + Minutes}
    if (Year < 10) {Year = '000' + Year}

    today = Year + '-' + Month + '-' + Day + 'T' + Hour + ':' + Minutes;
    return today
}

//Функция, генерирующая уведомление
function notifyMe(content) {
    var text = ''
    for (var i = 0; i < content.length; i++) {
        text += (i+1)+ ') ' + content[i] + '\n'
    }
    var myNotification = new Notification('У вас есть запланированные дела!', {body: text})
}