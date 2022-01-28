import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import react from 'react';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    {/*
        =Usuario
            - Usuario digita no campo texto
            - Apertar enter para enviar
            - Tem que add o texto na listagem
            
        =DEV
            -[X] Campos Criados
            -[X] Vamos Usar onChange e useState para a variavel de texto
            -[X] Lista de msg
    */}
    // ./Sua lógica vai aqui

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaDeMensagens.length,
            de: 'RafaCS2002',
            texto: novaMensagem
        };
        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens,
        ]);
        setMensagem("");
    }

    const [mensagem, setMensagem] = React.useState("");
    const [listaDeMensagens, setListaDeMensagens] = react.useState([]);


    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary["400"],
                backgroundImage: 'url(https://www.tbsconsultoria.com.br/wp-content/uploads/2021/05/fantasy-universe-space-background-volumetric-lighting-3d-render-1-scaled.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700]+"80",
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600]+'80',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* 
                    lista De Mensagens: {listaDeMensagens.map((mensagemAtual)=>{
                                                console.log(mensagemAtual)
                                                return(
                                                    <li key={mensagemAtual.id}>
                                                        {mensagemAtual.texto}
                                                    </li>
                                                )
                                            })
                                        } */}

                    <MessageList mensagens={listaDeMensagens} />
                    {/* <MessageList mensagens={[]}/> */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                console.log(event)
                                if (event.key == 'Enter' && mensagem != '') {
                                    handleNovaMensagem(mensagem);
                                    event.preventDefault();
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagemAtual) => {
                return (
                    <Text
                        key={mensagemAtual.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/RafaCS2002.png`}
                            />
                            <Text tag="strong">
                                {mensagemAtual.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagemAtual.texto}
                    </Text>
                )
            })}

        </Box>
    )
}