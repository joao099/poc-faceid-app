interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'dshaud8213721udsahds',
                user: {
                    name: 'João Vitor',
                    email: 'joao.nunes@cwi.com.br'
                }
            })
        }, 2000)
    })
}