
const container = document.getElementsByClassName('container')[0];
const roundContainer = document.getElementById('roundContainer')
class Hero {
    constructor(name, hp, mana, attack, armor){
        this.name = name;
        this.hp = hp;
        this.mana = mana;
        this.attack = attack;
        this.armor = armor;
    }
}

class Round {
    constructor(number) {
        this.number = number
    }
}

class Knight extends Hero {
    
    set receiveDamage (damage) {
        this.hp -= damage
    }
}

class Boss extends Hero {
    get randomDamage () {
        return Math.floor(Math.random() * (200 - this.attack) + this.attack)
    }
}

const knight = new Knight('Tanjiro', 5000, 200, 100, 5)
const boss = new Boss('Nezuko', 1000, 200, 100, 5)
const roundNumber = new Round(1)
const knightlink = document.getElementById('out')
const bosslink = document.getElementById('out2')

function renderStats(Hero) {
    let result = ''
    
    Object.keys(Hero).forEach(key => {
        result += `
        <tr>
        <th>${key}</th>
        <td> : ${Hero[key]}</td>
        </tr>
        `
    });
    return result

}
function renderRound(Round) {
    let number = '';
    Object.keys(Round).forEach((key) => {
        number = `
        <h2 class='round-number'>Round: ${Round[key]}</h2>
        `;
    })
    return number
}
function UpdateState(){
    knightlink.innerHTML = renderStats(knight)
    bosslink.innerHTML = renderStats(boss)
    roundContainer.innerHTML = renderRound(roundNumber)
}
UpdateState()

function ultimate() {
    const bossAttack = boss.randomDamage
    console.log(bossAttack)

    knight.receiveDamage = bossAttack

    if (knight.mana >= 50){
          
        knight.mana = knight.mana - 50
        boss.hp = boss.hp - knight.attack * 3   
    } else {
        knight.mana = 0
    }
    roundNumber.number = roundNumber.number + 1
    KnightDS()
    
    UpdateState()
}

function KnightDS(){
    if(boss.hp <= 0){
        boss.hp === 0
        alert('You won!')
    } else if(knight.hp <= 0) {
        knight.hp === 0
        alert('Boss won!')
    }
    
    UpdateState()
}


function attack(){

    boss.hp = boss.hp - knight.attack
    knight.receiveDamage = boss.randomDamage

    roundNumber.number = roundNumber.number + 1
    

    KnightDS()
    
    UpdateState()
}


function rage(){
    knight.hp = knight.hp - boss.attack * 2

    knight.receiveDamage = boss.randomDamage


    roundNumber.number = roundNumber.number + 1

    KnightDS()
 
    UpdateState()
}
function heal(){
    const knightHeal = knight.hp + 100
    if (knightHeal >= 1000){
        knight.hp = 1000
    } else {
        knight.hp = knightHeal
    }

    roundNumber.number = roundNumber.number + 1

    KnightDS()
    
    UpdateState()
}

let a = 0
function shield(){
    knight.armor = knight.armor + 30
    if(knight.armor > 30){
        knight.armor = 30
    }

    if(a >= 1){
        return
    }
    a += 1

    roundNumber.number = roundNumber.number + 1

    KnightDS()

    UpdateState()
}

function refresh() {
    window.location.reload()
}

const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
});
const removeActiveClasses = () => {
    panels.forEach((panel) => {
        panel.classList.remove('active');
    });
};



let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');

	menu.classList.toggle('active');
})



