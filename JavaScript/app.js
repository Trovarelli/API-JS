// Key da API 
const apiKey = {key:'9485c9ea-2a36-4f3b-83df-d993a8348c5e'}

//GET fetch requisição
fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${apiKey.key}`)
    .then((response)=>{
        if(!response.ok) throw new Error(`Erro ao executar a requisição, status ${response.status}`)
        return response.json()
    })
    .then((api)=>{
        var texto = ''
        //pega 15 moedas melhores rankeadas e seus simbolos  
        var rank = api
            .data.filter((elemento)=>{
                if(elemento.rank <= 15) return elemento
            })
            .sort((a, b)=>{
                if(a.rank > b.rank) return 1
                if(a.rank < b.rank) return -1
                return 0
            })
        for(let i = 0; i < rank.length; i++){
            //mostra a informação da API
            texto = texto + `
            <div class="media">
                <img src="/IMG/coin.jpg" class="padding"class="aling-self-center mr-3" alt="coin">
                <div class="media-body" class="test">
                    <h5 class="mt-2">${rank[i].name}</h5>
                    <p>Simbolo: ${rank[i].symbol}</p>
                    <p>Rank: ${rank[i].rank}</p>
                </div>
            </div>
            `
            document.getElementById('coins').innerHTML = texto
        }
    })
    .catch((error) =>{
        console.error(error.message)
    })
    