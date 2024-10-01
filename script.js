const num = document.getElementById('count');
const body = document.getElementById('container');
const text = document.getElementById('begin_txt');
const home = document.getElementById('home');
const confetti = document.getElementById('confetti');
const confetti2 = document.getElementById('confetti2');
const writeup = document.getElementById('writeup');
const hb = document.getElementById('hb');
const daniel = document.getElementById('name');
const info = document.getElementById('info');
const card = document.getElementById('bday_card');
const openCardButton = document.getElementById('open_card');
const overlay = document.querySelector('.overlay');
const next_btn = document.getElementById('next');
let yes_btn = document.getElementById('yes_btn');
let no_btn = document.getElementById('no_btn');
const candle_pg = document.getElementById('candles');
const exit_btn = document.getElementById('exit_btn');
const candles = document.querySelectorAll('.gif');
const squares = document.querySelectorAll('.square');
const pages = document.querySelectorAll('.pg');
const back_btn = document.querySelectorAll('.back_btn');
const sub = document.getElementById('sub');
const candle_stick = document.querySelectorAll('.candle');

let count = 1;

function screenClick(){
    if(count<3){
        count++;
        num.textContent = count;    
    }
    else{
        body.removeEventListener('click', screenClick);
        text.textContent = "Today's your special day, isn't it?";
        
        setTimeout(() => {
            text.textContent="You may need to turn up your volume for this..";
        }, 2000); //2000

        setTimeout(() => {
            text.style.opacity = '0';
            num.style.opacity = '0';
        }, 4000); //4000

        setTimeout(() => {
            home.querySelector('audio').muted = false;
            home.querySelector('audio').play();
            home.style.top = '0';
            home.style.visibility = 'visible';
            confetti.style.animation = 'opacity .8s ease-in-out 2s forwards';
            confetti2.style.animation = 'opacity .8s ease-in-out 2s forwards';
            writeup.style.animation = 'move .7s ease-in-out 1s forwards';
            hb.style.animation = 'opacity_move .7s ease-in-out 1.2s forwards';
            daniel.style.animation = 'opacity_move .7s ease-in-out 1.5s forwards';
            info.style.animation = 'opacity .8s ease-in-out 3s forwards';
            card.style.animation = 'card_move .6s ease-in-out 3s forwards';
        }, 4500); //4500
    }
}

body.addEventListener('click', screenClick);

const mouse_in_card = document.createElement('style');
const mouse2_in_card = document.createElement('style');

function setContent(content){
    mouse_in_card.innerHTML = content;
}

function setContent2(content){
    mouse2_in_card.innerHTML = content;
}

setContent(`
        #bday_card:hover {
            transform: translateY(-20px);
            cursor: pointer;
        }`);


document.head.appendChild(mouse_in_card);

card.addEventListener('click', () => {
    setContent( `
        #bday_card {
            transform: translateY(-350px);
            transition: transform 0.3s ease-in-out;
        }

        .overlay {
            background-color: rgba(0,0,0,.6);
        }

        .card button {
            visibility: visible;
        }

        #bday_card:hover {
            transform: translateY(-350px);
            cursor: default;
        }
    `);
});

// When the open card button is clicked
openCardButton.addEventListener('click', () => {
    document.head.removeChild(mouse_in_card);
    setContent2(`
        #bday_card {
            transform: translateY(-350px);
            transition: transform 0.3s ease-in-out;
        }

        .overlay {
            background-color: rgba(0,0,0,.6);
        }

        .card button {
            visibility: hidden;
        }

        #bday_card {
            transform: perspective(2500px) rotate(3deg) translateX(100px) translateY(-350px);
            box-shadow: inset 100px 20px 100px rgba(0,0,0,.2), 0 10px 100px rgba(0,0,0,.4);
            cursor: default;
        }

        #bday_card .card {
            transform: rotateY(-160deg);
        }
    `);
    document.head.appendChild(mouse2_in_card);
});

// When the overlay is clicked
overlay.addEventListener('click', () => {
    if(document.head.contains(mouse2_in_card)){
        document.head.removeChild(mouse2_in_card);
    }
    setContent(`
        #bday_card:hover {
            transform: translateY(-20px);
            cursor: pointer;
        }

        #bday_card {
            transform: translateY(0);
            transition: transform 0.3s ease-in-out;
        }

        .overlay {
            background-color: rgba(0,0,0,0);
        }

        .card button {
            visibility: hidden;
        }
    `);
    document.head.appendChild(mouse_in_card);
    document.querySelector('.buttons').innerHTML = `
        <button id="yes_btn">Yes</button>
        <button id="no_btn">No</button>`;
    yes_btn = document.getElementById('yes_btn');
    no_btn = document.getElementById('no_btn');
    reset();
    document.querySelector('.blow_candles').querySelector('p').textContent = 'Want to blow out your candles?';
});

next_btn.addEventListener('click', () => {
    setContent2(`
        #bday_card {
            transform: translateY(-100px);
            transition: transform 0.3s ease-in-out;
        }

        .overlay {
            background-color: rgba(0,0,0,.6);
        }

        .card button {
            visibility: hidden;
        }

        #bday_card {
            transform: perspective(2500px) rotate(3deg) translateX(100px) translateY(-100px);
            box-shadow: inset 100px 20px 100px rgba(0,0,0,.2), 0 10px 100px rgba(0,0,0,.4);
            cursor: default;
        }

        #bday_card .card {
            transform: rotateY(-160deg);
        }

        .blow_candles {
            bottom: 60%;
        }
    `);
})

const black = document.createElement('style');
black.innerHTML = `
            .overlay{
                z-index: 6;
                transition: background-color 1s ease-in-out;
                background-color: rgba(0,0,0,1);
            }`;

