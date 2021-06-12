const Note = {
    idCounter: 1,
    dragged: null,

    //Функция работы с записями notes в столбцах column
    process (noteElement) {
    	noteElement.addEventListener('dblclick', function (event) {
    		noteElement.setAttribute('contenteditable', 'true')
    		noteElement.removeAttribute('draggable')
			noteElement.focus()
			//Проверка на нажатие клавиши Enter во время редактирования задания
			noteElement.addEventListener('keydown', function(e) {
				if (e.keyCode === 13) {
				  noteElement.blur()
				}
			})
		})
		//Если элемент теряет фокус, оно сохраняется (если оно не пустое)
	    noteElement.addEventListener('blur', function (event) {
	    	noteElement.removeAttribute('contenteditable')
	    	noteElement.setAttribute('draggable', true)
	    	if (!noteElement.textContent.trim().length) {
				noteElement.remove()
				Note.idCounter -= 1
			}
			else {
				noteElement.click()
			}
			Application.save()
		})
		//Вывод дополнительной информации о задачи
		noteElement.addEventListener('click', function (event) {
			const info_element = document.querySelector('[data-text]')
			const noteID = noteElement.getAttribute('data-note-id')
			info_element.innerHTML = `<div class="overflow"><h2 class="taskHeader">`+ noteElement.textContent + `</h2>` + `<p class="develop">Описание задачи: </p>`
			+`<textarea class="info-text">` + noteElement.getAttribute('describe') + `</textarea>`+`<p class="develop">Установить напоминание на:</p><input date-note-id="`+ noteID
			+`"type="datetime-local" class="localdate" value="`+ noteElement.getAttribute('date') +`"></input>` +
			`<div class="delete-block" draggable="false">
            		<img draggable="false" class="header-icon" src="../icons/trash.svg" width="28px" height="28px"></img>
        	</div></div>`
			const search = '[date-note-id="'+noteID+'"]'
			const inputElement = info_element.querySelector(search)
			//Проверка корректности введённой даты и её сохранение,
			//если время уже прошло, задание отмечается уже выполненным
			inputElement.addEventListener('blur', function (event) {	
				if (inputElement.value < Note.setDate(false)) {
					noteElement.setAttribute('notified', 'true')
					noteElement.style.background = '#B0C4DE'
				}
				else {
					noteElement.setAttribute('notified', 'false')
					noteElement.style.background = '#A1D6E2'
				}
				noteElement.setAttribute('date', inputElement.value)
				Application.save()
			})
			//Ввод и сохранение описания задания
			const area = info_element.querySelector('.info-text')
			area.addEventListener('blur', function (event) {
				noteElement.setAttribute('describe', area.value)
				Application.save()
			})
			//Удаление задачи при нажатии на кнопку корзины
			const trashElement = info_element.querySelector('.delete-block')
			trashElement.addEventListener('click', function(event) {
				noteElement.remove()
				info_element.innerHTML = ''
				Application.save()
			})

		})	
		//Прослушивание сигналов на операцию Drag & Drop
    	noteElement.addEventListener('dragstart', Note.dragstart)
    	noteElement.addEventListener('dragend', Note.dragend)
	    noteElement.addEventListener('dragenter', Note.dragenter)
    	noteElement.addEventListener('dragover', Note.dragover)
    	noteElement.addEventListener('dragleave', Note.dragleave)
		noteElement.addEventListener('drop', Note.drop)

	},

	//Вывод даты, в зависимости от целей:
	//Вывод текущей даты или +1 час для только что созданных заданий
	setDate(plusHour) {
		var CurrentTime = new Date()
		if(plusHour) {
			CurrentTime.setMilliseconds(60*60*1000)
		}
		var year = CurrentTime.getFullYear()
		var month = CurrentTime.getMonth()+1
		var day = CurrentTime.getDate()
		var hour = CurrentTime.getHours()
		var minute = CurrentTime.getMinutes()


		if (month < 10) {month = '0' + month}
		if (day < 10) {day = '0' + day}
		if (hour < 10) {hour = '0' + hour}
		if (minute < 10) {minute = '0' + minute}
		if (year < 10) {year = '000' + year}

		CurrentTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
		return CurrentTime
	},

    createNote (id = null, content = '', date='', notified='', describe='') {
        	//Задание параметров создаваемого элемента
	    	const noteElement = document.createElement('div')
	    	noteElement.classList.add('note')
			noteElement.setAttribute('draggable', 'true')
			noteElement.setAttribute('describe', describe)
			if(notified === 'true') {
				noteElement.setAttribute('notified', 'true')
				noteElement.style.background = '#B0C4DE'
			}
			else {
				noteElement.setAttribute('notified', 'false')
				noteElement.style.background = '#A1D6E2'
			}
			noteElement.setAttribute('notified', notified)
			if (date) {
				noteElement.setAttribute('date', date)
			}
			else {
				noteElement.setAttribute('date', this.setDate(true))
			}
			noteElement.textContent = content
			if(id) {
				noteElement.setAttribute('data-note-id', id)
				Note.idCounter = id + 1
			}
			else {
				noteElement.setAttribute('data-note-id', Note.idCounter)
				Note.idCounter++
			}
	    	Note.process(noteElement)

            return noteElement
    },

    //Далее идёт обработка события Drag&Drop (захват и перенос задачи)
    //Взятие задания и присвоение ему атрибута 'dragged'
    dragstart(event) {
    Note.dragged = this
    	this.classList.add('dragged')
		event.stopPropagation()
    },
    //Завершение переноса задания, удаление атрибута 'dragged'
    dragend(event) {
    	Note.dragged = null
    	this.classList.remove('dragged')

    	document
    		.querySelectorAll('.note')
			.forEach(x => x.classList.remove('under'))
    },
    //Функция, обрабатывающая вход перетаскиваемого элемента в зону другого элемента
    dragenter(event) {
    	if (this === Note.dragged) {
    		return
    	}
    	this.classList.add('under')

    },
    //Функция, обрабатывающая перемещение перетаскиваемого объекта над другим элементом
    dragover(event) {
    	event.preventDefault()
    	if (this === Note.dragged) {
    		return
    	}
    },
    //Выход перетаскиваемого элемента из зоны другого элемента
    dragleave(event) {
    	if (this === Note.dragged) {
    		return
    	}
    	this.classList.remove('under')
    },
    //Функция, вызываемая при отпускании перетаскиваемого элемента
    drop(event) {
    	if (this === Note.dragged) {
    		return
    	}
  	//Если элементы расположены в одном столбце, то меняем их местами
    	if (this.parentElement === Note.dragged.parentElement) {
    		const note = Array.from(this.parentElement.querySelectorAll('.note'))
    		const indexA = note.indexOf(this)
    		const indexB = note.indexOf(Note.dragged)
        
    		if(indexA < indexB) {
    			this.parentElement.insertBefore(Note.dragged, this)
    		}
    		else {
    			this.parentElement.insertBefore(Note.dragged, this.nextElementSibling)
			}
			Application.save()
    	}
    	//Если элементы из разных столбцов, то ничего не происходит
    	else if (this.parentElement !== Note.dragged.parentElement) {
    		return
    	}

    }
}

