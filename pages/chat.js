import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import react from 'react';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5NzkzNiwiZXhwIjoxOTU4OTczOTM2fQ.IeaW8aX7wggfura46S60EHzUGW7hjw61TeSE-nVtZgA';
const SUPABASE_URL = 'https://fcepuxpisonqqgrqomrw.supabase.co';
const supabaseClient = createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

supabaseClient
    .from('mensagens')
    .select('*')
    .then((dados)=>{
        console.log('Dados da consulta:',dados);
    });


export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState("");
    const [listaDeMensagens, setListaDeMensagens] = react.useState([]);

    React.useEffect(()=>{
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id',{ascending: false})
            .then(({data})=>{
                console.log('Dados da consulta:',data);
                setListaDeMensagens(data);
            });
    },[]);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: 'RafaCS2002',
            texto: novaMensagem
        };
        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({data})=>{
                console.log("Criando msg:",data[0])  
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens,
                ]);
            });
        setMensagem("");
    }

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
                                src={`https://github.com/${mensagemAtual.de}.png`}
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