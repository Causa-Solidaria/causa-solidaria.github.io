
async function checkFileExists(filePath: string): Promise<boolean>{
    try {
        const response = await fetch(filePath, { method: 'HEAD' });
      
        if (response.status == 200) {
            return true;
        }else if(response.status == 404){
            return false
        }else{
            console.error(`Erro ao verificar o arquivo: ${response.status}`);
            return false;
        }
    } catch (error) {
      console.error(`Erro de rede ao verificar o arquivo: ${error}`);
      return false;
    }
  }

  export default checkFileExists;