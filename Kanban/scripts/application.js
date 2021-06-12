const Application = {
    //Метод, сохраняющий данные в локальное хранилище
    save () {
        const notes = {
                idCounter: Note.idCounter,
                items: []
        }
        document
            .querySelectorAll('.note')
            .forEach(noteElement => {
                const note = {
                    id: parseInt(noteElement.getAttribute('data-note-id')),
                    content: noteElement.textContent,
                    notify_date: noteElement.getAttribute('date'),
                    notified: noteElement.getAttribute('notified'),
                    describe: noteElement.getAttribute('describe')
                }
                notes.items.push(note)
            })

        //Загрузка данных в локальное хранилище
        const json = JSON.stringify(notes)
        localStorage.setItem('checkItBox', json)

        return notes
    },
    //Метод, загружающий данные из локального хранилища
    load() {
        //Проверка на наличие записи по ключу
        if(!localStorage.getItem('checkItBox')) {
            return
        }
        
        const mountPoint = document.querySelector('[data-notes]')
        mountPoint.innerHTML = ''

        const object = JSON.parse(localStorage.getItem('checkItBox'))
        //Ввод загруженных данных обратно в расширение
        for (const note of object.items) {
            const noteElement = Note.createNote(note.id, note.content, note.notify_date, note.notified, note.describe)
            mountPoint.append(noteElement)
        }

    }

}
