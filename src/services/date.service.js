export function formatDate(date) {
    let splited = date.split('-');
    return splited[2] + '/' + splited[1] + '/' + splited[0]
}

export function formatDateTime(date) {
    let splited = date.split('T');
    let fecha = formatDate(splited[0]);

    return splited[1] ? fecha + " - " + splited[1] : fecha;
}