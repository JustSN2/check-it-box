const Info = {
    process () {
	    const info_button = document.querySelector('.info-block')
        const info_element = document.querySelector('[data-text]')
        //Перехват сигнала на нажатие "click" по объекту
	    info_button.addEventListener('click', function (event) {
            info_element.innerHTML =
            `
                <p class="develop">Разработчик: Надточий В. И.
                студент СВГУ направления "Прикладная информатика
                и информационная безопасность" 3 курс</p>
                <p class="develop">Как пользоваться:</p>
                <div class="info-text">
                <ol>
                    <li>Для того, чтобы добавить задание нажмите на соответствующую надпись
                    под первой колонкой.</li>
                    <li>Если название задания было введено неправильно, нажмите на него два
                    раза и тогда его можно будет редактировать.</li>
                    <li>Чтобы удалить ненужное задание, нажмите сначала на него, а потом на иконку корзины
                    в правом нижнем углу.</li>
                    <li>Для того, чтобы поменять порядок заданий, можно нажать на него и перетащить в
                    в новое место.</li>
                    <li>Для установки времени уведомления нажмите на задание и в колонке "Описание"
                    выберите необходимые дату и время.</li>
                    <li>Для правильной работы уведомлений необходимо разрешить уведомления и разрешить браузеру
                    работать в фоновом режиме.</li>
                </ol>
                </div>
            `
        })	
    }
}