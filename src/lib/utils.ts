// TODO : more efficient way for convert local and utc time
export const formatDate = (date: Date) => {
    // use local time
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}