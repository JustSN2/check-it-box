Application.load()
document
	.querySelectorAll('.info-block')
	.forEach(Info.process)
document
	.querySelectorAll('.column')
	.forEach(Column.process)
document
	.querySelectorAll('.note')
	.forEach(Note.process)

//Приём сообщения от background.js для подгрузки изменённых в фоне данных
chrome.runtime.onMessage.addListener(messageResieved);
function messageResieved(notified) {
	Application.load()
}



	





