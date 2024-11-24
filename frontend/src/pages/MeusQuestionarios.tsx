import { useEffect, useState } from "react";
import QuestionariosService from "../services/QuestionarioService";
import { Questionario } from "../types/models/Questionario";
import CardQuestionario from "../components/CardQuestionario";

const questoes = [
    {
        id: 1,
        nome: "Question\u00e1rio de Conhecimentos Gerais",
        descricao: "Este \u00e9 um question\u00e1rio de conhecimentos gerais.",
        categoria: "Conhecimentos Gerais",
        questoes: [
            {
                id: 1,
                enunciado: "Qual \u00e9 a capital da Fran\u00e7a?",
                alternativas: [
                    {
                        id: 1,
                        texto: "Paris",
                        correta: true,
                    },
                    {
                        id: 2,
                        texto: "Londres",
                        correta: false,
                    },
                    {
                        id: 3,
                        texto: "Berlim",
                        correta: false,
                    },
                    {
                        id: 4,
                        texto: "Madri",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:10.913Z",
                updated_at: "2024-10-21T17:21:10.913Z",
            },
            {
                id: 2,
                enunciado: "Quem pintou a Mona Lisa?",
                alternativas: [
                    {
                        id: 5,
                        texto: "Leonardo da Vinci",
                        correta: true,
                    },
                    {
                        id: 6,
                        texto: "Pablo Picasso",
                        correta: false,
                    },
                    {
                        id: 7,
                        texto: "Vincent van Gogh",
                        correta: false,
                    },
                    {
                        id: 8,
                        texto: "Claude Monet",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:10.936Z",
                updated_at: "2024-10-21T17:21:10.936Z",
            },
            {
                id: 3,
                enunciado:
                    "Qual \u00e9 o maior planeta do nosso sistema solar?",
                alternativas: [
                    {
                        id: 9,
                        texto: "J\u00fapiter",
                        correta: true,
                    },
                    {
                        id: 10,
                        texto: "Saturno",
                        correta: false,
                    },
                    {
                        id: 11,
                        texto: "Terra",
                        correta: false,
                    },
                    {
                        id: 12,
                        texto: "Marte",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:10.958Z",
                updated_at: "2024-10-21T17:21:10.958Z",
            },
            {
                id: 4,
                enunciado: "Em que ano a Segunda Guerra Mundial terminou?",
                alternativas: [
                    {
                        id: 13,
                        texto: "1945",
                        correta: true,
                    },
                    {
                        id: 14,
                        texto: "1939",
                        correta: false,
                    },
                    {
                        id: 15,
                        texto: "1941",
                        correta: false,
                    },
                    {
                        id: 16,
                        texto: "1950",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:10.977Z",
                updated_at: "2024-10-21T17:21:10.977Z",
            },
            {
                id: 5,
                enunciado: 'Quem escreveu "Dom Quixote"?',
                alternativas: [
                    {
                        id: 17,
                        texto: "Miguel de Cervantes",
                        correta: true,
                    },
                    {
                        id: 18,
                        texto: "William Shakespeare",
                        correta: false,
                    },
                    {
                        id: 19,
                        texto: "Dante Alighieri",
                        correta: false,
                    },
                    {
                        id: 20,
                        texto: "Gabriel Garcia Marquez",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:10.996Z",
                updated_at: "2024-10-21T17:21:10.996Z",
            },
            {
                id: 6,
                enunciado:
                    'Qual \u00e9 o elemento qu\u00edmico representado pelo s\u00edmbolo "O"?',
                alternativas: [
                    {
                        id: 21,
                        texto: "Oxig\u00eanio",
                        correta: true,
                    },
                    {
                        id: 22,
                        texto: "Ouro",
                        correta: false,
                    },
                    {
                        id: 23,
                        texto: "Osmio",
                        correta: false,
                    },
                    {
                        id: 24,
                        texto: "Oganesson",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:11.013Z",
                updated_at: "2024-10-21T17:21:11.013Z",
            },
            {
                id: 7,
                enunciado: "Quem foi o primeiro homem a pisar na lua?",
                alternativas: [
                    {
                        id: 25,
                        texto: "Neil Armstrong",
                        correta: true,
                    },
                    {
                        id: 26,
                        texto: "Buzz Aldrin",
                        correta: false,
                    },
                    {
                        id: 27,
                        texto: "Yuri Gagarin",
                        correta: false,
                    },
                    {
                        id: 28,
                        texto: "Michael Collins",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:11.033Z",
                updated_at: "2024-10-21T17:21:11.033Z",
            },
            {
                id: 8,
                enunciado: "Qual \u00e9 a l\u00edngua oficial do Brasil?",
                alternativas: [
                    {
                        id: 29,
                        texto: "Portugu\u00eas",
                        correta: true,
                    },
                    {
                        id: 30,
                        texto: "Espanhol",
                        correta: false,
                    },
                    {
                        id: 31,
                        texto: "Ingl\u00eas",
                        correta: false,
                    },
                    {
                        id: 32,
                        texto: "Franc\u00eas",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:11.051Z",
                updated_at: "2024-10-21T17:21:11.051Z",
            },
            {
                id: 9,
                enunciado:
                    "Qual \u00e9 o oceano que banha a costa leste do Brasil?",
                alternativas: [
                    {
                        id: 33,
                        texto: "Atl\u00e2ntico",
                        correta: true,
                    },
                    {
                        id: 34,
                        texto: "Pac\u00edfico",
                        correta: false,
                    },
                    {
                        id: 35,
                        texto: "\u00cdndico",
                        correta: false,
                    },
                    {
                        id: 36,
                        texto: "\u00c1rtico",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:11.068Z",
                updated_at: "2024-10-21T17:21:11.068Z",
            },
            {
                id: 10,
                enunciado:
                    "Quem \u00e9 conhecido como o pai da computa\u00e7\u00e3o?",
                alternativas: [
                    {
                        id: 37,
                        texto: "Alan Turing",
                        correta: true,
                    },
                    {
                        id: 38,
                        texto: "Albert Einstein",
                        correta: false,
                    },
                    {
                        id: 39,
                        texto: "Isaac Newton",
                        correta: false,
                    },
                    {
                        id: 40,
                        texto: "Nikola Tesla",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:11.083Z",
                updated_at: "2024-10-21T17:21:11.083Z",
            },
        ],
        created_at: "2024-10-21T17:21:10.909Z",
        updated_at: "2024-10-21T17:21:10.909Z",
    },
    {
        id: 2,
        nome: "Qualidade duvidosa",
        descricao: "Questoes nao tão boas assim",
        categoria: "Conhecimentos Gerais",
        questoes: [
            {
                id: 1,
                enunciado: "Qual \u00e9 a capital da Fran\u00e7a?",
                alternativas: [
                    {
                        id: 1,
                        texto: "Paris",
                        correta: true,
                    },
                    {
                        id: 2,
                        texto: "Londres",
                        correta: false,
                    },
                    {
                        id: 3,
                        texto: "Berlim",
                        correta: false,
                    },
                    {
                        id: 4,
                        texto: "Madri",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:10.913Z",
                updated_at: "2024-10-21T17:21:10.913Z",
            },
            {
                id: 2,
                enunciado: "Quem pintou a Mona Lisa?",
                alternativas: [
                    {
                        id: 5,
                        texto: "Leonardo da Vinci",
                        correta: true,
                    },
                    {
                        id: 6,
                        texto: "Pablo Picasso",
                        correta: false,
                    },
                    {
                        id: 7,
                        texto: "Vincent van Gogh",
                        correta: false,
                    },
                    {
                        id: 8,
                        texto: "Claude Monet",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:10.936Z",
                updated_at: "2024-10-21T17:21:10.936Z",
            },
            {
                id: 3,
                enunciado:
                    "Qual \u00e9 o maior planeta do nosso sistema solar?",
                alternativas: [
                    {
                        id: 9,
                        texto: "J\u00fapiter",
                        correta: true,
                    },
                    {
                        id: 10,
                        texto: "Saturno",
                        correta: false,
                    },
                    {
                        id: 11,
                        texto: "Terra",
                        correta: false,
                    },
                    {
                        id: 12,
                        texto: "Marte",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:10.958Z",
                updated_at: "2024-10-21T17:21:10.958Z",
            },
            {
                id: 4,
                enunciado: "Em que ano a Segunda Guerra Mundial terminou?",
                alternativas: [
                    {
                        id: 13,
                        texto: "1945",
                        correta: true,
                    },
                    {
                        id: 14,
                        texto: "1939",
                        correta: false,
                    },
                    {
                        id: 15,
                        texto: "1941",
                        correta: false,
                    },
                    {
                        id: 16,
                        texto: "1950",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:10.977Z",
                updated_at: "2024-10-21T17:21:10.977Z",
            },
            {
                id: 5,
                enunciado: 'Quem escreveu "Dom Quixote"?',
                alternativas: [
                    {
                        id: 17,
                        texto: "Miguel de Cervantes",
                        correta: true,
                    },
                    {
                        id: 18,
                        texto: "William Shakespeare",
                        correta: false,
                    },
                    {
                        id: 19,
                        texto: "Dante Alighieri",
                        correta: false,
                    },
                    {
                        id: 20,
                        texto: "Gabriel Garcia Marquez",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:10.996Z",
                updated_at: "2024-10-21T17:21:10.996Z",
            },
            {
                id: 6,
                enunciado:
                    'Qual \u00e9 o elemento qu\u00edmico representado pelo s\u00edmbolo "O"?',
                alternativas: [
                    {
                        id: 21,
                        texto: "Oxig\u00eanio",
                        correta: true,
                    },
                    {
                        id: 22,
                        texto: "Ouro",
                        correta: false,
                    },
                    {
                        id: 23,
                        texto: "Osmio",
                        correta: false,
                    },
                    {
                        id: 24,
                        texto: "Oganesson",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:11.013Z",
                updated_at: "2024-10-21T17:21:11.013Z",
            },
            {
                id: 7,
                enunciado: "Quem foi o primeiro homem a pisar na lua?",
                alternativas: [
                    {
                        id: 25,
                        texto: "Neil Armstrong",
                        correta: true,
                    },
                    {
                        id: 26,
                        texto: "Buzz Aldrin",
                        correta: false,
                    },
                    {
                        id: 27,
                        texto: "Yuri Gagarin",
                        correta: false,
                    },
                    {
                        id: 28,
                        texto: "Michael Collins",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:11.033Z",
                updated_at: "2024-10-21T17:21:11.033Z",
            },
            {
                id: 8,
                enunciado: "Qual \u00e9 a l\u00edngua oficial do Brasil?",
                alternativas: [
                    {
                        id: 29,
                        texto: "Portugu\u00eas",
                        correta: true,
                    },
                    {
                        id: 30,
                        texto: "Espanhol",
                        correta: false,
                    },
                    {
                        id: 31,
                        texto: "Ingl\u00eas",
                        correta: false,
                    },
                    {
                        id: 32,
                        texto: "Franc\u00eas",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:11.051Z",
                updated_at: "2024-10-21T17:21:11.051Z",
            },
            {
                id: 9,
                enunciado:
                    "Qual \u00e9 o oceano que banha a costa leste do Brasil?",
                alternativas: [
                    {
                        id: 33,
                        texto: "Atl\u00e2ntico",
                        correta: true,
                    },
                    {
                        id: 34,
                        texto: "Pac\u00edfico",
                        correta: false,
                    },
                    {
                        id: 35,
                        texto: "\u00cdndico",
                        correta: false,
                    },
                    {
                        id: 36,
                        texto: "\u00c1rtico",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:11.068Z",
                updated_at: "2024-10-21T17:21:11.068Z",
            },
            {
                id: 10,
                enunciado:
                    "Quem \u00e9 conhecido como o pai da computa\u00e7\u00e3o?",
                alternativas: [
                    {
                        id: 37,
                        texto: "Alan Turing",
                        correta: true,
                    },
                    {
                        id: 38,
                        texto: "Albert Einstein",
                        correta: false,
                    },
                    {
                        id: 39,
                        texto: "Isaac Newton",
                        correta: false,
                    },
                    {
                        id: 40,
                        texto: "Nikola Tesla",
                        correta: false,
                    },
                ],
                created_at: "2024-10-21T17:21:11.083Z",
                updated_at: "2024-10-21T17:21:11.083Z",
            },
        ],
        created_at: "2024-10-21T17:21:10.909Z",
        updated_at: "2024-10-21T17:21:10.909Z",
    },
];

function MeusQuestionarios(): JSX.Element {
    const [questionarios, setQuestionarios] = useState<Questionario[]>();

    useEffect(() => {
        QuestionariosService.getAll().then((response) => {
            const { count, items } = response;
            console.log(count, items);
            setQuestionarios(items);
        });
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl ml-4">Meus questionários</h1>
                <button className="btn">
                    <i className="fa-solid fa-plus" /> Novo Questionário
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Título do questionario</th>
                        <th>Número de questões</th>
                        <th>Categoria</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {questionarios?.map((questionario) => {
                        return (
                            <tr key={questionario.id} className="hover">
                                <td>{questionario.nome}</td>
                                <td>{questionario.questoes.length}</td>
                                <td>{questionario.categoria}</td>
                                <td>
                                    <div className="grid grid-cols-1">
                                        <button className="btn btn-sm">
                                            <i className="fa-solid fa-caret-right" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default MeusQuestionarios;
