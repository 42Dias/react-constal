import axios from "axios"
import { AiOutlineConsoleSql } from "react-icons/ai"
import { toast } from "react-toastify"
import { api, ip, porta } from "../api"


export default async function uploadImage(newImage) {
    const formData = new FormData()

    console.log(newImage)

    formData.append('file', newImage)

    let imageName = newImage.name
    console.log(imageName)

    let credentials = await api.get(`file/credentials`, {
        params: {
            filename: imageName,
            storageId: 'produtoImagem1',
        },
    })
    if (credentials.status != 200) {
        toast.info('Imagem inválida, ou problemas com o servidor :(')
        return
    }

    const backendUrl = `${ip}:${porta}`

    const credentialsData = credentials.data
    const credentialRawUrl = credentialsData.uploadCredentials.url
    //http://localhost:8080/api/file/

    const credencial = credentialRawUrl.replace("http://localhost:8157", "")

    
    console.log("credencial ")
    console.log( credencial )



    console.log(credencial)

    let upload = await axios.post(credencial, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    if (upload.status != 200) {
        toast.info('Arquivo inválido')
        return
    }
    toast.success('Arquivo Válido!')


    console.log(credentialsData.downloadUrl)
    const credentialDownload = credentialsData.downloadUrl.replace("http://localhost:8080", "")

    
    console.log(credentialDownload)


    return credentialDownload
}