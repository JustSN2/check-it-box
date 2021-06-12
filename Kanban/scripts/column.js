const Column = {
    //Функция работы с колонкой
    process (columnElement) {
	    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')
	    //Перехват сигнала на нажатие "click" по объекту
        if(spanAction_addNote){
            spanAction_addNote.addEventListener('click', function (event) {
                const noteElement = Note.createNote()
                columnElement.querySelector('[data-notes]').append(noteElement)
                noteElement.setAttribute('contenteditable', true)
                noteElement.focus()
                noteElement.addEventListener('keydown', function(e) {
                    if (e.keyCode === 13) {
                      // можете делать все что угодно со значением текстового поля
                      noteElement.blur()
                    }
                })
            })
        }
    }
}