no_btn.addEventListener('click', event => {
    event.target.textContent = 'Yes';
})

yes_btn.addEventListener('click', () => {
    document.querySelector('.buttons').innerHTML = `
        <img class="light_btn" src="images/lightbulb.png" alt="light">
        <img class="light_btn_black" id="off_btn" src="images/lightbulb_white.png" alt="light off">`;
    document.querySelector('.blow_candles').querySelector('p').textContent = 'Turn off the lights';

    document.querySelector('.light_btn').addEventListener('click', () => {
        document.head.appendChild(black);
        document.querySelector('.blow_candles').style.zIndex = '8';
        document.querySelector('.light_btn_black').style.visibility = 'visible';
        document.querySelector('.light_btn_black').style.opacity = '1';
        document.querySelector('.blow_candles').querySelector('p').textContent = '';

        setTimeout(() => {
            document.querySelector('.light_btn').style.visibility = 'hidden';
            document.querySelector('.light_btn_black').style.opacity = '0';

            setTimeout(() => {
                candle_pg.style.visibility = 'visible';
                candle_pg.style.opacity = '1';
            }, 1000);
        }, 1000);
    })
})

function reset(){
    no_btn.addEventListener('click', event => {
        event.target.textContent = 'Yes';
    })
    
    yes_btn.addEventListener('click', () => {
        document.querySelector('.buttons').innerHTML = `
            <img class="light_btn" src="images/lightbulb.png" alt="light">
            <img class="light_btn_black" id="off_btn" src="images/lightbulb_white.png" alt="light off">`;
        document.querySelector('.blow_candles').querySelector('p').textContent = 'Turn off the lights';
    
        document.querySelector('.light_btn').addEventListener('click', () => {
            document.head.appendChild(black);
            overlay.classList.add('light_off');
            document.querySelector('.blow_candles').style.zIndex = '8';
            document.querySelector('.light_btn_black').style.visibility = 'visible';
            document.querySelector('.light_btn_black').style.opacity = '1';
            document.querySelector('.blow_candles').querySelector('p').textContent = '';
    
            setTimeout(() => {
                document.querySelector('.light_btn').style.visibility = 'hidden';
                document.querySelector('.light_btn_black').style.opacity = '0';
    
                setTimeout(() => {
                    candle_pg.style.visibility = 'visible';
                    candle_pg.style.opacity = '1';
                }, 1000);
            }, 1000);
        })
    })
}

exit_btn.addEventListener('click', () => {
    candle_pg.style.visibility = 'hidden';
    candle_pg.style.opacity = '0';
    setTimeout(() => {
        document.head.removeChild(mouse2_in_card);
        document.head.removeChild(black);
        document.querySelector('.buttons').innerHTML = `
            <button id="yes_btn">Yes</button>
            <button id="no_btn">No</button>`;
        yes_btn = document.getElementById('yes_btn');
        no_btn = document.getElementById('no_btn');
        reset();
        document.querySelector('.blow_candles').querySelector('p').textContent = 'Want to blow out your candles?';
        setContent(`
            #bday_card:hover {
                transform: translateY(-20px);
                cursor: pointer;
            }
    
            #bday_card {
                transform: translateY(0);
                transition: transform 0.3s ease-in-out;
            }
    
            .overlay {
                z-index: 0;
                background-color: rgba(0,0,0,0);
            }
    
            .card button {
                visibility: hidden;
            }
        `);
        document.head.appendChild(mouse_in_card);
        console.log(mouse_in_card);
    }, 1000);
})

function appear(index){
    setTimeout(() => {
        candles[index].src = 'images/still_candle.png';
        document.querySelector('.candles_cont').style.visibility = 'hidden';
        candle_stick[index].querySelector('audio').muted = true;
        pages[index].style.visibility = 'visible';
        pages[index].style.opacity = '1';
    }, 2000);
}

function disappear(parent){
    setTimeout(() => {
        parent.style.visibility = 'hidden';
        document.querySelector('.candles_cont').style.visibility = 'visible';
        document.querySelector('.candles_cont').style.opacity = '1';
    }, 1000);
}

let candles_burnt = 0;

squares.forEach(square => {
    square.addEventListener('click', () => {
        square.style.visibility = 'hidden';
        candles_burnt++;
        if(candles_burnt == 3){
            document.getElementById('candles').querySelector('p').textContent = 'You have extinguished all your candles';
        }
        if(square === squares[0]){
            candles[0].src = 'images/0904(1).gif';
            candle_stick[0].querySelector('audio').muted = false;
            candle_stick[0].querySelector('audio').play();
            
            setTimeout(() => {
                document.querySelector('.candles_cont').style.opacity = '0';
                appear(0);
            }, 1000);
        }
        else if(square === squares[1]){
            candles[1].src = 'images/0904(1).gif';
            candle_stick[1].querySelector('audio').muted = false;
            candle_stick[1].querySelector('audio').play();

            setTimeout(() => {
                document.querySelector('.candles_cont').style.opacity = '0';
                appear(1);
            }, 1000);
        }
        else if(square === squares[2]){
            candles[2].src = 'images/0904(1).gif';
            candle_stick[2].querySelector('audio').muted = false;
            candle_stick[2].querySelector('audio').play();

            setTimeout(() => {
                document.querySelector('.candles_cont').style.opacity = '0';
                appear(2);
            }, 1000);
        }
    })
})

back_btn.forEach( button => {
    button.addEventListener('click', () => {
        button.parentElement.style.opacity = '0';
        console.log(button.parentElement);
        disappear(button.parentElement);
    })
})

sub.addEventListener('click', ()=>{
    document.querySelector('.confirm').classList.add('confirm_show');
    setInterval(() => {
        document.querySelector('.confirm').classList.remove('confirm_show');
    }, 2000);
})


