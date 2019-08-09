import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333' // 10.0.3.2 endereço ip do genymotion
});

export default api;



// comando para usar o localhost normalmente dizendo para ele procurar a porta 3333 na minha maquina virtual
// redirecionamento de porta
// adb reverse tcp:3333 tcp:3333