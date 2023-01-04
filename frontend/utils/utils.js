export const fetchWithCreds = async (url, method="GET", body)=>{
    const dev = process.env.NEXT_PUBLIC_BUILD_STATUS != "PRODUCTION"
    let targetUrl = url
    if(dev){
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://127.0.0.1:8000"
        targetUrl = baseUrl+url
    }
    const fetchParams = {
        method,
        headers:{'Content-Type':'application/json'},
        mode:"cors",
        credentials:"include"
        
    }
    if(body){
        fetchParams.body = JSON.stringify(body)
    }

    try {
        const response = await fetch(
            targetUrl, fetchParams
        )        
        if(response.status == 404){
            return {success:false, error:"url not found"}
        }
        if(response.status >= 400){
            try {
                const error = await response.json()
                return {success:false, error:error, status:response.status}
            } catch (error) {
                return {success:false, error:"faild to get json response "+error, status: response.status}
            }
        }else{
            const data = await response.json()
            return {success:true, data}
        }

    } catch (error) {
        console.error(error)
        return {success: false, error, status:0}
    }

}

export const convertDateFormat = (dateString="")=>{
    return dateString.substr(0, dateString.lastIndexOf(":")).replace("T", " ")
  }