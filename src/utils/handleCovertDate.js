export default function handleCovertDate(dateString) {
    let dateObject = new Date(dateString)

    let day = dateObject.getDate() + 1
    let month = dateObject.getMonth() + 1
    let year = dateObject.getFullYear()
    
    return `${day}/${month}/${year}`
}
