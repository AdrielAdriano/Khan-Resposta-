// ==UserScript==
// @name         Khan Respostas
// @version      1.3
// @description  Respostas
// @author       Adriel Adriano
// @match        https://pt.khanacademy.org/*
// @grant        none
// @namespace    https://greasyfork.org/users/1064859
// @homepage     https://github.com/adrieladriano
// ==/UserScript==

(function () {
    const overlayHTML = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <div id="box">
            <button class="main" id="accordian">=</button>
            <div class="main" id="box2" style="display:none;">
                <center><p class="pdark" id="pdark"> KHAN </p></center>
                <button onclick="location.reload()" class="inputans">Resetar</button>
                <br>
                <center><section><label id="ansHead">--</label></section></center>
                <center id="mainCen">
                    <section><label id="ansBreak">&nbsp;</label></section>
                </center>
                <section><label>&nbsp;</label></section>
                <section class="toggleclass"><label>M para esconder Menu</label></section>
            </div>
        </div>
        <style>
            #box {
                z-index: 9999;
                position: fixed;
                top: 0;
                right: 0;
            }
            #box2 {
                padding: 15px;
                margin-bottom: 5px;
                display: grid;
                border-radius: 25px;
            }
            section {
                display: flex;
                justify-content: space-between;
                margin: 5px;
            }
            .main {
                background-color: #15151515;
                letter-spacing: 2px;
                font-weight: none;
                font-size: 11px;
                font-family: 'Roboto', sans-serif;
                color: #000000;
                webkit-user-select: all;
            }
            .pdark {
                border-bottom: 2px solid black;
            }
            #accordian {
                width: 100%;
                border: 0;
                cursor: pointer;
                border-radius: 25px;
            }
            .inputans {
                border: 0;
                cursor: pointer;
                border-radius: 25px;
                background-color: #30303030;
                color: black;
                font-family: 'Roboto', sans-serif;
            }
            .inputans:hover {
                background-color: #121212;
                color: white;
            }
            .toggleclass {
                text-align: center;
            }
        </style>
    `;

    function get(id) {
        return document.getElementById(id);
    }

    const overlay = document.createElement("div");
    overlay.innerHTML = overlayHTML;
    document.body.appendChild(overlay);

    const acc = get("accordian");
    acc.onclick = () => {
        const panel = get("box2");
        panel.style.display = panel.style.display === "grid" ? "none" : "grid";
    };

    document.addEventListener('keydown', (event) => {
        if (event.key.toLowerCase() === 'm') {
            const panel = get("box2");
            panel.style.display = panel.style.display === "grid" ? "none" : "grid";
        }
    });

    window.loaded = false;

    class Answer {
        constructor(answer, type) {
            this.body = answer;
            this.type = type;
        }

        get isMultiChoice() {
            return this.type === "multiple_choice";
        }

        get isFreeResponse() {
            return this.type === "free_response";
        }

        get isExpression() {
            return this.type === "expression";
        }

        get isDropdown() {
            return this.type === "dropdown";
        }

        log() {
            this.body.forEach((ans, index) => {
                if (typeof ans === "string") {
                    if (ans.includes("web+graphie")) {
                        this.body[index] = "";
                        this.printImage(ans);
                    } else {
                        this.body[index] = ans.replace(/\$/g, "");
                    }
                }
            });
        }

        printImage(ans) {
            // Implementar lógica para exibir imagem
        }
    }

    const originalFetch = window.fetch;
    window.fetch = function (...args) {
        return originalFetch(...args).then(async (res) => {
            if (res.url.includes("/getAssessmentItem")) {
                const clone = res.clone();
                const json = await clone.json();
                const item = json.data.assessmentItem.item.itemData;
                const question = JSON.parse(item).question;

                Object.keys(question.widgets).forEach(widgetName => {
                    switch (widgetName.split(" ")[0]) {
                        case "numeric-input":
                            return freeResponseAnswerFrom(question).log();
                        case "radio":
                            return multipleChoiceAnswerFrom(question).log();
                        case "expression":
                            return expressionAnswerFrom(question).log();
                        case "dropdown":
                            return dropdownAnswerFrom(question).log();
                    }
                });
            }

            if (!window.loaded) {
                console.clear();
                window.loaded = true;
            }

            return res;
        });
    };

    let curAns = 1;

    function appendAnswer(content) {
        const createPar = document.createElement('section');
        createPar.innerHTML = content;
        get('ansBreak').append(createPar);
        curAns++;
    }

    function freeResponseAnswerFrom(question) {
        const answer = Object.values(question.widgets).flatMap(widget => {
            if (widget.options?.answers) {
                return widget.options.answers.map(answer => {
                    if (answer.status === "correct") {
                        appendAnswer(answer.value);
                    }
                });
            }
        }).filter(Boolean);

        return new Answer(answer, "free_response");
    }

    function multipleChoiceAnswerFrom(question) {
        const answer = Object.values(question.widgets).flatMap(widget => {
            if (widget.options?.choices) {
                return widget.options.choices.map(choice => {
                    if (choice.correct) {
                        appendAnswer(choice.content);
                    }
                });
            }
        }).filter(Boolean);

        return new Answer(answer, "multiple_choice");
    }

    function expressionAnswerFrom(question) {
        const answer = Object.values(question.widgets).flatMap(widget => {
            if (widget.options?.answerForms) {
                return widget.options.answerForms.map(answer => {
                    if (Object.values(answer).includes("correct")) {
                        appendAnswer(answer.value);
                    }
                });
            }
        });

        return new Answer(answer, "expression");
    }

    function dropdownAnswerFrom(question) {
        const answer = Object.values(question.widgets).flatMap(widget => {
            if (widget.options?.choices) {
                return widget.options.choices.map(choice => {
                    if (choice.correct) {
                        appendAnswer(choice.content);
                    }
                });
            }
        });

        return new Answer(answer, "dropdown");
    }
})();
